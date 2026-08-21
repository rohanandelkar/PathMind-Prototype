"""
Database Initialization Script for PostgreSQL / SQLite.
Executes Base.metadata.create_all() to create all database tables in PostgreSQL.
"""
from app.core.db import init_db, engine
from app.core.config import settings

if __name__ == "__main__":
    print(f"Initializing database at: {settings.DATABASE_URL}")
    try:
        init_db()
        print("Successfully created database tables:")
        print("  - users")
        print("  - learner_profiles")
        print("  - personalized_roadmaps")
        print("  - assessment_results")
        print("  - user_feedbacks")
    except Exception as e:
        print(f"Error initializing database: {e}")
