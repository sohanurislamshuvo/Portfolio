from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from ..db import db_cursor
from ..security import auth_dependency


router = APIRouter()


@router.get("/config")
def get_config():
    with db_cursor() as cur:
        cur.execute("SELECT * FROM portfolio_config")
        rows = cur.fetchall()
        config: Dict[str, Any] = {}
        for r in rows:
            key = r["config_key"]
            val = r["config_value"]
            try:
                import json
                config[key] = json.loads(val)
            except Exception:
                config[key] = val
        return {"success": True, "data": config}


@router.put("/config")
def update_config(body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    configs = body.get("configs")
    if not isinstance(configs, dict):
        raise HTTPException(status_code=400, detail="Invalid configuration data")

    with db_cursor() as cur:
        import json
        for key, value in configs.items():
            value_str = json.dumps(value) if isinstance(value, (dict, list)) else value
            cur.execute(
                "INSERT OR REPLACE INTO portfolio_config (id, config_key, config_value, updated_at) VALUES ((SELECT id FROM portfolio_config WHERE config_key = ?), ?, ?, CURRENT_TIMESTAMP)",
                (key, key, value_str),
            )
    return {"success": True, "message": "Configuration updated successfully"}


@router.get("/projects")
def get_projects():
    with db_cursor() as cur:
        cur.execute("SELECT * FROM projects WHERE is_active = 1 ORDER BY display_order ASC")
        projects = cur.fetchall()
        import json
        for p in projects:
            p["technologies"] = json.loads(p.get("technologies") or "[]")
        return {"success": True, "data": projects}


@router.post("/projects")
def create_project(body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    required = ["title", "description"]
    if any(not body.get(k) for k in required):
        raise HTTPException(status_code=400, detail="Title and description are required")
    import json
    with db_cursor() as cur:
        cur.execute(
            "INSERT INTO projects (title, description, image_url, live_url, github_url, technologies, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                body.get("title"),
                body.get("description"),
                body.get("image_url"),
                body.get("live_url"),
                body.get("github_url"),
                json.dumps(body.get("technologies") or []),
                body.get("display_order") or 0,
            ),
        )
        new_id = cur.lastrowid
        return {"success": True, "message": "Project created successfully", "data": {"id": new_id}}


@router.put("/projects/{id}")
def update_project(id: int, body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    import json
    with db_cursor() as cur:
        cur.execute(
            "UPDATE projects SET title = ?, description = ?, image_url = ?, live_url = ?, github_url = ?, technologies = ?, display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (
                body.get("title"),
                body.get("description"),
                body.get("image_url"),
                body.get("live_url"),
                body.get("github_url"),
                json.dumps(body.get("technologies") or []),
                body.get("display_order"),
                body.get("is_active"),
                id,
            ),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Project not found")
    return {"success": True, "message": "Project updated successfully"}


@router.delete("/projects/{id}")
def delete_project(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute("DELETE FROM projects WHERE id = ?", (id,))
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Project not found")
    return {"success": True, "message": "Project deleted successfully"}


@router.get("/skills")
def get_skills():
    with db_cursor() as cur:
        cur.execute("SELECT * FROM skills WHERE is_active = 1 ORDER BY display_order ASC")
        skills = cur.fetchall()
        return {"success": True, "data": skills}


@router.post("/skills")
def create_skill(body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    name = body.get("name")
    level = body.get("level")
    category = body.get("category")
    if not name or not level or not category:
        raise HTTPException(status_code=400, detail="Name, level, and category are required")
    if level < 1 or level > 100:
        raise HTTPException(status_code=400, detail="Skill level must be between 1 and 100")
    with db_cursor() as cur:
        cur.execute(
            "INSERT INTO skills (name, level, category, display_order) VALUES (?, ?, ?, ?)",
            (name, level, category, body.get("display_order") or 0),
        )
        new_id = cur.lastrowid
        return {"success": True, "message": "Skill created successfully", "data": {"id": new_id}}


@router.put("/skills/{id}")
def update_skill(id: int, body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    level = body.get("level")
    if level is not None and (level < 1 or level > 100):
        raise HTTPException(status_code=400, detail="Skill level must be between 1 and 100")
    with db_cursor() as cur:
        cur.execute(
            "UPDATE skills SET name = ?, level = ?, category = ?, display_order = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            (
                body.get("name"),
                level,
                body.get("category"),
                body.get("display_order"),
                body.get("is_active"),
                id,
            ),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Skill not found")
    return {"success": True, "message": "Skill updated successfully"}


@router.delete("/skills/{id}")
def delete_skill(id: int, user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    with db_cursor() as cur:
        cur.execute("DELETE FROM skills WHERE id = ?", (id,))
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Skill not found")
    return {"success": True, "message": "Skill deleted successfully"}


@router.get("/social-links")
def get_social_links():
    with db_cursor() as cur:
        cur.execute("SELECT * FROM social_links WHERE is_active = 1 ORDER BY display_order ASC")
        links = cur.fetchall()
        return {"success": True, "data": links}


@router.put("/social-links")
def update_social_links(body: Dict[str, Any], user=Depends(auth_dependency)):
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden")
    social_links = body.get("socialLinks")
    if not isinstance(social_links, list):
        raise HTTPException(status_code=400, detail="Social links must be an array")
    with db_cursor() as cur:
        cur.execute("DELETE FROM social_links")
        for link in social_links:
            cur.execute(
                "INSERT INTO social_links (platform, url, display_order) VALUES (?, ?, ?)",
                (link.get("platform"), link.get("url"), link.get("display_order") or 0),
            )
    return {"success": True, "message": "Social links updated successfully"}


