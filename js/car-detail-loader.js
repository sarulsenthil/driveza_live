// Car Detail Page Loader
// Loads car data and populates detail pages dynamically

class CarDetailLoader {
    constructor() {
        this.carId = this.getCarIdFromUrl();
    }

    getCarIdFromUrl() {
        const path = window.location.pathname;
        const hash = window.location.hash;
        // Try to get ID from pathname first
        let match = path.match(/car-detail-(\d+)\.html/);
        // If not found in pathname, try hash
        if (!match && hash) {
            match = hash.match(/car-detail-(\d+)\.html/);
        }
        // If still not found, try full URL
        if (!match) {
            const fullUrl = window.location.href;
            match = fullUrl.match(/car-detail-(\d+)\.html/);
        }
        return match ? parseInt(match[1]) : null;
    }

    async loadCarDetail() {
        if (!this.carId) {
            console.error('No car ID found in URL');
            return;
        }

        try {
            // Check if DriveZAData is available
            if (!window.DriveZAData) {
                console.error('DriveZAData not available');
                return;
            }
            
            if (typeof window.DriveZAData.getCarById !== 'function') {
                console.error('DriveZAData.getCarById is not a function');
                console.log('Available methods:', Object.getOwnPropertyNames(window.DriveZAData));
                return;
            }
            
            console.log('Loading car detail for ID:', this.carId);
            const car = await window.DriveZAData.getCarById(this.carId);
            if (!car) {
                console.error('Car not found for ID:', this.carId);
                // Show error message instead of redirecting
                const errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'padding: 2rem; text-align: center; background: #fee; color: #c33; margin: 2rem; border-radius: 8px;';
                errorMsg.innerHTML = '<h2>Car Not Found</h2><p>Unable to load car details. Please <a href="inventory.html">return to inventory</a>.</p>';
                document.querySelector('.container')?.prepend(errorMsg);
                return;
            }

            console.log('Car loaded successfully:', car);
            this.populateCarData(car);
            this.populateSimilarVehicles(car);
        } catch (error) {
            console.error('Error loading car detail:', error);
        }
    }

    populateCarData(car) {
        // Update page title
        document.title = `${car.year} ${car.make} ${car.model} - DriveZA Motors`;

        // Update breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb span');
        if (breadcrumb) {
            breadcrumb.textContent = `${car.year} ${car.make} ${car.model}`;
        }

        // Update car title
        const title = document.querySelector('.car-detail-title');
        if (title) {
            title.innerHTML = `${car.year} ${car.make} ${car.model}${car.sold ? ' <span class="sold-badge">SOLD</span>' : ''}`;
        }

        // Update subtitle
        const subtitle = document.querySelector('.car-detail-subtitle');
        if (subtitle) {
            subtitle.textContent = car.color;
        }

        // Update price
        const priceTag = document.querySelector('.price-tag');
        if (priceTag) {
            priceTag.innerHTML = `${this.formatCurrency(car.price)}<sup>*</sup>`;
        }

        // Update description
        const description = document.querySelector('.description-section p');
        if (description) {
            description.textContent = car.description;
        }

        // Update specifications
        this.populateSpecifications(car);

        // Update features
        this.populateFeatures(car);

        // Update image gallery
        this.populateImageGallery(car);

        // Update contact card for sold vehicles
        if (car.sold) {
            this.updateSoldContactCard();
        }
    }

    populateSpecifications(car) {
        const specsGrid = document.querySelector('.specs-grid');
        if (!specsGrid) return;

        const specs = [
            { icon: 'fas fa-calendar', label: 'Year', value: car.year },
            { icon: 'fas fa-tachometer-alt', label: 'Mileage', value: this.formatMileage(car.mileage) },
            { icon: 'fas fa-cog', label: 'Transmission', value: car.transmission },
            { icon: 'fas fa-gas-pump', label: 'Fuel Type', value: car.fuel },
            { icon: 'fas fa-cogs', label: 'Engine', value: car.engine },
            { icon: 'fas fa-palette', label: 'Color', value: car.color },
            { icon: 'fas fa-door-open', label: 'Doors', value: car.doors },
            { icon: 'fas fa-users', label: 'Seats', value: car.seats }
        ];

        // Add VIN if available
        if (car.vin) {
            specs.push({ icon: 'fas fa-id-card', label: 'VIN', value: car.vin });
        }

        specsGrid.innerHTML = specs.map(spec => 
            this.createSpecItem(spec.icon, spec.label, spec.value)
        ).join('');
    }

    populateFeatures(car) {
        const featuresGrid = document.querySelector('.features-grid');
        if (!featuresGrid) return;

        featuresGrid.innerHTML = this.createFeatureBadges(car.features);
    }

    populateImageGallery(car) {
        // Update main image
        const mainImage = document.getElementById('mainImage');
        if (mainImage && car.gallery && car.gallery.length > 0) {
            mainImage.src = car.gallery[0];
            mainImage.alt = `${car.year} ${car.make} ${car.model}`;
        }

        // Update thumbnail gallery
        const thumbnailGallery = document.querySelector('.thumbnail-gallery');
        if (thumbnailGallery && car.gallery) {
            thumbnailGallery.innerHTML = this.createThumbnailGallery(car.gallery, car.id);
        }
    }

    async populateSimilarVehicles(currentCar) {
        const similarGrid = document.querySelector('.similar-grid');
        if (!similarGrid) return;

        try {
            const allCars = await window.DriveZAData.getCars();
            // Filter out current car and sold vehicles
            const similarCars = allCars
                .filter(car => car.id !== currentCar.id && !car.sold)
                .slice(0, 3);
            
            similarGrid.innerHTML = similarCars.map(car => 
                this.createSimilarVehicleCard(car)
            ).join('');
        } catch (error) {
            console.error('Error loading similar vehicles:', error);
        }
    }

    updateSoldContactCard() {
        const contactCard = document.querySelector('.contact-card');
        if (!contactCard) return;

        contactCard.className = 'contact-card sold-contact-card';
        contactCard.innerHTML = `
            <div class="sold-notice">
                <i class="fas fa-check-circle"></i>
                <h3>This Vehicle is Sold</h3>
            </div>
            <p>This vehicle has been sold. Browse our current inventory for similar vehicles or contact us about incoming stock.</p>
            
            <div class="contact-actions">
                <a href="inventory.html" class="btn btn-primary">
                    <i class="fas fa-car"></i> View Inventory
                </a>
                <a href="contact.html" class="btn btn-outline">
                    <i class="fas fa-envelope"></i> Contact Us
                </a>
            </div>

            <div class="dealer-info">
                <h4>Driveza</h4>
                <p><i class="fas fa-map-marker-alt"></i> 4047, 1st St, Suite 116, Livermore, CA</p>
                <p><i class="fas fa-clock"></i> Mon-Fri: 10:00 AM - 5:00 PM</p>
                <p><i class="fas fa-clock"></i> Sat: 10:00 AM - 4:00 PM</p>
            </div>
        `;
    }

    // Utility methods
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

    createFeatureBadges(features) {
        return features.map(feature => 
            `<div class="feature-badge">${feature}</div>`
        ).join('');
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

// Initialize car detail loader when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Car detail page loaded. URL:', window.location.href);
    console.log('Pathname:', window.location.pathname);
    console.log('Hash:', window.location.hash);
    
    // Wait a bit for DriveZAData to be available
    let attempts = 0;
    const maxAttempts = 20; // Increased attempts
    
    while (!window.DriveZAData && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    
    if (!window.DriveZAData) {
        console.error('DriveZAData not available after waiting');
        // Show error to user
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = 'padding: 2rem; text-align: center; background: #fee; color: #c33; margin: 2rem; border-radius: 8px;';
        errorMsg.innerHTML = '<h2>Error Loading Page</h2><p>Unable to load car data. Please <a href="inventory.html">return to inventory</a>.</p>';
        document.querySelector('.container')?.prepend(errorMsg);
        return;
    }
    
    console.log('DriveZAData is available, initializing car detail loader');
    const loader = new CarDetailLoader();
    
    if (!loader.carId) {
        console.error('Could not extract car ID from URL');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = 'padding: 2rem; text-align: center; background: #fee; color: #c33; margin: 2rem; border-radius: 8px;';
        errorMsg.innerHTML = '<h2>Invalid Car Page</h2><p>Unable to identify car. Please <a href="inventory.html">return to inventory</a>.</p>';
        document.querySelector('.container')?.prepend(errorMsg);
        return;
    }
    
    await loader.loadCarDetail();
});

// Image gallery functionality
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    
    // Remove active class from all thumbnails
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Add active class to clicked thumbnail
    thumbnail.classList.add('active');
    
    // Change main image
    mainImage.src = thumbnail.src;
}
