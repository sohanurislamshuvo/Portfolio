#!/bin/bash

echo "🚀 Building Portfolio for Production..."
echo

# Build the application from the frontend folder
(cd frontend && npm run build)

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please check for errors."
    exit 1
fi

echo
echo "✅ Build completed successfully!"
echo
echo "📁 Production files are ready in the 'frontend/dist' folder"
echo
echo "📋 Next steps:"
echo "   1. Upload all files from 'frontend/dist' folder to your web hosting"
echo "   2. Ensure .htaccess file is uploaded (might be hidden)"
echo "   3. Visit your domain to see your portfolio live!"
echo
echo "🔐 Admin Panel Access:"
echo "   URL: https://yourdomain.com/hey-admin"
echo "   Username: shuvo"
echo "   Password: 404 not found shuvo is no more"
echo
echo "🎉 Ready for deployment!"

# Make the script executable
chmod +x deploy.sh
