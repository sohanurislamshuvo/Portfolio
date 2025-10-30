from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from ..db import db_cursor
from ..security import auth_dependency


router = APIRouter()


@router.get("/")
def list_messages(page: int = 1, limit: int = 10, unread_only: bool = False, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    offset = (page - 1) * limit
    with db_cursor() as cur:
        base = "SELECT * FROM messages"
        count = "SELECT COUNT(*) as total FROM messages"
        if unread_only:
            base += " WHERE read_status = 0"
            count += " WHERE read_status = 0"
        base += " ORDER BY created_at DESC LIMIT ? OFFSET ?"
        cur.execute(base, (limit, offset))
        messages = cur.fetchall()
        cur.execute(count)
        total = cur.fetchone()["total"]
        total_pages = (total + limit - 1) // limit
        return {
            "success": True,
            "data": {
                "messages": messages,
                "pagination": {
                    "currentPage": page,
                    "totalPages": total_pages,
                    "totalItems": total,
                    "itemsPerPage": limit,
                },
            },
        }


# Accept no-trailing-slash path to avoid 307 redirects
@router.get("")
def list_messages_no_slash(page: int = 1, limit: int = 10, unread_only: bool = False, user=Depends(auth_dependency)):
    return list_messages(page=page, limit=limit, unread_only=unread_only, user=user)


@router.get("/{id}")
def get_message(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute("SELECT * FROM messages WHERE id = ?", (id,))
        msg = cur.fetchone()
        if not msg:
            raise HTTPException(status_code=404, detail="Message not found")
        return {"success": True, "data": msg}


@router.post("/")
def create_message(body: Dict[str, Any]):
    name = body.get("name")
    email = body.get("email")
    subject = body.get("subject")
    message = body.get("message")
    if not name or not email or not subject or not message:
        raise HTTPException(status_code=400, detail="All fields are required")
    import re
    if not re.match(r"^[^\s@]+@[^\s@]+\.[^\s@]+$", email):
        raise HTTPException(status_code=400, detail="Invalid email format")
    with db_cursor() as cur:
        cur.execute(
            "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
            (name, email, subject, message),
        )
        new_id = cur.lastrowid
        return {"success": True, "message": "Message sent successfully", "data": {"id": new_id}}


@router.put("/{id}/read")
def mark_read(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute(
            "UPDATE messages SET read_status = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (id,),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True, "message": "Message marked as read"}


@router.put("/{id}/unread")
def mark_unread(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute(
            "UPDATE messages SET read_status = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (id,),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True, "message": "Message marked as unread"}


@router.delete("/{id}")
def delete_message(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute("DELETE FROM messages WHERE id = ?", (id,))
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Message not found")
    return {"success": True, "message": "Message deleted successfully"}


@router.get("/stats/summary")
def message_stats(user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute("SELECT COUNT(*) as total FROM messages")
        total = cur.fetchone()["total"]
        cur.execute("SELECT COUNT(*) as unread FROM messages WHERE read_status = 0")
        unread = cur.fetchone()["unread"]
        cur.execute('SELECT COUNT(*) as today FROM messages WHERE DATE(created_at) = DATE("now")')
        today = cur.fetchone()["today"]
        return {"success": True, "data": {"total": total, "unread": unread, "today": today}}


