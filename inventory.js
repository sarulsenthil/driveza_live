// Inventory Page JavaScript

// DOM Elements
const searchInput = document.getElementById('searchInput');
const makeFilter = document.getElementById('makeFilter');
const fuelFilter = document.getElementById('fuelFilter');
const transmissionFilter = document.getElementById('transmissionFilter');
const priceRange = document.getElementById('priceRange');
const clearFiltersBtn = document.getElementById('clearFilters');
const sortByBtn = document.getElementById('sortBy');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');
const carsContainer = document.getElementById('carsContainer');
const resultsCount = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');
const carModal = document.getElementById('carModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close');

// State
let currentCars = [...carsData];
let currentView = 'grid';
let sortOrder = 'asc';

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadCars();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Search and filters
    searchInput.addEventListener('input', debounce(filterCars, 300));
    makeFilter.addEventListener('change', filterCars);
    fuelFilter.addEventListener('change', filterCars);
    transmissionFilter.addEventListener('change', filterCars);
    priceRange.addEventListener('change', filterCars);
    
    // Actions
    clearFiltersBtn.addEventListener('click', clearFilters);
    sortByBtn.addEventListener('click', toggleSort);
    
    // View toggle
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));
    
    // Modal
    closeModal.addEventListener('click', closeCarModal);
    window.addEventListener('click', (e) => {
        if (e.target === carModal) {
            closeCarModal();
        }
    });
    
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Load and display cars
function loadCars() {
    displayCars(currentCars);
    updateResultsCount(currentCars.length);
}

// Filter cars based on search and filters
function filterCars() {
    const searchTerm = searchInput.value.toLowerCase();
    const make = makeFilter.value;
    const fuel = fuelFilter.value;
    const transmission = transmissionFilter.value;
    const priceRangeValue = priceRange.value;
    
    let filtered = carsData.filter(car => {
        // Search filter
        if (searchTerm && !car.make.toLowerCase().includes(searchTerm) && 
            !car.model.toLowerCase().includes(searchTerm) && 
            !car.year.toString().includes(searchTerm)) {
            return false;
        }
        
        // Make filter
        if (make && car.make !== make) {
            return false;
        }
        
        // Fuel filter
        if (fuel && car.fuel !== fuel) {
            return false;
        }
        
        // Transmission filter
        if (transmission && car.transmission !== transmission) {
            return false;
        }
        
        // Price range filter
        if (priceRangeValue) {
            const [min, max] = priceRangeValue.split('-').map(Number);
            if (car.price < min || car.price > max) {
                return false;
            }
        }
        
        return true;
    });
    
    currentCars = filtered;
    displayCars(currentCars);
    updateResultsCount(currentCars.length);
}

// Display cars in the container
function displayCars(cars) {
    if (cars.length === 0) {
        carsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    carsContainer.style.display = 'grid';
    noResults.style.display = 'none';
    
    carsContainer.innerHTML = cars.map(car => createCarCard(car)).join('');
    
    // Add click handlers to car cards
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.car-actions')) {
                const carId = parseInt(card.dataset.carId);
                showCarModal(carId);
            }
        });
    });
}

// Create car card HTML
function createCarCard(car) {
    const isNew = car.year >= new Date().getFullYear() - 1;
    const badge = isNew && !car.sold ? '<div class="car-badge">New</div>' : '';
    const soldOverlay = car.sold ? '<div class="sold-overlay">SOLD</div>' : '';
    const soldBadge = car.sold ? '<span class="sold-badge-small">SOLD</span>' : '';
    const cardClass = car.sold ? 'sold-car' : '';
    
    return `
        <div class="car-card ${cardClass}" data-car-id="${car.id}" onclick="window.location.href='car-detail-${car.id}.html'" style="cursor: pointer;">
            <div class="car-image" style="background: none; padding: 0; position: relative;">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" 
                     style="width: 100%; height: 100%; object-fit: cover;" 
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas fa-car\' style=\'font-size: 4rem; color: #a0a0a0;\'></i>';">
                ${badge}
                ${soldOverlay}
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.year} ${car.make} ${car.model} ${soldBadge}</h3>
                <p class="car-subtitle">${car.transmission} • ${car.fuel}</p>
                <div class="car-details">
                    <div class="car-detail-item">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>${formatMileage(car.mileage)}</span>
                    </div>
                    <div class="car-detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${car.year}</span>
                    </div>
                    <div class="car-detail-item">
                        <i class="fas fa-cog"></i>
                        <span>${car.transmission}</span>
                    </div>
                    <div class="car-detail-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${car.fuel}</span>
                    </div>
                </div>
                <div class="car-price">${formatCurrency(car.price)}</div>
                <div class="car-actions" onclick="event.stopPropagation()">
                    <a href="car-detail-${car.id}.html" class="btn btn-primary btn-small">View Details</a>
                    <button class="btn btn-outline btn-small" onclick="contactAboutCar(${car.id})">Contact</button>
                </div>
            </div>
        </div>
    `;
}

// Show car modal
function showCarModal(carId) {
    const car = carsData.find(c => c.id === carId);
    if (!car) return;
    
    const isNew = car.year >= new Date().getFullYear() - 1;
    const badge = isNew ? '<div class="car-badge">New</div>' : '';
    
    modalContent.innerHTML = `
        <div class="modal-car-image">
            <i class="fas fa-car"></i>
            ${badge}
        </div>
        <div class="modal-car-info">
            <h2 class="modal-car-title">${car.year} ${car.make} ${car.model}</h2>
            <div class="modal-car-price">${formatCurrency(car.price)}</div>
            
            <div class="modal-car-details">
                <div class="modal-detail-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Mileage: ${formatMileage(car.mileage)}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>Year: ${car.year}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-cog"></i>
                    <span>Transmission: ${car.transmission}</span>
                </div>
                <div class="modal-detail-item">
                    <i class="fas fa-gas-pump"></i>
                    <span>Fuel Type: ${car.fuel}</span>
                </div>
                ${car.engine ? `
                <div class="modal-detail-item">
                    <i class="fas fa-cogs"></i>
                    <span>Engine: ${car.engine}</span>
                </div>
                ` : ''}
                <div class="modal-detail-item">
                    <i class="fas fa-palette"></i>
                    <span>Color: ${car.color || 'Available in multiple colors'}</span>
                </div>
                ${car.doors ? `
                <div class="modal-detail-item">
                    <i class="fas fa-car"></i>
                    <span>Doors: ${car.doors}</span>
                </div>
                ` : ''}
                ${car.seats ? `
                <div class="modal-detail-item">
                    <i class="fas fa-users"></i>
                    <span>Seats: ${car.seats}</span>
                </div>
                ` : ''}
                <div class="modal-detail-item">
                    <i class="fas fa-shield-alt"></i>
                    <span>Warranty: 12 months included</span>
                </div>
            </div>
            
            ${car.features && car.features.length > 0 ? `
            <div class="car-features">
                <h4>Key Features:</h4>
                <div class="features-list">
                    ${car.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="contactAboutCar(${car.id}); closeCarModal();">Contact Us</button>
                <button class="btn btn-outline" onclick="scheduleTestDrive(${car.id})">Schedule Test Drive</button>
            </div>
        </div>
    `;
    
    carModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close car modal
function closeCarModal() {
    carModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Contact about specific car
function contactAboutCar(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        const message = `I'm interested in the ${car.year} ${car.make} ${car.model} (${formatCurrency(car.price)}). Please contact me with more information.`;
        
        // Store message in localStorage to pre-fill contact form
        localStorage.setItem('prefillMessage', message);
        localStorage.setItem('prefillInterest', 'buying');
        
        // Redirect to contact page
        window.location.href = 'contact.html';
    }
}

// Schedule test drive
function scheduleTestDrive(carId) {
    const car = carsData.find(c => c.id === carId);
    if (car) {
        const message = `I would like to schedule a test drive for the ${car.year} ${car.make} ${car.model} (${formatCurrency(car.price)}). Please contact me to arrange a convenient time.`;
        
        localStorage.setItem('prefillMessage', message);
        localStorage.setItem('prefillInterest', 'test-drive');
        
        window.location.href = 'contact.html';
    }
}

// Clear all filters
function clearFilters() {
    searchInput.value = '';
    makeFilter.value = '';
    fuelFilter.value = '';
    transmissionFilter.value = '';
    priceRange.value = '';
    
    currentCars = [...carsData];
    displayCars(currentCars);
    updateResultsCount(currentCars.length);
}

// Toggle sort order
function toggleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    sortByBtn.textContent = `Sort by Price ${sortOrder === 'asc' ? '↑' : '↓'}`;
    
    currentCars.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });
    
    displayCars(currentCars);
}

// Switch between grid and list view
function switchView(view) {
    currentView = view;
    
    if (view === 'grid') {
        carsContainer.className = 'cars-container grid-view';
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    } else {
        carsContainer.className = 'cars-container list-view';
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    }
}

// Update results count
function updateResultsCount(count) {
    resultsCount.textContent = count;
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && carModal.style.display === 'block') {
        closeCarModal();
    }
});

// Smooth scrolling for anchor links
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

// Navbar scroll effect - Tesla Style
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Export functions for global access
window.showCarModal = showCarModal;
window.contactAboutCar = contactAboutCar;
window.scheduleTestDrive = scheduleTestDrive;
