#!/bin/bash

# Portfolio Backend Setup Script
# This script helps set up the Node.js + SQLite backend

echo "🚀 Portfolio Backend Setup"
echo "=========================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) is installed"

# Navigate to backend directory
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found. Please run this script from the project root."
    exit 1
fi

cd backend

echo "📁 Changed to backend directory"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Initialize database
echo "🗄️ Initializing database..."
npm run init-db

if [ $? -ne 0 ]; then
    echo "❌ Failed to initialize database"
    exit 1
fi

echo "✅ Database initialized successfully"

# Check if database file exists
if [ ! -f "database/portfolio.db" ]; then
    echo "❌ Database file not found after initialization"
    exit 1
fi

echo "✅ Database file created: database/portfolio.db"

# Display configuration
echo ""
echo "🔧 Configuration:"
echo "   Port: 3001"
echo "   Database: database/portfolio.db"
echo "   Admin Username: shuvo"
echo "   Admin Password: 404 not found shuvo is no more"
echo ""

# Ask if user wants to start the server
read -p "🚀 Do you want to start the backend server now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting backend server..."
    echo "   Server will be available at: http://localhost:3001"
    echo "   Health check: http://localhost:3001/health"
    echo "   API base: http://localhost:3001/api"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npm start
else
    echo "✅ Backend setup completed!"
    echo ""
    echo "To start the server later, run:"
    echo "   cd backend"
    echo "   npm start"
    echo ""
    echo "To start in development mode:"
    echo "   cd backend"
    echo "   npm run dev"
fi
