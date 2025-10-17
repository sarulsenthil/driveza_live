# 🚀 Quick Start Guide - DriveZA

## View Your Website in 3 Steps

### Option 1: Direct File Open (Fastest)
```bash
# Just double-click index.html in Finder
# OR from terminal:
open index.html
```

### Option 2: Local Server (Recommended)
```bash
# Navigate to project folder
cd /Users/arulshanmugam/driveza-app

# Start Python server
python3 -m http.server 8000

# Open browser to:
# http://localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 📍 What to View First

### 1. Homepage
**File**: `index.html`
- Features the 3 Volvo vehicles
- Clean Tesla-inspired design
- Responsive navigation

### 2. Inventory Page
**File**: `inventory.html`
- Browse all vehicles
- Try the filters (Volvo, Hybrid, Electric, Price ranges)
- Click any car to see details

### 3. Car Detail Pages
**Direct Links**:
- `car-detail-1.html` - 2024 XC90 B5 Core (White) - **7 photos!**
- `car-detail-2.html` - 2024 XC90 T8 Core (Black)
- `car-detail-3.html` - 2024 EX90 (Gray Electric)

---

## 🎨 Key Features to Check Out

### Navigation
- ✅ Transparent navbar → solid white on scroll
- ✅ Mobile hamburger menu
- ✅ Smooth scroll animations

### Homepage Features
- ✅ Full-screen hero with black background
- ✅ Featured vehicles with real photos
- ✅ Click any car to view details
- ✅ Contact form

### Inventory Features
- ✅ Search by make/model/year
- ✅ Filter by fuel type (try "Electric"!)
- ✅ Filter by price range
- ✅ Grid/List view toggle
- ✅ Sort by price

### Detail Page Features (Best Part!)
- ✅ **7-image gallery** for XC90 B5
- ✅ Click thumbnails to change main image
- ✅ Complete specifications
- ✅ Feature badges
- ✅ Financing calculator
- ✅ Multiple contact options
- ✅ Similar vehicles section

---

## 🖼️ Available Photos

### 2024 Volvo XC90 B5 Core (ID: 1)
✅ Front view
✅ Side view  
✅ Interior
✅ Steering wheel
✅ Third row seats
✅ Panoramic sunroof
✅ Rear view

### 2024 Volvo XC90 T8 Core (ID: 2)
✅ Front view
✅ Side view

### 2024 Volvo EX90 (ID: 3)
✅ Front view

---

## 🔧 Quick Customization

### Change a Vehicle Price
**File**: `script.js` (line 8)
```javascript
price: 1250000,  // Change this number
```

### Add Your Logo
Replace `logo.svg` with your company logo

### Update Contact Info
**Files**: All HTML files
Current phone: `925-503-7734`
Current email: `sales@drivezamotors.com`

### Change Colors
**File**: `styles.css`
```css
#171a20  /* Main black - Search & Replace */
#5c5e62  /* Gray text */
```

---

## 📱 Test Responsive Design

### Desktop
- Open browser normally
- Navigate through all pages
- Test hover effects

### Tablet (768px)
1. Open DevTools (F12)
2. Click device toolbar
3. Select iPad
4. Check menu and layouts

### Mobile (375px)
1. Open DevTools (F12)
2. Select iPhone
3. Test hamburger menu
4. Scroll galleries

---

## ✅ Checklist - Things to Verify

- [ ] Homepage loads with 3 vehicles
- [ ] All vehicle images show correctly
- [ ] Click a car → goes to detail page
- [ ] Gallery thumbnails work on detail pages
- [ ] Inventory filters work (try Electric!)
- [ ] Mobile menu opens/closes
- [ ] Contact buttons have correct links
- [ ] Navbar scrolls and changes color
- [ ] All pages are responsive

---

## 🎯 Popular Test Scenarios

### Test 1: Browse Electric Vehicles
1. Go to `inventory.html`
2. Select "Electric" from Fuel Type filter
3. Should show the EX90
4. Click to view details

### Test 2: View Full Gallery
1. Go to `car-detail-1.html`
2. Click each thumbnail
3. Watch main image change smoothly
4. Scroll thumbnail strip horizontally

### Test 3: Mobile Navigation
1. Resize browser to 375px width
2. Click hamburger menu (≡)
3. Navigate to different pages
4. Menu should close automatically

### Test 4: Contact Flow
1. On any detail page
2. Click "Call Us" button
3. Should open phone dialer
4. Click "WhatsApp" 
5. Should open WhatsApp with pre-filled message

---

## 🐛 Troubleshooting

### Images Not Showing?
**Check**: Images are in `/images/cars/` folder
```bash
ls -la images/cars/
```
Should see 10 JPG files

### Styles Look Wrong?
**Clear browser cache**:
- Chrome: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)
- Or hard refresh

### JavaScript Not Working?
**Check console** (F12 → Console tab)
Look for any red errors

### Can't Open Files?
**Use local server**:
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

---

## 📞 Need Help?

**Check these files:**
- `README.md` - Full documentation
- `PROJECT_SUMMARY.md` - What was built
- This file - Quick start guide

**Common Questions:**
1. **Where's the car data?** → `script.js` line 1-69
2. **How to add cars?** → See README.md "Adding New Vehicles"
3. **Change colors?** → Edit `styles.css` color codes
4. **Add more photos?** → Copy to `images/cars/` and update `script.js`

---

## 🎉 You're All Set!

Your Tesla-inspired automotive website is ready!

**Next Steps:**
1. View the site
2. Test all features
3. Customize content
4. Add your branding
5. Deploy online

**Enjoy your new website!** 🚗✨

