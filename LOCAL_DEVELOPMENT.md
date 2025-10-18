# 🚀 Local Development Setup

## Quick Start

### Option 1: Use the Start Script
```bash
./start-local-server.sh
```

### Option 2: Manual Python Server
```bash
python3 -m http.server 8000
```

## 🌐 Access URLs

Once the server is running, access the website at:

- **Homepage**: http://localhost:8000/html/index.html
- **Inventory**: http://localhost:8000/html/inventory.html
- **About**: http://localhost:8000/html/about.html
- **Contact**: http://localhost:8000/html/contact.html

## 🔧 Why Use a Local Server?

The website uses JavaScript to fetch JSON data (`data/cars.json`). When opening HTML files directly in a browser (using `file://` protocol), browsers block these requests due to CORS (Cross-Origin Resource Sharing) security policies.

Using a local HTTP server (`http://localhost:8000`) allows the JavaScript to properly fetch the JSON data.

## 🛠️ Development Workflow

1. **Start the server**: `./start-local-server.sh`
2. **Open browser**: Navigate to http://localhost:8000/html/index.html
3. **Make changes**: Edit files in your IDE
4. **Refresh browser**: See changes immediately
5. **Stop server**: Press `Ctrl+C` in terminal

## 📁 Project Structure

```
driveza-app/
├── html/           # HTML pages
├── css/            # Stylesheets
├── js/             # JavaScript files
├── images/         # Images and assets
├── data/           # JSON data files
└── start-local-server.sh  # Development server script
```

## 🚨 Troubleshooting

### "CORS policy" errors
- Make sure you're accessing via `http://localhost:8000` not `file://`
- Ensure the local server is running

### Cars not loading
- Check browser console for errors
- Verify `data/cars.json` exists and is valid JSON
- Check that all JavaScript files are loading properly

### Images not showing
- Verify image paths in `data/cars.json` are correct
- Check that images exist in the `images/` directory
