// Sample car data
const carsData = [
    {
        id: 1,
        make: "Volvo",
        model: "XC90 B5 Core",
        year: 2024,
        price: 41995,
        mileage: 26050,
        fuel: "Gas",
        transmission: "Automatic",
        image: "../images/cars/xc90-b5-front.jpg",
        features: ["7-Seater", "Panoramic Sunroof", "Leather Seats", "AWD", "Pilot Assist", "Premium Sound", "360 Camera", "Wireless Charging"],
        color: "Crystal White Pearl",
        engine: "2.0L Turbo B5",
        doors: 5,
        seats: 7,
        vin: "YV4L12PK6R1187732",
        description: "Pristine 2024 Volvo XC90 B5 Core in stunning Crystal White Pearl. This luxury 7-seater SUV combines Scandinavian design with cutting-edge safety technology. Features the powerful B5 mild-hybrid powertrain for exceptional performance and efficiency.",
        gallery: [
            "../images/cars/xc90-b5-front.jpg",
            "../images/cars/xc90-b5-side.jpg",
            "../images/cars/xc90-b5-interior.jpg",
            "../images/cars/xc90-b5-steering.jpg",
            "../images/cars/xc90-b5-thirdrow.jpg",
            "../images/cars/xc90-b5-sunroof.jpg",
            "../images/cars/xc90-b5-rear.jpg"
        ]
    },
    {
        id: 2,
        make: "Volvo",
        model: "XC90 T8 Core",
        year: 2024,
        price: 51995,
        mileage: 21800,
        fuel: "Hybrid",
        transmission: "Automatic",
        image: "../images/cars/xc90-t8/IMG_7940.jpeg",
        features: ["Plug-in Hybrid", "7-Seater", "Leather Seats", "AWD", "Pilot Assist", "Wireless Charging"],
        color: "Gray Metallic",
        engine: "2.0L Turbo + Electric T8",
        doors: 5,
        seats: 7,
        vin: "YV4H60CK4R1153032",
        description: "Exceptional 2024 Volvo XC90 T8 Core Plug-in Hybrid in sophisticated Gray Metallic. This flagship SUV delivers 455hp combined power with all-electric range capability. The ultimate in luxury, technology, and sustainable performance.",
        gallery: [
            "../images/cars/xc90-t8/IMG_7939.jpeg",
            "../images/cars/xc90-t8/IMG_7940.jpeg",
            "../images/cars/xc90-t8/IMG_7941.jpeg",
            "../images/cars/xc90-t8/IMG_7942.jpeg",
            "../images/cars/xc90-t8/IMG_7943.jpeg",
            "../images/cars/xc90-t8/IMG_7944.jpeg",
            "../images/cars/xc90-t8/IMG_7945.jpeg",
            "../images/cars/xc90-t8/IMG_7946.jpeg",
            "../images/cars/xc90-t8/IMG_7947.jpeg",
            "../images/cars/xc90-t8/IMG_7948.jpeg",
            "../images/cars/xc90-t8/IMG_7949.jpeg",
            "../images/cars/xc90-t8/IMG_7950.jpeg"
        ]
    },
    {
        id: 3,
        make: "Volvo",
        model: "EX90 Ultra",
        year: 2025,
        price: 71995,
        mileage: 800,
        fuel: "Electric",
        transmission: "Automatic",
        image: "../images/cars/ex90/IMG_7920_3.jpeg",
        features: ["100% Electric", "7-Seater", "Twin Motor AWD", "LiDAR Technology", "15-inch Center Display", "Bose Audio", "Bi-directional Charging", "Over-the-Air Updates", "Pilot Assist Pro"],
        color: "Mulberry Red",
        engine: "Dual Electric Motors",
        doors: 5,
        seats: 7,
        range: "310 miles",
        vin: "7JDEV3VL2SG006458",
        description: "Almost Brand new 2025 Volvo EX90 - Volvo's first fully electric flagship SUV. Features cutting-edge LiDAR technology, 111 kWh battery, and up to 480km range. The future of sustainable luxury with uncompromising safety and performance.",
        gallery: [
            "../images/cars/ex90/IMG_7920_3.jpeg",
            "../images/cars/ex90/IMG_7921_3.jpeg",
            "../images/cars/ex90/IMG_7922_3.jpeg",
            "../images/cars/ex90/IMG_7923_3.jpeg",
            "../images/cars/ex90/IMG_7924_3.jpeg",
            "../images/cars/ex90/IMG_7925_3.jpeg",
            "../images/cars/ex90/IMG_7926_3.jpeg",
            "../images/cars/ex90/IMG_7927_3.jpeg",
            "../images/cars/ex90/IMG_7928_3.jpeg",
            "../images/cars/ex90/IMG_7929_3.jpeg",
            "../images/cars/ex90/IMG_7930_3.jpeg",
            "../images/cars/ex90/IMG_7931_2.jpeg",
            "../images/cars/ex90/IMG_7932_2.jpeg",
            "../images/cars/ex90/IMG_7933_2.jpeg",
            "../images/cars/ex90/IMG_7934_2.jpeg",
            "../images/cars/ex90/IMG_7935_2.jpeg",
            "../images/cars/ex90/IMG_7936_3.jpeg",
            "../images/cars/ex90/IMG_7937_2.jpeg"
        ]
    },
    {
        id: 4,
        make: "Mercedes-Benz",
        model: "GLE 350",
        year: 2023,
        price: 41995,
        mileage: 15500,
        fuel: "Gas",
        transmission: "Automatic",
        image: "../images/cars/mercedes-gle350/IMG_7919.jpeg",
        features: ["Luxury SUV", "Premium Package", "Burmester Audio", "MBUX System", "Active Brake Assist", "Blind Spot Assist", "Parking Assist", "Apple CarPlay"],
        color: "Selenite Grey Metallic",
        engine: "2.0L Turbo I4",
        doors: 5,
        seats: 5,
        vin: "4JGFB4JB8PA865553",
        sold: true,
        description: "Exceptional 2023 Mercedes-Benz GLE 350 in sophisticated Selenite Grey Metallic. This luxury SUV combines German engineering with premium comfort and advanced technology. Features the powerful 2.0L turbocharged engine with 255 horsepower.",
        gallery: [
            "../images/cars/mercedes-gle350/IMG_7919.jpeg",
            "../images/cars/mercedes-gle350/IMG_7920.jpeg",
            "../images/cars/mercedes-gle350/IMG_7922.jpeg",
            "../images/cars/mercedes-gle350/IMG_7923.jpeg",
            "../images/cars/mercedes-gle350/IMG_7924.jpeg",
            "../images/cars/mercedes-gle350/IMG_7925.jpeg",
            "../images/cars/mercedes-gle350/IMG_7926.jpeg",
            "../images/cars/mercedes-gle350/IMG_7928.jpeg",
            "../images/cars/mercedes-gle350/IMG_7929.jpeg",
            "../images/cars/mercedes-gle350/IMG_7930.jpeg",
            "../images/cars/mercedes-gle350/IMG_7936.jpeg"
        ]
    },
    {
        id: 5,
        make: "Porsche",
        model: "Cayenne",
        year: 2021,
        price: 49995,
        mileage: 24000,
        fuel: "Gas",
        transmission: "Automatic",
        image: "../images/cars/porsche-cayenne/IMG_7991.jpeg",
        features: ["Luxury SUV", "Premium Package", "Panoramic Sunroof", "Leather Upholstery", "AWD", "Parking Assist", "Blind Spot Monitoring", "PCM System", "Apple CarPlay", "Premium Audio", "Adaptive Cruise Control", "BOSE Sound System"],
        color: "Moonlight Blue Metallic",
        engine: "3.0L V6 Turbo",
        doors: 5,
        seats: 5,
        vin: "WP1AA2AY3MDA04901",
        description: "Exceptional 2021 Porsche Cayenne in pristine condition. This luxury SUV combines German engineering excellence with uncompromising performance and sophistication. Features the powerful V6 engine delivering exceptional power and efficiency.",
        gallery: [
            "../images/cars/porsche-cayenne/IMG_7991.jpeg",
            "../images/cars/porsche-cayenne/IMG_7992.jpeg",
            "../images/cars/porsche-cayenne/IMG_7993.jpeg",
            "../images/cars/porsche-cayenne/IMG_7994.jpeg",
            "../images/cars/porsche-cayenne/IMG_7995.jpeg",
            "../images/cars/porsche-cayenne/IMG_7996.jpeg",
            "../images/cars/porsche-cayenne/IMG_7997.jpeg",
            "../images/cars/porsche-cayenne/IMG_7998.jpeg",
            "../images/cars/porsche-cayenne/IMG_7999.jpeg",
            "../images/cars/porsche-cayenne/IMG_8001.jpeg",
            "../images/cars/porsche-cayenne/IMG_8002.jpeg",
            "../images/cars/porsche-cayenne/IMG_8003.jpeg",
            "../images/cars/porsche-cayenne/IMG_8004.jpeg",
            "../images/cars/porsche-cayenne/IMG_8005.jpeg",
            "../images/cars/porsche-cayenne/IMG_8006.jpeg",
            "../images/cars/porsche-cayenne/IMG_8007.jpeg",
            "../images/cars/porsche-cayenne/IMG_8008.jpeg"
        ]
    }
];

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const carsGrid = document.getElementById('carsGrid');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load featured cars
function loadFeaturedCars() {
    const featuredCars = carsData; // Show all cars as featured
    
    carsGrid.innerHTML = featuredCars.map(car => `
        <div class="car-card ${car.sold ? 'sold-car' : ''}" onclick="viewCarDetails(${car.id})">
            <div class="car-image" style="background: none; padding: 0; position: relative;">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-car\'></i>';">
                ${car.sold ? '<div class="sold-overlay">SOLD</div>' : ''}
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.year} ${car.make} ${car.model} ${car.sold ? '<span class="sold-badge-small">SOLD</span>' : ''}</h3>
                <div class="car-details">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.mileage.toLocaleString()} miles</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                </div>
                <div class="car-details">
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                    ${car.engine ? `<span><i class="fas fa-cogs"></i> ${car.engine}</span>` : ''}
                </div>
                ${car.color ? `<div class="car-details"><span><i class="fas fa-palette"></i> ${car.color}</span></div>` : ''}
                <div class="car-price">\$${car.price.toLocaleString()}</div>
                <div class="car-actions" onclick="event.stopPropagation()">
                    <button class="btn btn-primary btn-small" onclick="viewCarDetails(${car.id})">${car.sold ? 'View Details' : 'View Details'}</button>
                </div>
            </div>
        </div>
    `).join('');
}

// View car details
function viewCarDetails(carId) {
    // Redirect to detail page
    window.location.href = `car-detail-${carId}.html`;
}

// Contact about specific car
function contactAboutCar(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        const message = `I'm interested in the ${car.year} ${car.make} ${car.model} (R${car.price.toLocaleString()}). Please contact me with more information.`;
        document.getElementById('message').value = message;
        document.getElementById('interest').value = 'buying';
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact form handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Insert before form
    contactForm.parentNode.insertBefore(message, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Navbar scroll effect - Tesla Style
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .car-card, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedCars();
});

// Search functionality (for future inventory page)
function searchCars(query) {
    const filteredCars = carsData.filter(car => 
        car.make.toLowerCase().includes(query.toLowerCase()) ||
        car.model.toLowerCase().includes(query.toLowerCase()) ||
        car.year.toString().includes(query)
    );
    return filteredCars;
}

// Filter functionality (for future inventory page)
function filterCars(filters) {
    return carsData.filter(car => {
        if (filters.make && car.make !== filters.make) return false;
        if (filters.fuel && car.fuel !== filters.fuel) return false;
        if (filters.transmission && car.transmission !== filters.transmission) return false;
        if (filters.minPrice && car.price < filters.minPrice) return false;
        if (filters.maxPrice && car.price > filters.maxPrice) return false;
        return true;
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Utility function to format mileage
function formatMileage(mileage) {
    return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
}

// Export functions for use in other pages
window.DriveZA = {
    carsData,
    searchCars,
    filterCars,
    formatCurrency,
    formatMileage,
    viewCarDetails,
    contactAboutCar
};
