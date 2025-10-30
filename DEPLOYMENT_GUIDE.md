# 🚀 Complete Deployment Guide

This guide covers deploying both the frontend and backend of your portfolio website.

## 📋 Prerequisites

- **Shared hosting** with Node.js support
- **Domain name** (optional)
- **FTP/SFTP access** to your hosting account

## 🏗️ Architecture Overview

```
Frontend (React) → Backend (Node.js) → Database (SQLite)
     ↓                    ↓                    ↓
  Static Files        API Server          File-based DB
```

## 🚀 Deployment Steps

### 1. Backend Deployment

#### Upload Backend Files
1. **Create backend directory** on your hosting account
2. **Upload all backend files** to this directory
3. **Ensure proper file permissions** (755 for directories, 644 for files)

#### Install Dependencies
```bash
cd backend
npm install --production
```

#### Initialize Database
```bash
npm run init-db
```

#### Configure Environment
Edit `config.js` for production:

```javascript
module.exports = {
  PORT: 3001,
  NODE_ENV: 'production',
  JWT_SECRET: 'your-super-secret-jwt-key-change-this',
  DB_PATH: './database/portfolio.db',
  FRONTEND_URL: 'https://yourdomain.com',
  RATE_LIMIT_WINDOW_MS: 900000,
  RATE_LIMIT_MAX_REQUESTS: 100
};
```

#### Start Backend Server
```bash
npm start
```

### 2. Frontend Deployment

#### Build Frontend
```bash
npm run build
```

#### Configure Environment
Create `.env` file in frontend root:

```env
VITE_API_URL=https://yourdomain.com:3001/api
```

#### Upload Frontend Files
1. **Upload dist folder contents** to your web root
2. **Ensure .htaccess file** is present for client-side routing
3. **Set proper file permissions**

### 3. Domain Configuration

#### Point Domain to Frontend
- **A Record** → Your hosting IP
- **CNAME** → www.yourdomain.com

#### SSL Certificate
- **Let's Encrypt** (free)
- **Hosting provider SSL** (usually included)

## 🔧 Hosting Provider Setup

### cPanel Hosting

1. **Enable Node.js** in cPanel
2. **Create Node.js app** with port 3001
3. **Set startup file** to `server.js`
4. **Upload files** via File Manager
5. **Start application**

### Shared Hosting (Generic)

1. **Contact support** to enable Node.js
2. **Upload files** via FTP/SFTP
3. **Set file permissions**
4. **Configure startup script**

## 📁 File Structure After Deployment

```
yourdomain.com/
├── index.html              # Frontend entry point
├── assets/                 # Frontend assets
├── .htaccess              # Apache rewrite rules
├── backend/               # Backend directory
│   ├── server.js          # Main server file
│   ├── config.js          # Configuration
│   ├── package.json       # Dependencies
│   ├── database/          # SQLite database
│   │   └── portfolio.db   # Database file
│   └── routes/            # API routes
└── node_modules/          # Backend dependencies
```

## 🔐 Security Configuration

### Backend Security
- **Change JWT_SECRET** to a random string
- **Update admin password** in database
- **Enable HTTPS** for all communications
- **Configure rate limiting** appropriately

### Frontend Security
- **Use HTTPS** for all API calls
- **Validate all inputs** on frontend
- **Implement proper error handling**

## 📊 Monitoring & Maintenance

### Logs
- **Backend logs** - Check console output
- **Frontend errors** - Browser console
- **Server logs** - Hosting provider logs

### Backups
- **Database backup** - Copy `portfolio.db` file
- **Code backup** - Version control (Git)
- **Configuration backup** - Save config files

### Updates
- **Dependencies** - Regular security updates
- **Node.js** - Keep updated
- **Database** - Regular backups

## 🐛 Troubleshooting

### Common Issues

#### Backend Not Starting
- Check Node.js version compatibility
- Verify file permissions
- Check port availability
- Review error logs

#### Frontend Not Loading
- Verify .htaccess file
- Check file permissions
- Confirm index.html exists
- Test direct file access

#### API Connection Failed
- Verify backend is running
- Check CORS configuration
- Confirm API URL in frontend
- Test API endpoints directly

#### Database Errors
- Check file permissions on database
- Verify database initialization
- Review SQLite compatibility
- Check disk space

### Debug Commands

```bash
# Check backend status
curl http://yourdomain.com:3001/health

# Test API endpoints
curl -X POST http://yourdomain.com:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"shuvo","password":"404 not found shuvo is no more"}'

# Check file permissions
ls -la backend/database/portfolio.db
```

## 🚀 Performance Optimization

### Backend
- **Enable gzip compression**
- **Implement caching headers**
- **Optimize database queries**
- **Use connection pooling**

### Frontend
- **Enable gzip compression**
- **Optimize images**
- **Minify CSS/JS**
- **Use CDN for assets**

## 📈 Scaling Considerations

### Current Setup (Small-Medium)
- **SQLite database** - Up to 1TB
- **Single server** - Shared hosting
- **File-based storage** - Simple deployment

### Future Scaling (Large)
- **PostgreSQL/MySQL** - Larger databases
- **Dedicated server** - Better performance
- **Load balancing** - Multiple servers
- **CDN** - Global content delivery

## 🔄 Backup & Recovery

### Automated Backups
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
cp backend/database/portfolio.db "backups/portfolio_$DATE.db"
```

### Recovery Process
1. **Stop backend server**
2. **Restore database file**
3. **Restart backend server**
4. **Test functionality**

## 📞 Support & Maintenance

### Regular Tasks
- **Monitor server logs**
- **Check database size**
- **Update dependencies**
- **Backup data**
- **Test functionality**

### Emergency Procedures
- **Server down** - Check hosting status
- **Database corrupted** - Restore from backup
- **API errors** - Review logs and restart
- **Frontend issues** - Check file permissions

---

## 🎯 Deployment Checklist

- [ ] Backend files uploaded
- [ ] Dependencies installed
- [ ] Database initialized
- [ ] Configuration updated
- [ ] Backend server running
- [ ] Frontend built and uploaded
- [ ] Environment variables set
- [ ] SSL certificate configured
- [ ] Domain pointing correctly
- [ ] API endpoints tested
- [ ] Admin panel accessible
- [ ] Contact form working
- [ ] Database backups scheduled

**Your portfolio is now live!** 🎉

The Node.js + SQLite backend provides:
- ✅ **Persistent data storage**
- ✅ **Multi-device synchronization**
- ✅ **Secure authentication**
- ✅ **RESTful API**
- ✅ **Easy deployment**
- ✅ **Production ready**
