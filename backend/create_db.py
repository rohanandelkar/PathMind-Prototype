import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

try:
    # Connect to default postgres DB
    conn = psycopg2.connect(
        dbname="postgres",
        user="postgres",
        password="1234",
        host="localhost",
        port="5432"
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Create target database
    cursor.execute("CREATE DATABASE personalized_learning_db;")
    print("Database 'personalized_learning_db' created successfully in PostgreSQL!")
    cursor.close()
    conn.close()
except psycopg2.Error as e:
    if "already exists" in str(e):
        print("Database 'personalized_learning_db' already exists.")
    else:
        print(f"PostgreSQL Database creation notice: {e}")
