## FastAPI Backend

### Setup
1. Create and activate a Python 3.10+ venv
2. Install deps:
   - `pip install -r requirements.txt`
3. Initialize DB (optional if `database/portfolio.db` already exists):
   - `python - <<PY
import sqlite3, os
sql_path = os.path.join('database','init.sql')
db_path = os.path.join('database','portfolio.db')
con = sqlite3.connect(db_path)
with open(sql_path,'r',encoding='utf-8') as f:
    con.executescript(f.read())
con.commit(); con.close()
print('DB initialized at', db_path)
PY`

### Run (dev)
- Windows PowerShell:
  - `$env:FRONTEND_URL='http://localhost:8080'; uvicorn app.main:app --reload --host 0.0.0.0 --port 3001`
- Unix shells:
  - `FRONTEND_URL='http://localhost:8080' uvicorn app.main:app --reload --host 0.0.0.0 --port 3001`

Health check: http://localhost:3001/health

# Portfolio Backend API

A Node.js + SQLite backend API for the portfolio website with authentication, CRUD operations, and message management.

## 🚀 Features

- **Authentication**: JWT-based admin authentication
- **Database**: SQLite for lightweight, file-based storage
- **CRUD Operations**: Full portfolio management (projects, skills, config)
- **Message System**: Contact form submissions with admin management
- **Security**: Rate limiting, CORS, Helmet security headers
- **API**: RESTful endpoints with proper error handling

## 📁 Project Structure

```
backend/
├── config.js              # Configuration settings
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── database/
│   ├── db.js             # Database connection and utilities
│   └── init.sql          # Database schema
├── scripts/
│   └── init-db.js        # Database initialization script
├── middleware/
│   └── auth.js           # Authentication middleware
└── routes/
    ├── auth.js           # Authentication routes
    ├── portfolio.js      # Portfolio management routes
    └── messages.js       # Message management routes
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Initialize database:**
   ```bash
   npm run init-db
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Start production server:**
   ```bash
   npm start
   ```

## 🔧 Configuration

Edit `config.js` to customize:

- **Port**: Server port (default: 3001)
- **JWT Secret**: Change for production
- **Database Path**: SQLite database location
- **CORS**: Frontend URL for CORS
- **Rate Limiting**: Request limits and windows

## 📊 Database Schema

### Tables:
- **users**: Admin authentication
- **portfolio_config**: Portfolio configuration (JSON)
- **projects**: Project portfolio items
- **skills**: Skills with proficiency levels
- **social_links**: Social media links
- **messages**: Contact form submissions

## 🔐 Authentication

**Default Admin Credentials:**
- Username: `shuvo`
- Password: `404 not found shuvo is no more`

**JWT Token:**
- Expires in 24 hours
- Required for admin operations
- Include in Authorization header: `Bearer <token>`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Portfolio
- `GET /api/portfolio/config` - Get portfolio configuration
- `PUT /api/portfolio/config` - Update configuration (admin)
- `GET /api/portfolio/projects` - Get all projects
- `POST /api/portfolio/projects` - Create project (admin)
- `PUT /api/portfolio/projects/:id` - Update project (admin)
- `DELETE /api/portfolio/projects/:id` - Delete project (admin)
- `GET /api/portfolio/skills` - Get all skills
- `POST /api/portfolio/skills` - Create skill (admin)
- `PUT /api/portfolio/skills/:id` - Update skill (admin)
- `DELETE /api/portfolio/skills/:id` - Delete skill (admin)
- `GET /api/portfolio/social-links` - Get social links
- `PUT /api/portfolio/social-links` - Update social links (admin)

### Messages
- `GET /api/messages` - Get all messages (admin)
- `GET /api/messages/:id` - Get message by ID (admin)
- `POST /api/messages` - Create message (contact form)
- `PUT /api/messages/:id/read` - Mark as read (admin)
- `PUT /api/messages/:id/unread` - Mark as unread (admin)
- `DELETE /api/messages/:id` - Delete message (admin)
- `GET /api/messages/stats/summary` - Get message statistics (admin)

## 🚀 Deployment

### Shared Hosting (cPanel, etc.)

1. **Upload files** to your hosting account
2. **Install Node.js** (if not available, contact hosting provider)
3. **Install dependencies:**
   ```bash
   npm install --production
   ```
4. **Initialize database:**
   ```bash
   npm run init-db
   ```
5. **Start server:**
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file (or set in hosting panel):

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=./database/portfolio.db
FRONTEND_URL=https://yourdomain.com
```

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse
- **CORS**: Cross-origin request protection
- **Helmet**: Security headers
- **JWT**: Secure authentication
- **Input Validation**: Request validation
- **SQL Injection Protection**: Parameterized queries

## 📝 Usage Examples

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"shuvo","password":"404 not found shuvo is no more"}'
```

### Get Portfolio Config
```bash
curl http://localhost:3001/api/portfolio/config
```

### Create Project (with auth)
```bash
curl -X POST http://localhost:3001/api/portfolio/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"title":"My Project","description":"Project description","technologies":["React","Node.js"]}'
```

## 🐛 Troubleshooting

### Common Issues:

1. **Database not found**: Run `npm run init-db`
2. **Port already in use**: Change PORT in config.js
3. **CORS errors**: Update FRONTEND_URL in config.js
4. **Authentication fails**: Check JWT_SECRET in config.js

### Logs:
- Check console output for errors
- Database errors are logged to console
- API errors return structured JSON responses

## 📈 Performance

- **SQLite**: Fast, lightweight database
- **Rate Limiting**: Prevents abuse
- **Connection Pooling**: Efficient database connections
- **JSON Responses**: Optimized data format

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the React frontend:

1. **Replace localStorage** with API calls
2. **Add authentication** to admin panel
3. **Real-time updates** across devices
4. **Persistent data** storage

## 📞 Support

For issues or questions:
1. Check the logs for error messages
2. Verify configuration settings
3. Test API endpoints with curl/Postman
4. Check database initialization

---

**Ready to deploy!** 🚀
