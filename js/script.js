// DriveZA Motors - Main Script
// Uses centralized JSON data from data/cars.json

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const carsGrid = document.getElementById('carsGrid');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Load navigation functionality
    initNavigation();
    
    // Load featured cars if on homepage
    if (carsGrid) {
        console.log('Found carsGrid element, loading featured cars...');
        await loadFeaturedCars();
    } else {
        console.log('carsGrid element not found');
    }
});

// Navigation functionality
function initNavigation() {
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
        const cars = await DriveZAData.getCars();
        console.log('Loaded cars:', cars);
        
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
                        <span><i class="fas fa-tachometer-alt"></i> ${DriveZAData.formatMileage(car.mileage)}</span>
                        <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                    </div>
                    <div class="car-details">
                        <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                        ${car.engine ? `<span><i class="fas fa-cogs"></i> ${car.engine}</span>` : ''}
                    </div>
                    ${car.color ? `<div class="car-details"><span><i class="fas fa-palette"></i> ${car.color}</span></div>` : ''}
                    <div class="car-price">${DriveZAData.formatCurrency(car.price)}</div>
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