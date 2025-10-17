# DriveZA - Premium Vehicle Marketplace

A modern, Tesla-inspired automotive marketplace website featuring luxury Volvo vehicles. Built with clean HTML, CSS, and JavaScript following Tesla's minimalist design philosophy.

## 🚗 Current Inventory

### Featured Vehicles (2024 Volvo Models)

1. **2024 Volvo XC90 B5 Core** - R1,250,000
   - Crystal White Pearl
   - 2.0L Turbo B5 Mild-Hybrid
   - 7-Seater SUV with Panoramic Sunroof
   - VIN: YV4L12PK6R1187732
   - [View Details](car-detail-1.html)

2. **2024 Volvo XC90 T8 Core** - R1,450,000
   - Onyx Black Metallic
   - Plug-in Hybrid (455 HP)
   - Premium Bowers & Wilkins Audio
   - VIN: YV4H60CK4R1153032
   - [View Details](car-detail-2.html)

3. **2024 Volvo EX90** - R1,850,000
   - Vapour Grey Metallic
   - 100% Electric (480 km range)
   - LiDAR Technology & Dual Motors
   - Volvo's Electric Flagship
   - [View Details](car-detail-3.html)

## 🎨 Design Theme

The website features a **Tesla-inspired minimalist design** with:
- Clean black (#171a20) and white color palette
- Sans-serif typography (Inter font)
- Smooth animations and transitions
- Full-screen hero sections
- Modern card-based layouts
- Responsive design for all devices

## 📁 Project Structure

```
driveza-app/
├── index.html              # Homepage with featured vehicles
├── inventory.html          # Full inventory page
├── about.html             # About page
├── contact.html           # Contact page
├── car-detail-1.html      # XC90 B5 Core detail page
├── car-detail-2.html      # XC90 T8 Core detail page
├── car-detail-3.html      # EX90 detail page
├── styles.css             # Main stylesheet
├── inventory.css          # Inventory page styles
├── about.css              # About page styles
├── contact.css            # Contact page styles
├── car-detail.css         # Car detail pages styles
├── script.js              # Main JavaScript
├── inventory.js           # Inventory page JavaScript
├── about.js               # About page JavaScript
├── contact.js             # Contact page JavaScript
├── logo.svg               # Company logo
└── images/
    └── cars/              # Vehicle images
        ├── xc90-b5-front.jpg
        ├── xc90-b5-side.jpg
        ├── xc90-b5-interior.jpg
        ├── xc90-b5-steering.jpg
        ├── xc90-b5-thirdrow.jpg
        ├── xc90-b5-sunroof.jpg
        ├── xc90-b5-rear.jpg
        ├── xc90-t8-front.jpg
        ├── xc90-t8-side.jpg
        └── ex90-front.jpg
```

## ✨ Features

### Homepage (index.html)
- Full-screen hero section with overlay
- Featured vehicles showcase (3 cars)
- Why Choose Us section with key features
- About section with statistics
- Contact form
- Responsive navigation with mobile menu

### Inventory Page (inventory.html)
- Advanced filtering system:
  - Search by make/model/year
  - Filter by make, fuel type, transmission
  - Price range filtering
  - Sort by price
- Grid and list view toggle
- Real vehicle images
- Click any car to view full details

### Car Detail Pages
- Image gallery with 7+ photos per vehicle
- Complete specifications
- Key features list
- Vehicle description
- Price with financing estimates
- Contact options (Phone, WhatsApp, Email)
- Dealer information
- Similar vehicles recommendations
- EV-specific information (for EX90)

### Styling
- **Tesla-inspired minimalism**
- Smooth scroll animations
- Hover effects on cards and buttons
- Custom scrollbars
- Responsive design (mobile, tablet, desktop)
- Modern CSS Grid and Flexbox layouts

## 🚀 Getting Started

### Viewing the Website

1. **Open in Browser**
   ```bash
   open index.html
   ```
   Or simply double-click `index.html`

2. **Using Local Server** (recommended for development)
   ```bash
   # Python 3
   python -m http.server 8000
   
   # PHP
   php -S localhost:8000
   ```
   Then visit: `http://localhost:8000`

### Navigation

- **Home** → Featured vehicles and company info
- **Inventory** → Browse all vehicles with filters
- **About** → Company information and team
- **Contact** → Get in touch
- **Car Details** → Click any vehicle for full information

## 🛠️ Customization

### Adding New Vehicles

Edit `script.js` and add to the `carsData` array:

```javascript
{
    id: 4,
    make: "Volvo",
    model: "Your Model",
    year: 2024,
    price: 1000000,
    mileage: 5000,
    fuel: "Petrol",
    transmission: "Automatic",
    image: "images/cars/your-image.jpg",
    features: ["Feature 1", "Feature 2"],
    color: "Color Name",
    engine: "Engine Specs",
    doors: 5,
    seats: 7,
    vin: "VIN_NUMBER",
    description: "Vehicle description...",
    gallery: [
        "images/cars/image1.jpg",
        "images/cars/image2.jpg"
    ]
}
```

### Creating Detail Pages

1. Copy `car-detail-1.html` to `car-detail-[id].html`
2. Update:
   - Title and meta tags
   - Vehicle information
   - Image gallery
   - Specifications
   - Features
   - Similar vehicles links

### Changing Colors

Edit the CSS files and replace:
- Primary Black: `#171a20`
- Secondary Gray: `#5c5e62`
- Light Gray: `#a0a0a0`
- Background Gray: `#f4f4f4`

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Contact Information

- **Phone**: 925-503-7734
- **WhatsApp**: 925-503-7734
- **Email**: sales@drivezamotors.com
- **Address**: 4047, 1st St, Suite 116, Livermore, CA 94551
- **Hours**: Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM

## 🎯 Future Enhancements

- [ ] Backend integration (PHP/Node.js)
- [ ] Database for inventory management
- [ ] User authentication
- [ ] Saved favorites
- [ ] Advanced search with autocomplete
- [ ] Financing calculator
- [ ] Test drive scheduling system
- [ ] Live chat support
- [ ] Multiple language support
- [ ] Blog/News section

## 📄 License

© 2025 DriveZA. All rights reserved.

## 🤝 Credits

- Design inspired by Tesla.com
- Font: Inter (Google Fonts)
- Icons: Font Awesome 6.0
- Images: Original vehicle photography

---

**Built with ❤️ for automotive excellence**
