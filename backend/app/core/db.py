from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Create SQLAlchemy Database Engine (PostgreSQL / SQLite)
engine_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    engine_args["connect_args"] = {"check_same_thread": False}

engine = create_engine(settings.DATABASE_URL, **engine_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """FastAPI dependency: yields a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initializes and creates all PostgreSQL database tables."""
    # Import ALL models so SQLAlchemy registers them on Base.metadata
    from app.models.user import User  # noqa: F401
    from app.models.domain import ProfileDB, RoadmapDB, AssessmentResultDB, FeedbackDB, LearningSessionDB, GeneratedAssessmentDB  # noqa: F401
    from sqlalchemy import text

    # Verify connection and ensure schema is updated
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))
        if engine.dialect.name == "postgresql":
            conn.execute(text("""
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name='users' AND column_name='selected_learning_path'
                    ) THEN
                        ALTER TABLE users ADD COLUMN selected_learning_path VARCHAR NULL;
                    END IF;

                    IF NOT EXISTS (
                        SELECT 1 FROM information_schema.columns 
                        WHERE table_name='assessment_results' AND column_name='user_id'
                    ) THEN
                        ALTER TABLE assessment_results ADD COLUMN user_id VARCHAR NULL;
                        ALTER TABLE assessment_results ADD COLUMN learning_path VARCHAR NULL;
                        ALTER TABLE assessment_results ADD COLUMN topic VARCHAR NULL;
                        ALTER TABLE assessment_results ADD COLUMN difficulty VARCHAR NULL;
                        ALTER TABLE assessment_results ADD COLUMN total_questions INTEGER DEFAULT 0;
                        ALTER TABLE assessment_results ADD COLUMN correct_count INTEGER DEFAULT 0;
                        ALTER TABLE assessment_results ADD COLUMN time_taken_seconds FLOAT DEFAULT 0.0;
                        ALTER TABLE assessment_results ADD COLUMN user_answers_json TEXT NULL;
                        ALTER TABLE assessment_results ADD COLUMN detailed_results_json TEXT NULL;
                    END IF;
                END $$;
            """))
            conn.commit()
        elif engine.dialect.name == "sqlite":
            table_check = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")).fetchall()
            if table_check:
                cols = [row[1] for row in conn.execute(text("PRAGMA table_info(users)")).fetchall()]
                if "selected_learning_path" not in cols:
                    conn.execute(text("ALTER TABLE users ADD COLUMN selected_learning_path VARCHAR NULL"))
                    conn.commit()

    Base.metadata.create_all(bind=engine)
    db_name = settings.DATABASE_URL.split("/")[-1]
    print(f"[DATABASE SUCCESS] Connected to database: '{db_name}'")
