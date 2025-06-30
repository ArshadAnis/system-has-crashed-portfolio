// Advanced animations and effects
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupParallaxElements();
        this.initTextAnimations();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all elements with animation classes
        document.querySelectorAll('.fade-in-up, .animate-on-scroll').forEach(el => {
            this.observer.observe(el);
        });
    }

    animateElement(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fadeUp':
                this.fadeUpAnimation(element);
                break;
            case 'slideLeft':
                this.slideLeftAnimation(element);
                break;
            case 'slideRight':
                this.slideRightAnimation(element);
                break;
            case 'scale':
                this.scaleAnimation(element);
                break;
            default:
                this.defaultAnimation(element);
        }
    }

    getAnimationType(element) {
        if (element.classList.contains('slide-left')) return 'slideLeft';
        if (element.classList.contains('slide-right')) return 'slideRight';
        if (element.classList.contains('scale-in')) return 'scale';
        return 'fadeUp';
    }

    fadeUpAnimation(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    slideLeftAnimation(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    slideRightAnimation(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
    }

    scaleAnimation(element) {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }

    defaultAnimation(element) {
        element.classList.add('animate');
    }

    setupScrollAnimations() {
        let ticking = false;

        const updateScrollAnimations = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Parallax backgrounds
            document.querySelectorAll('.parallax-bg').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });

            // Floating cards in hero
            document.querySelectorAll('.floating-card').forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = Math.sin(scrollTop * 0.01 + index) * 10;
                card.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    setupHoverEffects() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e.target, e);
            });
        });

        // Card hover effects
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
    }

    createRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple-animation';

        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
        element.style.transform = 'translateY(-10px) scale(1.02)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    setupParallaxElements() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, { passive: true });
    }

    initTextAnimations() {
        // Typing animation for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.typeWriter(heroTitle);
        }

        // Number counting animations
        this.initCounterAnimations();
    }

    typeWriter(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50);
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// Smooth page transitions
class PageTransitions {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageLoad();
        this.setupLinkTransitions();
    }

    setupPageLoad() {
        // Page load animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.animatePageIn();
        });
    }

    animatePageIn() {
        const elements = document.querySelectorAll('.fade-in, .hero-content, .hero-visual');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupLinkTransitions() {
        // Smooth transitions between sections
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const targetPosition = target.offsetTop - 70;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const ease = this.easeInOutCubic(progress / duration);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Particle system for background effects
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.container.offsetWidth,
                y: Math.random() * this.container.offsetHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = this.container.offsetWidth;
            if (particle.x > this.container.offsetWidth) particle.x = 0;
            if (particle.y < 0) particle.y = this.container.offsetHeight;
            if (particle.y > this.container.offsetHeight) particle.y = 0;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Performance monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        this.monitorFrameRate();
        this.optimizeAnimations();
    }

    monitorFrameRate() {
        let fps = 0;
        let lastTime = performance.now();

        const measureFPS = (currentTime) => {
            fps++;
            if (currentTime >= lastTime + 1000) {
                if (fps < 30) {
                    this.enablePerformanceMode();
                }
                fps = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    enablePerformanceMode() {
        // Reduce animation complexity for better performance
        document.body.classList.add('performance-mode');
        console.log('Performance mode enabled');
    }

    optimizeAnimations() {
        // Use transform instead of changing layout properties
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new PageTransitions();
    new PerformanceMonitor();

    // Initialize particle system for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        new ParticleSystem(hero);
    }
});

// Export for use in other modules
window.AnimationController = AnimationController;
window.PageTransitions = PageTransitions;
window.ParticleSystem = ParticleSystem;
