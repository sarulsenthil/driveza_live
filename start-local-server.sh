#!/bin/bash

echo "🚀 Starting DriveZA Motors Local Development Server..."
echo ""
echo "📁 Serving files from: $(pwd)"
echo "🌐 Website will be available at:"
echo "   • Homepage: http://localhost:8000/html/index.html"
echo "   • Direct access: http://localhost:8000/html/"
echo ""
echo "💡 To stop the server, press Ctrl+C"
echo ""

# Start the Python HTTP server
python3 -m http.server 8000
