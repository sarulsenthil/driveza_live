// DriveZA Motors - Main Script
// Uses centralized JSON data from data/cars.json

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing...');
    
    // Load navigation functionality
    initNavigation();
    
    // Load featured cars if on homepage
    const carsGrid = document.getElementById('carsGrid');
    if (carsGrid) {
        console.log('Found carsGrid element, loading featured cars...');
        await loadFeaturedCars();
    } else {
        console.log('carsGrid element not found');
    }
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
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
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Load featured cars from JSON data
async function loadFeaturedCars() {
    try {
        console.log('Loading featured cars...');
        
        const carsGrid = document.getElementById('carsGrid');
        if (!carsGrid) {
            console.error('carsGrid element not found in loadFeaturedCars');
            return;
        }
        
        let cars = [];
        
        // Try to load from DriveZAData
        try {
            if (window.DriveZAData && typeof window.DriveZAData.getCars === 'function') {
                cars = await window.DriveZAData.getCars();
                console.log('Loaded cars from DriveZAData:', cars);
            } else {
                throw new Error('DriveZAData not available');
            }
        } catch (error) {
            console.error('Failed to load from DriveZAData:', error);
            // Use hardcoded fallback
            cars = getHardcodedCars();
            console.log('Using hardcoded cars:', cars);
        }
        
        if (!cars || cars.length === 0) {
            carsGrid.innerHTML = '<p>No vehicles available at this time.</p>';
            return;
        }
        
        carsGrid.innerHTML = cars.map(car => `
            <div class="car-card ${car.sold ? 'sold-car' : ''}" onclick="viewCarDetails(${car.id})">
                <div class="car-image" style="background: none; padding: 0; position: relative;">
                    <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-car\'></i>';">
                    ${car.sold ? '<div class="sold-overlay">SOLD</div>' : ''}
                </div>
                <div class="car-info">
                    <h3 class="car-title">${car.year} ${car.make} ${car.model} ${car.sold ? '<span class="sold-badge-small">SOLD</span>' : ''}</h3>
                    <div class="car-details">
                        <span><i class="fas fa-tachometer-alt"></i> ${formatMileage(car.mileage)}</span>
                        <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    </div>
                    <div class="car-details">
                        <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                        ${car.engine ? `<span><i class="fas fa-cogs"></i> ${car.engine}</span>` : ''}
                    </div>
                    ${car.color ? `<div class="car-details"><span><i class="fas fa-palette"></i> ${car.color}</span></div>` : ''}
                    <div class="car-price">${formatCurrency(car.price)}</div>
                    <div class="car-actions" onclick="event.stopPropagation()">
                        <button class="btn btn-primary btn-small" onclick="viewCarDetails(${car.id})">View Details</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured cars:', error);
        carsGrid.innerHTML = '<p>Error loading vehicles. Please try again later.</p>';
    }
}

// Utility functions
function formatMileage(mileage) {
    return new Intl.NumberFormat('en-US').format(mileage) + ' miles';
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Hardcoded fallback cars data
function getHardcodedCars() {
    return [
        {
            id: 1,
            make: "Volvo",
            model: "XC90 B5 Core",
            year: 2024,
            price: 41995,
            mileage: 18500,
            fuel: "Gas",
            transmission: "Automatic",
            image: "../images/cars/xc90-b5-front.jpg",
            sold: false
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
            sold: false
        },
        {
            id: 3,
            make: "Volvo",
            model: "EX90 Ultra",
            year: 2025,
            price: 71995,
            mileage: 0,
            fuel: "Electric",
            transmission: "Automatic",
            image: "../images/cars/ex90/IMG_7920_3.jpeg",
            sold: false
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
            sold: true
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
            sold: false
        }
    ];
}

// View car details
function viewCarDetails(carId) {
    // Redirect to detail page
    window.location.href = `car-detail-${carId}.html`;
}

// Contact about specific car
async function contactAboutCar(carId) {
    try {
        const car = await DriveZAData.getCarById(carId);
        if (car) {
            const message = `I'm interested in the ${car.year} ${car.make} ${car.model} (${DriveZAData.formatCurrency(car.price)}). Please contact me with more information.`;
            document.getElementById('message').value = message;
            document.getElementById('interest').value = 'buying';
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error getting car details:', error);
    }
}

// Schedule test drive
async function scheduleTestDrive(carId) {
    try {
        const car = await DriveZAData.getCarById(carId);
        if (car) {
            const message = `I would like to schedule a test drive for the ${car.year} ${car.make} ${car.model} (${DriveZAData.formatCurrency(car.price)}). Please contact me to arrange a convenient time.`;
            document.getElementById('message').value = message;
            document.getElementById('interest').value = 'test drive';
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error getting car details:', error);
    }
}