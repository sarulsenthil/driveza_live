// Data loader utility for DriveZA Motors
class DriveZAData {
    constructor() {
        this.data = null;
        this.loadPromise = null;
    }

    async loadData() {
        if (this.data) {
            return this.data;
        }

        if (this.loadPromise) {
            return this.loadPromise;
        }

        this.loadPromise = this.fetchData();
        this.data = await this.loadPromise;
        return this.data;
    }

    async fetchData() {
        // Try multiple possible paths for the JSON file
        const possiblePaths = [
            '../data/cars.json',
            './data/cars.json',
            'data/cars.json',
            '/data/cars.json'
        ];

        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    return await response.json();
                }
            } catch (error) {
                console.log(`Failed to load from ${path}:`, error.message);
                continue;
            }
        }

        // If all paths fail, use embedded fallback data
        console.warn('Could not load JSON file, using embedded fallback data');
        return this.getFallbackData();
    }

    getFallbackData() {
        return {
            "cars": [
                {
                    "id": 1,
                    "make": "Volvo",
                    "model": "XC90 B5 Core",
                    "year": 2024,
                    "price": 41995,
                    "mileage": 18500,
                    "fuel": "Gas",
                    "transmission": "Automatic",
                    "image": "../images/cars/xc90-b5-front.jpg",
                    "features": ["7-Seater", "Leather Seats", "AWD", "Pilot Assist", "Wireless Charging", "Sunroof", "Heated Seats", "Premium Audio", "Apple CarPlay", "Blind Spot Assist", "Parking Assist", "Manufacturer Warranty"],
                    "color": "Onyx Black Metallic",
                    "engine": "2.0L Turbo I4",
                    "doors": 5,
                    "seats": 7,
                    "vin": "YV4L12PK6R1187732",
                    "description": "Exceptional 2024 Volvo XC90 B5 Core in sophisticated Onyx Black Metallic. This flagship SUV delivers premium comfort and advanced technology. The perfect blend of luxury, safety, and performance for the modern family.",
                    "gallery": ["../images/cars/xc90-b5-front.jpg", "../images/cars/xc90-b5-side.jpg", "../images/cars/xc90-b5-rear.jpg", "../images/cars/xc90-b5-interior.jpg", "../images/cars/xc90-b5-steering.jpg", "../images/cars/xc90-b5-thirdrow.jpg", "../images/cars/xc90-b5-sunroof.jpg"]
                },
                {
                    "id": 2,
                    "make": "Volvo",
                    "model": "XC90 T8 Core",
                    "year": 2024,
                    "price": 51995,
                    "mileage": 21800,
                    "fuel": "Hybrid",
                    "transmission": "Automatic",
                    "image": "../images/cars/xc90-t8/IMG_7940.jpeg",
                    "features": ["Plug-in Hybrid", "7-Seater", "Leather Seats", "AWD", "Pilot Assist", "Wireless Charging", "Premium Audio", "Heated Seats", "Sunroof", "Protection Package", "Apple CarPlay", "Blind Spot Assist", "Parking Assist", "Manufacturer Warranty"],
                    "color": "Gray Metallic",
                    "engine": "2.0L Turbo + Electric T8",
                    "doors": 5,
                    "seats": 7,
                    "vin": "YV4H60CK4R1153032",
                    "description": "Exceptional 2024 Volvo XC90 T8 Core Plug-in Hybrid in sophisticated Gray Metallic. This flagship SUV delivers 455hp combined power with all-electric range capability. The ultimate in luxury, technology, and sustainable performance.",
                    "gallery": ["../images/cars/xc90-t8/IMG_7940.jpeg", "../images/cars/xc90-t8/IMG_7939.jpeg", "../images/cars/xc90-t8/IMG_7941.jpeg", "../images/cars/xc90-t8/IMG_7942.jpeg", "../images/cars/xc90-t8/IMG_7943.jpeg", "../images/cars/xc90-t8/IMG_7944.jpeg", "../images/cars/xc90-t8/IMG_7945.jpeg", "../images/cars/xc90-t8/IMG_7946.jpeg", "../images/cars/xc90-t8/IMG_7947.jpeg", "../images/cars/xc90-t8/IMG_7948.jpeg", "../images/cars/xc90-t8/IMG_7949.jpeg", "../images/cars/xc90-t8/IMG_7950.jpeg"]
                },
                {
                    "id": 3,
                    "make": "Volvo",
                    "model": "EX90 Ultra",
                    "year": 2025,
                    "price": 71995,
                    "mileage": 0,
                    "fuel": "Electric",
                    "transmission": "Automatic",
                    "image": "../images/cars/ex90/IMG_7920_3.jpeg",
                    "features": ["Fully Electric", "7-Seater", "Leather Seats", "AWD", "Pilot Assist", "Wireless Charging", "Premium Audio", "Heated Seats", "Sunroof", "Apple CarPlay", "Blind Spot Assist", "Parking Assist", "Manufacturer Warranty", "Fast Charging", "Regenerative Braking"],
                    "color": "Crystal White Pearl",
                    "engine": "Dual Electric Motors",
                    "doors": 5,
                    "seats": 7,
                    "vin": "7JDEV3VL2SG006458",
                    "description": "Revolutionary 2025 Volvo EX90 Ultra in pristine Crystal White Pearl. This fully electric flagship SUV represents the future of luxury mobility with zero emissions and cutting-edge technology.",
                    "gallery": ["../images/cars/ex90/IMG_7920_3.jpeg", "../images/cars/ex90/IMG_7921_3.jpeg", "../images/cars/ex90/IMG_7922_3.jpeg", "../images/cars/ex90/IMG_7923_3.jpeg", "../images/cars/ex90/IMG_7924_3.jpeg", "../images/cars/ex90/IMG_7925_3.jpeg", "../images/cars/ex90/IMG_7926_3.jpeg", "../images/cars/ex90/IMG_7927_3.jpeg", "../images/cars/ex90/IMG_7928_3.jpeg", "../images/cars/ex90/IMG_7929_3.jpeg", "../images/cars/ex90/IMG_7930_3.jpeg", "../images/cars/ex90/IMG_7931_2.jpeg", "../images/cars/ex90/IMG_7932_2.jpeg", "../images/cars/ex90/IMG_7933_2.jpeg", "../images/cars/ex90/IMG_7934_2.jpeg", "../images/cars/ex90/IMG_7935_2.jpeg", "../images/cars/ex90/IMG_7936_3.jpeg", "../images/cars/ex90/IMG_7937_2.jpeg"]
                },
                {
                    "id": 4,
                    "make": "Mercedes-Benz",
                    "model": "GLE 350",
                    "year": 2023,
                    "price": 41995,
                    "mileage": 15500,
                    "fuel": "Gas",
                    "transmission": "Automatic",
                    "image": "../images/cars/mercedes-gle350/IMG_7919.jpeg",
                    "features": ["Luxury SUV", "Premium Package", "Burmester Audio", "MBUX System", "Active Brake Assist", "Blind Spot Assist", "Parking Assist", "Apple CarPlay", "Sunroof", "MB-Tex Leatherette Seats", "2WD", "Heated Seats", "Ambient Lighting", "Power Liftgate", "Manufacturer Warranty"],
                    "color": "Selenite Grey Metallic",
                    "engine": "2.0L Turbo I4",
                    "doors": 5,
                    "seats": 5,
                    "vin": "4JGFB4JB8PA865553",
                    "sold": true,
                    "description": "Exceptional 2023 Mercedes-Benz GLE 350 in sophisticated Selenite Grey Metallic. This luxury SUV combines German engineering with premium comfort and advanced technology. Features the powerful 2.0L turbocharged engine with 255 horsepower.",
                    "gallery": ["../images/cars/mercedes-gle350/IMG_7919.jpeg", "../images/cars/mercedes-gle350/IMG_7920.jpeg", "../images/cars/mercedes-gle350/IMG_7922.jpeg", "../images/cars/mercedes-gle350/IMG_7923.jpeg", "../images/cars/mercedes-gle350/IMG_7924.jpeg", "../images/cars/mercedes-gle350/IMG_7925.jpeg", "../images/cars/mercedes-gle350/IMG_7926.jpeg", "../images/cars/mercedes-gle350/IMG_7928.jpeg", "../images/cars/mercedes-gle350/IMG_7929.jpeg", "../images/cars/mercedes-gle350/IMG_7930.jpeg", "../images/cars/mercedes-gle350/IMG_7936.jpeg"]
                },
                {
                    "id": 5,
                    "make": "Porsche",
                    "model": "Cayenne",
                    "year": 2021,
                    "price": 49995,
                    "mileage": 24000,
                    "fuel": "Gas",
                    "transmission": "Automatic",
                    "image": "../images/cars/porsche-cayenne/IMG_7991.jpeg",
                    "features": ["Luxury SUV", "Premium Package", "Panoramic Sunroof", "Leather Upholstery", "AWD", "Parking Assist", "Blind Spot Monitoring", "PCM System", "Apple CarPlay", "Premium Audio", "Adaptive Cruise Control", "BOSE Sound System", "Massage Seats", "Painting Protection Film", "Heated Seats", "Ventilated Seats", "Manufacturer Warranty"],
                    "color": "Moonlight Blue Metallic with Slate Grey Interior",
                    "engine": "3.0L V6 Turbo",
                    "doors": 5,
                    "seats": 5,
                    "vin": "WP1AA2AY3MDA04901",
                    "description": "Exceptional 2021 Porsche Cayenne in pristine condition. This luxury SUV combines German engineering excellence with uncompromising performance and sophistication. Features the powerful V6 engine delivering exceptional power and efficiency.",
                    "gallery": ["../images/cars/porsche-cayenne/IMG_7991.jpeg", "../images/cars/porsche-cayenne/IMG_7992.jpeg", "../images/cars/porsche-cayenne/IMG_7993.jpeg", "../images/cars/porsche-cayenne/IMG_7994.jpeg", "../images/cars/porsche-cayenne/IMG_7995.jpeg", "../images/cars/porsche-cayenne/IMG_7996.jpeg", "../images/cars/porsche-cayenne/IMG_7997.jpeg", "../images/cars/porsche-cayenne/IMG_7998.jpeg", "../images/cars/porsche-cayenne/IMG_7999.jpeg", "../images/cars/porsche-cayenne/IMG_8001.jpeg", "../images/cars/porsche-cayenne/IMG_8002.jpeg", "../images/cars/porsche-cayenne/IMG_8003.jpeg", "../images/cars/porsche-cayenne/IMG_8004.jpeg", "../images/cars/porsche-cayenne/IMG_8005.jpeg", "../images/cars/porsche-cayenne/IMG_8006.jpeg", "../images/cars/porsche-cayenne/IMG_8007.jpeg", "../images/cars/porsche-cayenne/IMG_8008.jpeg"]
                }
            ],
            "contact": {
                "businessName": "DriveZA Motors",
                "address": "4047, 1st St, Suite 116, Livermore, CA 94551",
                "phone": "(925) 503-7734",
                "email": "sales@drivezamotors.com",
                "hours": {
                    "weekdays": "Mon-Fri: 10:00 AM - 5:00 PM",
                    "saturday": "Sat: 10:00 AM - 4:00 PM",
                    "sunday": "Closed"
                },
                "social": {
                    "facebook": "#",
                    "twitter": "#",
                    "instagram": "#",
                    "linkedin": "#"
                }
            },
            "business": {
                "description": "Your trusted partner for premium pre-owned vehicles in the Bay Area.",
                "services": ["Car Sales", "Vehicle Inspections", "Delivery Available", "Documentation Assistance"],
                "location": "Bay Area, California"
            }
        };
    }

    async getCars() {
        const data = await this.loadData();
        return data.cars || [];
    }

    async getCarById(id) {
        const cars = await this.getCars();
        return cars.find(car => car.id === parseInt(id));
    }

    async getContactInfo() {
        const data = await this.loadData();
        return data.contact || {};
    }

    async getBusinessInfo() {
        const data = await this.loadData();
        return data.business || {};
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatMileage(mileage) {
        return new Intl.NumberFormat('en-US').format(mileage) + ' miles';
    }

    createFeatureBadges(features) {
        return features.map(feature => 
            `<div class="feature-badge">${feature}</div>`
        ).join('');
    }

    createSpecItem(icon, label, value) {
        return `
            <div class="spec-item">
                <i class="${icon}"></i>
                <div class="spec-content">
                    <span class="spec-label">${label}</span>
                    <span class="spec-value">${value}</span>
                </div>
            </div>
        `;
    }

    createThumbnailGallery(gallery, carId) {
        return gallery.map((image, index) => 
            `<img src="${image}" alt="View ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(this)">`
        ).join('');
    }

    createSimilarVehicleCard(car) {
        return `
            <a href="car-detail-${car.id}.html" class="similar-card">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}">
                <div class="similar-info">
                    <h4>${car.year} ${car.make} ${car.model}</h4>
                    <p class="similar-price">${this.formatCurrency(car.price)}</p>
                </div>
            </a>
        `;
    }
}

// Create global instance
window.DriveZAData = new DriveZAData();
