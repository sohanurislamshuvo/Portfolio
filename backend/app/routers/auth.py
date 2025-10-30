from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from ..db import db_cursor
from ..security import create_token, verify_password, auth_dependency


router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(body: LoginRequest):
    with db_cursor() as cur:
        cur.execute("SELECT * FROM users WHERE username = ?", (body.username,))
        user = cur.fetchone()
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not verify_password(body.password, user["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_token({"id": user["id"], "username": user["username"], "role": "admin"})
        return {
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {"id": user["id"], "username": user["username"], "role": "admin"},
        }


@router.get("/verify")
def verify(user=Depends(auth_dependency)):
    return {"success": True, "message": "Token is valid", "user": user}


@router.post("/logout")
def logout():
    return {"success": True, "message": "Logout successful"}


