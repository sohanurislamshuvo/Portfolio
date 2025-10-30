# 🚀 Backend Setup Guide

This guide will help you set up the Node.js + SQLite backend for your portfolio website.

## 📋 Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Shared hosting** with Node.js support (or local development)

## 🛠️ Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Initialize Database

```bash
npm run init-db
```

This will:
- Create the SQLite database file
- Set up all tables with proper schema
- Insert default data (admin user, sample projects, etc.)

### 3. Configure Environment

Edit `backend/config.js` to customize:

```javascript
module.exports = {
  PORT: 3001,                    // Server port
  JWT_SECRET: 'your-secret-key', // Change this!
  DB_PATH: './database/portfolio.db',
  FRONTEND_URL: 'http://localhost:5173',
  // ... other settings
};
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### 5. Test the API

Visit `http://localhost:3001/health` to verify the server is running.

## 🔐 Default Admin Credentials

- **Username:** `shuvo`
- **Password:** `404 not found shuvo is no more`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Portfolio Management
- `GET /api/portfolio/config` - Get portfolio configuration
- `PUT /api/portfolio/config` - Update configuration (admin)
- `GET /api/portfolio/projects` - Get all projects
- `POST /api/portfolio/projects` - Create project (admin)
- `PUT /api/portfolio/projects/:id` - Update project (admin)
- `DELETE /api/portfolio/projects/:id` - Delete project (admin)

### Skills Management
- `GET /api/portfolio/skills` - Get all skills
- `POST /api/portfolio/skills` - Create skill (admin)
- `PUT /api/portfolio/skills/:id` - Update skill (admin)
- `DELETE /api/portfolio/skills/:id` - Delete skill (admin)

### Messages
- `GET /api/messages` - Get all messages (admin)
- `POST /api/messages` - Create message (contact form)
- `PUT /api/messages/:id/read` - Mark as read (admin)
- `DELETE /api/messages/:id` - Delete message (admin)

## 🚀 Deployment

### Shared Hosting (cPanel, etc.)

1. **Upload backend files** to your hosting account
2. **Install Node.js** (contact hosting provider if not available)
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

Set these in your hosting panel or `.env` file:

```env
PORT=3001
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key
DB_PATH=./database/portfolio.db
FRONTEND_URL=https://yourdomain.com
```

## 🔧 Frontend Integration

### 1. Update Frontend Environment

Create `.env` file in your frontend root:

```env
VITE_API_URL=https://yourdomain.com:3001/api
```

### 2. Replace UIConfigContext

The new `ApiContext` will handle all data operations with the backend.

### 3. Update Admin Panel

The admin panel will now use API calls instead of localStorage.

## 🐛 Troubleshooting

### Common Issues:

1. **Database not found**
   - Run `npm run init-db` again
   - Check file permissions

2. **Port already in use**
   - Change PORT in config.js
   - Kill existing processes

3. **CORS errors**
   - Update FRONTEND_URL in config.js
   - Check frontend VITE_API_URL

4. **Authentication fails**
   - Verify JWT_SECRET in config.js
   - Check admin credentials

### Logs:
- Check console output for errors
- Database errors are logged to console
- API errors return structured JSON responses

## 📊 Database Schema

The SQLite database includes these tables:

- **users** - Admin authentication
- **portfolio_config** - Portfolio configuration (JSON)
- **projects** - Project portfolio items
- **skills** - Skills with proficiency levels
- **social_links** - Social media links
- **messages** - Contact form submissions

## 🔒 Security Features

- **Rate Limiting** - Prevents abuse
- **CORS** - Cross-origin request protection
- **Helmet** - Security headers
- **JWT** - Secure authentication
- **Input Validation** - Request validation
- **SQL Injection Protection** - Parameterized queries

## 📈 Performance

- **SQLite** - Fast, lightweight database
- **Rate Limiting** - Prevents abuse
- **Connection Pooling** - Efficient database connections
- **JSON Responses** - Optimized data format

## 🎯 Next Steps

1. **Test all endpoints** with Postman or curl
2. **Update frontend** to use API context
3. **Deploy to production** hosting
4. **Monitor logs** for any issues
5. **Backup database** regularly

---

**Your backend is ready!** 🎉

The Node.js + SQLite backend provides:
- ✅ **Persistent data storage**
- ✅ **Multi-device synchronization**
- ✅ **Secure authentication**
- ✅ **RESTful API**
- ✅ **Easy deployment**
- ✅ **Production ready**
