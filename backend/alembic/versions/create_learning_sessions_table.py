"""create learning_sessions table

Revision ID: 001_create_learning_sessions
Revises: 
Create Date: 2026-08-22 00:42:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001_create_learning_sessions'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    op.create_table(
        'learning_sessions',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.String(), nullable=False),
        sa.Column('learning_path', sa.String(), nullable=True),
        sa.Column('started_at', sa.DateTime(), nullable=False),
        sa.Column('ended_at', sa.DateTime(), nullable=True),
        sa.Column('duration_seconds', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('activity_type', sa.String(), nullable=False, server_default='general_learning'),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_learning_sessions_id'), 'learning_sessions', ['id'], unique=False)
    op.create_index(op.f('ix_learning_sessions_user_id'), 'learning_sessions', ['user_id'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_learning_sessions_user_id'), table_name='learning_sessions')
    op.drop_index(op.f('ix_learning_sessions_id'), table_name='learning_sessions')
    op.drop_table('learning_sessions')
