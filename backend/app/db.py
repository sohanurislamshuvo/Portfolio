import os
import sqlite3
from contextlib import contextmanager


DB_PATH = os.getenv("DB_PATH", os.path.join(os.path.dirname(__file__), "..", "database", "portfolio.db"))


def dict_factory(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = dict_factory
    return conn


@contextmanager
def db_cursor():
    conn = get_connection()
    try:
        yield conn.cursor()
        conn.commit()
    finally:
        conn.close()


