# backend Dockerfile for Railway
FROM python:3.11-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# System deps for SQLite
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy app code and database
COPY app ./app
COPY database ./database

# Expose port
EXPOSE 3001

# Run
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "3001"]
