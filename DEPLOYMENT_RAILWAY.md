## Deploy to Railway

This repo is set up for two services on Railway:
- Backend (FastAPI) from `backend/` (Procfile and Dockerfile provided)
- Frontend (static) from `frontend/` (Dockerfile builds and serves via Nginx)

### Prereqs
- Railway account and CLI (optional)
- A GitHub repo with this code

### Environment variables
Backend service (set in Railway):
- FRONTEND_URL: https://your-frontend-domain
- FRONTEND_URLS: https://your-frontend-alias (optional, comma-separated)
- PORT: 3001 (Railway will inject PORT; Procfile/Dockerfile support it)
- JWT_SECRET: set a strong secret
- DB_PATH: ./database/portfolio.db

Frontend service (optional):
- VITE_API_URL: https://your-backend-domain/api

### Deploy steps
1) Push this repo to GitHub
2) In Railway, create a New Project → Deploy from GitHub
3) Add two services from the same repo:
   - Service 1: Backend → set Root directory to `backend/`
     - Railway will detect Procfile or Dockerfile and run Uvicorn
     - Add env vars listed above
   - Service 2: Frontend → set Root directory to `frontend/`
     - Dockerfile builds and serves with Nginx
     - Set `VITE_API_URL` to your backend URL + `/api`
4) Wait for deploys, then update FRONTEND_URL in backend to the frontend public URL and redeploy backend.

### Notes
- SQLite file lives at `backend/database/portfolio.db`. For persistence, attach a volume in Railway or switch to a managed DB.
- CORS is already configured in FastAPI to accept `FRONTEND_URL` and common localhost/LAN origins.
