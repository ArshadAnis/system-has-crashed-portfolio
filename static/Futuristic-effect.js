// Futuristic Interactive Effects

class CyberCursor {
    constructor() {
        this.cursor = null;
        this.trail = [];
        this.init();
    }

    init() {
        this.createCursor();
        this.setupEventListeners();
        this.animateCursor();
    }

    createCursor() {
        // Create main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'cyber-cursor';
        document.body.appendChild(this.cursor);

        // Create cursor trail
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cyber-cursor-trail';
            trail.style.opacity = 1 - (i * 0.2);
            trail.style.transform = `scale(${1 - (i * 0.15)})`;
            document.body.appendChild(trail);
            this.trail.push(trail);
        }
    }

    setupEventListeners() {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.2;
            cursorY += dy * 0.2;

            this.cursor.style.left = cursorX + 'px';
            this.cursor.style.top = cursorY + 'px';

            // Update trail positions
            this.trail.forEach((trail, index) => {
                const delay = (index + 1) * 2;
                setTimeout(() => {
                    trail.style.left = cursorX + 'px';
                    trail.style.top = cursorY + 'px';
                }, delay);
            });

            requestAnimationFrame(animateCursor);
        };

        animateCursor();
    }

    animateCursor() {
        // Add hover effects
        document.querySelectorAll('a, button, .feature-card, .floating-card').forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                this.trail.forEach(trail => trail.classList.add('hover'));
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                this.trail.forEach(trail => trail.classList.remove('hover'));
            });
        });
    }
}

class GlitchText {
    constructor() {
        this.init();
    }

    init() {
        const glitchElements = document.querySelectorAll('.hero-title, .section-title');
        
        glitchElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.applyGlitch(element);
            });
        });
    }

    applyGlitch(element) {
        const text = element.textContent;
        const glitchChars = '!@#$%^&*()_+-={}[]|;:,.<>?';
        let iterations = 0;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iterations >= text.length) {
                clearInterval(interval);
            }
            
            iterations += 1;
        }, 30);
    }
}

class InteractiveBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupEventListeners();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'interactive-bg';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            // Move particles
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 150)})`;
                    this.ctx.stroke();
                }
            });
            
            // React to mouse
            const mouseDx = particle.x - this.mouse.x;
            const mouseDy = particle.y - this.mouse.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            if (mouseDistance < 100) {
                const force = (100 - mouseDistance) / 100;
                particle.vx += (mouseDx / mouseDistance) * force * 0.1;
                particle.vy += (mouseDy / mouseDistance) * force * 0.1;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.columns = [];
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupMatrix();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'matrix-rain';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.05';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.setupMatrix();
    }

    setupMatrix() {
        const fontSize = 14;
        const columns = Math.floor(this.canvas.width / fontSize);
        
        this.columns = [];
        for (let i = 0; i < columns; i++) {
            this.columns[i] = Math.floor(Math.random() * this.canvas.height / fontSize);
        }
    }

    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00d9ff';
        this.ctx.font = '14px monospace';
        
        this.columns.forEach((y, index) => {
            const text = String.fromCharCode(Math.random() * 128);
            const x = index * 14;
            
            this.ctx.fillText(text, x, y * 14);
            
            if (y * 14 > this.canvas.height && Math.random() > 0.975) {
                this.columns[index] = 0;
            }
            
            this.columns[index]++;
        });
        
        setTimeout(() => this.animate(), 50);
    }
}

// Initialize all futuristic effects
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize cursor on desktop
    if (window.innerWidth > 768) {
        new CyberCursor();
    }
    
    new GlitchText();
    new InteractiveBackground();
    new MatrixRain();
    
    // Add data attributes for numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        stat.setAttribute('data-value', stat.textContent);
    });
    
    // Holographic card effect
    document.querySelectorAll('.feature-card, .floating-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});

// Audio feedback for interactions (optional)
class AudioFeedback {
    constructor() {
        this.audioContext = null;
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.setupEventListeners();
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    setupEventListeners() {
        document.querySelectorAll('button, .nav-link').forEach(element => {
            element.addEventListener('click', () => {
                this.playClickSound();
            });
        });
    }

    playClickSound() {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// Export for use in other modules
window.CyberCursor = CyberCursor;
window.GlitchText = GlitchText;
window.InteractiveBackground = InteractiveBackground;
window.MatrixRain = MatrixRain;
window.AudioFeedback = AudioFeedback;