from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from .routers import auth, portfolio, messages
from .db import db_cursor
import bcrypt


PORT = int(os.getenv("PORT", 3001))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:8080")
FRONTEND_URLS = [url.strip() for url in os.getenv("FRONTEND_URLS", "").split(",") if url.strip()]
NODE_ENV = os.getenv("NODE_ENV", "development")

app = FastAPI(title="Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, *FRONTEND_URLS],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "Server is running",
        "environment": NODE_ENV,
    }


app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["portfolio"])
app.include_router(messages.router, prefix="/api/messages", tags=["messages"])

@app.on_event("startup")
def bootstrap_admin_password():
    username = os.getenv("ADMIN_USERNAME", "shuvo")
    new_password = os.getenv("ADMIN_PASSWORD", "")
    if not new_password:
        return
    pw_hash = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    with db_cursor() as cur:
        cur.execute("UPDATE users SET password_hash = ? WHERE username = ?", (pw_hash, username))

