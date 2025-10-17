# DriveZA Motors - Project Structure

## 📁 Folder Organization

```
driveza-app/
├── html/                    # All HTML files
│   ├── index.html          # Main homepage
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── inventory.html      # Inventory listing
│   ├── car-detail-1.html   # Volvo XC90 B5 Core
│   ├── car-detail-2.html   # Volvo XC90 T8 Core
│   ├── car-detail-3.html   # Volvo EX90 Ultra
│   ├── car-detail-4.html   # Mercedes GLE 350 (SOLD)
│   └── car-detail-5.html   # Porsche Cayenne
├── css/                    # All CSS files
│   ├── styles.css          # Main stylesheet
│   ├── car-detail.css      # Car detail page styles
│   ├── about.css           # About page styles
│   ├── contact.css         # Contact page styles
│   └── inventory.css       # Inventory page styles
├── js/                     # All JavaScript files
│   ├── script.js           # Main JavaScript
│   ├── about.js            # About page scripts
│   ├── contact.js          # Contact page scripts
│   └── inventory.js        # Inventory page scripts
├── images/                 # All images
│   └── cars/              # Car images organized by vehicle
│       ├── xc90-b5/       # Volvo XC90 B5 images
│       ├── xc90-t8/       # Volvo XC90 T8 images
│       ├── ex90/          # Volvo EX90 images
│       ├── mercedes-gle350/ # Mercedes GLE 350 images
│       └── porsche-cayenne/ # Porsche Cayenne images
├── logo.svg               # Company logo
├── index.html             # Root redirect to html/index.html
└── README.md              # Project documentation
```

## 🚀 Quick Start

1. **Local Development**: Open `html/index.html` in your browser
2. **Production**: Deploy the entire folder structure to your web server
3. **AWS S3**: Use the deployment scripts in the root directory

## 📝 File Paths

All file references have been updated to use relative paths:
- CSS files: `../css/filename.css`
- JS files: `../js/filename.js`
- Images: `../images/cars/vehicle/filename.jpg`
- Logo: `../logo.svg`

## 🔧 Deployment

The project is organized for easy deployment:
- **Static Hosting**: Upload the entire folder structure
- **AWS S3**: Use the provided deployment scripts
- **GitHub Pages**: The structure works with GitHub Pages

## 📱 Features

- ✅ Tesla-inspired responsive design
- ✅ 5 vehicle inventory with detailed pages
- ✅ Image galleries for each vehicle
- ✅ Contact forms and business information
- ✅ SOLD vehicle watermarking
- ✅ Mobile-friendly navigation
- ✅ SEO-optimized structure
