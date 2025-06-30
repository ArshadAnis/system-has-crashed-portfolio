// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initTabs();
    loadVisitorIP();
    initParallax();
    createParticles();
    
    // Initialize database-related features
    initDatabaseFeatures();
    loadServiceMetrics();
});

// Initialize database features
function initDatabaseFeatures() {
    // Attach contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Attach support buttons
    const supportBtn = document.querySelector('.support-actions .btn-primary');
    if (supportBtn) {
        supportBtn.addEventListener('click', handleSupportClick);
    }
    
    // Attach amount buttons
    const amountBtns = document.querySelectorAll('.amount-btn');
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const amount = this.textContent.replace('₹', '').replace(',', '');
            handleDonation(amount);
        });
    });
}

// Check for any saved preferences
function checkPartnerLoginStatus() {
    // This function is no longer needed for partner login
    // but can be repurposed for other user preferences if needed
}

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger animation for grid items
                if (entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in-up, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for hero stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                animateCounter(target, finalValue);
                statsObserver.unobserve(target);
            }
        });
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation function
function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const isPlus = finalValue.includes('+');
    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
    
    let currentValue = 0;
    const increment = numericValue / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (isPercentage) displayValue += '%';
        if (isPlus) displayValue += '+';
        if (finalValue.includes('/')) displayValue = displayValue + '/7';
        
        element.textContent = displayValue;
    }, 16); // ~60fps
}

// Tab functionality for solutions section
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Modal functionality - removed as login modal is no longer used

// Support functionality
function handleSupportClick() {
    showNotification('Support functionality coming soon!', 'info');
    // This would integrate with payment gateway
}

async function handleDonation(amount) {
    showNotification(`Processing donation of ₹${amount}...`, 'info');
    
    try {
        const response = await fetch('/api/supporters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: parseFloat(amount),
                anonymous: false
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
            loadServiceMetrics(); // Refresh stats
        } else {
            showNotification(result.error || 'Failed to process support', 'error');
        }
        
    } catch (error) {
        console.error('Support error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

// Newsletter subscription
async function subscribeNewsletter(email) {
    try {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
        } else {
            showNotification(result.error || 'Subscription failed', 'error');
        }
        
    } catch (error) {
        console.error('Newsletter error:', error);
        showNotification('Network error. Please try again.', 'error');
    }
}

// Contact form functionality
async function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        company: formData.get('company') || '',
        message: formData.get('message')
    };
    
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        } else {
            showNotification(result.error || 'Failed to send message', 'error');
        }
        
    } catch (error) {
        console.error('Contact form error:', error);
        showNotification('Network error. Please try again.', 'error');
    } finally {
        // Restore button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Load service metrics
async function loadServiceMetrics() {
    try {
        const response = await fetch('/api/metrics');
        const result = await response.json();
        
        if (result.success) {
            updateStatsDisplay(result.summary);
        }
    } catch (error) {
        console.error('Failed to load metrics:', error);
    }
}

// Update stats display
function updateStatsDisplay(stats) {
    // Update total support amount
    const supportAmountElem = document.querySelector('.support-stat:nth-child(2) .stat-number');
    if (supportAmountElem && stats.total_support !== undefined) {
        supportAmountElem.textContent = `₹${stats.total_support.toLocaleString('en-IN')}`;
    }
    
    // Update supporter count
    const supporterCountElem = document.querySelector('.support-stat:nth-child(4) .stat-number');
    if (supporterCountElem && stats.supporter_count !== undefined) {
        supporterCountElem.textContent = stats.supporter_count;
    }
    
    // Update remaining amount
    const remainingElem = document.querySelector('.support-stat:nth-child(3) .stat-number');
    if (remainingElem && stats.total_support !== undefined) {
        const target = 1000000; // ₹10,00,000
        const remaining = target - stats.total_support;
        remainingElem.textContent = `₹${remaining.toLocaleString('en-IN')}`;
    }
}

// Load visitor IP
async function loadVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipElement = document.getElementById('visitorIP');
        if (ipElement) {
            ipElement.textContent = data.ip;
        }
    } catch (error) {
        console.log('Could not load visitor IP');
        const ipElement = document.getElementById('visitorIP');
        if (ipElement) {
            ipElement.textContent = 'Unable to detect';
        }
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Parallax effect
function initParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Create floating particles
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation delay
    particle.style.animationDelay = Math.random() * 20 + 's';
    
    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, 20000);
}

// Button ripple effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Magnetic button effect for modern interaction
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handling
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'assets/logo.svg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be registered here for production
        console.log('Service worker support detected');
    });
}