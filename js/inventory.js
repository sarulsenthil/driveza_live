// DriveZA Motors - Inventory Page Script
// Uses centralized JSON data from data/cars.json

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

// Global variables
let currentCars = [];
let filteredCars = [];

// DOM Elements
const carsContainer = document.getElementById('carsContainer');
const searchInput = document.getElementById('searchInput');
const makeFilter = document.getElementById('makeFilter');
const priceFilter = document.getElementById('priceFilter');
const fuelFilter = document.getElementById('fuelFilter');
const yearFilter = document.getElementById('yearFilter');
const sortSelect = document.getElementById('sortSelect');
const resultsCount = document.getElementById('resultsCount');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Wait a bit for DriveZAData to be available
    let attempts = 0;
    const maxAttempts = 10;
    
    while (!window.DriveZAData && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!window.DriveZAData) {
        console.error('DriveZAData not available after waiting');
        carsContainer.innerHTML = '<p>Error loading inventory. Please try again later.</p>';
        return;
    }
    
    console.log('DriveZAData is available, loading inventory');
    await loadInventory();
    setupEventListeners();
});

// Load inventory from JSON data
async function loadInventory() {
    try {
        console.log('Loading inventory...');
        currentCars = await window.DriveZAData.getCars();
        console.log('Loaded cars:', currentCars);
        filteredCars = [...currentCars];
        displayCars(filteredCars);
        updateResultsCount();
    } catch (error) {
        console.error('Error loading inventory:', error);
        carsContainer.innerHTML = '<p>Error loading inventory. Please try again later.</p>';
    }
}

// Setup event listeners
function setupEventListeners() {
    if (searchInput) {
        searchInput.addEventListener('input', filterCars);
    }
    
    if (makeFilter) {
        makeFilter.addEventListener('change', filterCars);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', filterCars);
    }
    
    if (fuelFilter) {
        fuelFilter.addEventListener('change', filterCars);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', filterCars);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortCars);
    }
}

// Filter cars based on search criteria
function filterCars() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedMake = makeFilter ? makeFilter.value : '';
    const selectedPrice = priceFilter ? priceFilter.value : '';
    const selectedFuel = fuelFilter ? fuelFilter.value : '';
    const selectedYear = yearFilter ? yearFilter.value : '';

    filteredCars = currentCars.filter(car => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            car.make.toLowerCase().includes(searchTerm) ||
            car.model.toLowerCase().includes(searchTerm) ||
            car.year.toString().includes(searchTerm) ||
            car.color.toLowerCase().includes(searchTerm);

        // Make filter
        const matchesMake = !selectedMake || car.make === selectedMake;

        // Price filter
        const matchesPrice = !selectedPrice || checkPriceRange(car.price, selectedPrice);

        // Fuel filter
        const matchesFuel = !selectedFuel || car.fuel.toLowerCase() === selectedFuel.toLowerCase();

        // Year filter
        const matchesYear = !selectedYear || car.year.toString() === selectedYear;

        return matchesSearch && matchesMake && matchesPrice && matchesFuel && matchesYear;
    });

    displayCars(filteredCars);
    updateResultsCount();
}

// Check if car price falls within selected range
function checkPriceRange(price, range) {
    switch (range) {
        case 'under-30k':
            return price < 30000;
        case '30k-50k':
            return price >= 30000 && price < 50000;
        case '50k-70k':
            return price >= 50000 && price < 70000;
        case 'over-70k':
            return price >= 70000;
        default:
            return true;
    }
}

// Sort cars
function sortCars() {
    const sortBy = sortSelect ? sortSelect.value : 'year-desc';
    
    filteredCars.sort((a, b) => {
        switch (sortBy) {
            case 'year-desc':
                return b.year - a.year;
            case 'year-asc':
                return a.year - b.year;
            case 'price-desc':
                return b.price - a.price;
            case 'price-asc':
                return a.price - b.price;
            case 'mileage-asc':
                return a.mileage - b.mileage;
            case 'mileage-desc':
                return b.mileage - a.mileage;
            case 'make-asc':
                return a.make.localeCompare(b.make);
            case 'make-desc':
                return b.make.localeCompare(a.make);
            default:
                return 0;
        }
    });

    displayCars(filteredCars);
}

// Display cars in the grid
function displayCars(cars) {
    if (!carsContainer) return;

    if (cars.length === 0) {
        carsContainer.innerHTML = '<div class="no-results"><p>No vehicles found matching your criteria.</p></div>';
        return;
    }

    carsContainer.innerHTML = cars.map(car => createCarCard(car)).join('');
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

// Update results count
function updateResultsCount() {
    if (resultsCount) {
        const count = filteredCars.length;
        resultsCount.textContent = `${count} vehicle${count !== 1 ? 's' : ''} found`;
    }
}

// Clear all filters
function clearFilters() {
    if (searchInput) searchInput.value = '';
    if (makeFilter) makeFilter.value = '';
    if (priceFilter) priceFilter.value = '';
    if (fuelFilter) fuelFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    if (sortSelect) sortSelect.value = 'year-desc';
    
    filteredCars = [...currentCars];
    displayCars(filteredCars);
    updateResultsCount();
}

// Contact about specific car
async function contactAboutCar(carId) {
    try {
        const car = await window.DriveZAData.getCarById(carId);
        if (car) {
            const message = `I'm interested in the ${car.year} ${car.make} ${car.model} (${formatCurrency(car.price)}). Please contact me with more information.`;
            document.getElementById('message').value = message;
            document.getElementById('interest').value = 'buying';
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error getting car details:', error);
    }
}