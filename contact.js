// Contact Page JavaScript

// DOM Elements
const contactForm = document.getElementById('contactForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const faqItems = document.querySelectorAll('.faq-item');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    setupFAQ();
    prefillForm();
    setupFormValidation();
});

// Event Listeners
function setupEventListeners() {
    // Mobile navigation
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
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
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
}

// Setup FAQ functionality
function setupFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Prefill form with data from localStorage (from inventory page)
function prefillForm() {
    const prefillMessage = localStorage.getItem('prefillMessage');
    const prefillInterest = localStorage.getItem('prefillInterest');
    
    if (prefillMessage) {
        document.getElementById('message').value = prefillMessage;
        localStorage.removeItem('prefillMessage');
    }
    
    if (prefillInterest) {
        document.getElementById('interest').value = prefillInterest;
        localStorage.removeItem('prefillInterest');
    }
}

// Setup form validation
function setupFormValidation() {
    // Email validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && !emailRegex.test(email)) {
            showFieldError(this, 'Please enter a valid email address');
        } else {
            clearFieldError(this);
        }
    });
    
    // Phone validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        const phone = this.value;
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        
        if (phone && !phoneRegex.test(phone)) {
            showFieldError(this, 'Please enter a valid phone number');
        } else {
            clearFieldError(this);
        }
    });
    
    // Required field validation
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else {
                clearFieldError(this);
            }
        });
    });
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    
    // Add success state for valid fields
    if (field.value.trim()) {
        formGroup.classList.add('success');
    }
}

// Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    
    // Validate all fields
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Check if form is valid
    if (!validateForm()) {
        showMessage('Please correct the errors below and try again.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        btnText.style.display = 'block';
        btnLoading.style.display = 'none';
        
        // Clear all field states
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
        // Scroll to top of form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
    }, 2000);
}

// Validate entire form
function validateForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const message = document.createElement('div');
    message.className = `message ${type} show`;
    message.textContent = text;
    
    // Insert before form
    contactForm.parentNode.insertBefore(message, contactForm);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add click effect to contact methods
document.addEventListener('DOMContentLoaded', () => {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(37, 99, 235, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            method.style.position = 'relative';
            method.style.overflow = 'hidden';
            method.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Add form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Add auto-resize for textarea
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('message');
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
});

// Add form submission analytics (placeholder for future implementation)
function trackFormSubmission(data) {
    // This would integrate with analytics services like Google Analytics
    console.log('Form submitted:', data);
    
    // Example: Track form submission event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'contact',
            'event_label': data.interest
        });
    }
}

// Add phone number formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.startsWith('1')) {
                // US number
                value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4');
            } else if (value.startsWith('0')) {
                // Local number
                value = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
            }
        }
        
        this.value = value;
    });
});

// Add email domain suggestions
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const commonDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    
    emailInput.addEventListener('input', function() {
        const value = this.value;
        const atIndex = value.indexOf('@');
        
        if (atIndex > 0) {
            const domain = value.substring(atIndex + 1);
            const suggestion = commonDomains.find(d => d.startsWith(domain));
            
            if (suggestion && suggestion !== domain) {
                // Could add autocomplete suggestions here
                console.log('Suggested domain:', suggestion);
            }
        }
    });
});

// Add form persistence (save form data to localStorage)
function saveFormData() {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    localStorage.setItem('contactFormData', JSON.stringify(data));
}

function loadFormData() {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = contactForm.querySelector(`[name="${key}"]`);
            if (field && field.type !== 'checkbox') {
                field.value = data[key];
            }
        });
    }
}

// Save form data on input
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', saveFormData);
    });
    
    // Load saved data
    loadFormData();
    
    // Clear saved data on successful submission
    contactForm.addEventListener('submit', function() {
        setTimeout(() => {
            localStorage.removeItem('contactFormData');
        }, 3000);
    });
});
