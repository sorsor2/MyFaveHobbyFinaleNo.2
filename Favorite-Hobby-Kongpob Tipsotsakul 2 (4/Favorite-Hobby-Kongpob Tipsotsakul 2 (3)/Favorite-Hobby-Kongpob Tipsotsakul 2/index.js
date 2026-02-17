// ============================================
// ENHANCED INTERACTIVE JAVASCRIPT
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    ScrollEffects.init();
    Particles.init();
    Typewriter.init();
    CardTilt.init();
    ProgressBars.init();
    QuoteSlider.init();
    BackToTop.init();
    Toast.init();
    
    // Add global event listeners
    addGlobalListeners();
});

// ============================================
// PRELOADER MODULE
// ============================================
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;
        
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.classList.remove('loading');
                
                // Trigger entrance animations
                this.triggerEntranceAnimations();
            }, 2000);
        });
    },
    
    triggerEntranceAnimations() {
        // Add staggered animations to elements
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
};

// ============================================
// CUSTOM CURSOR MODULE
// ============================================
const CustomCursor = {
    dot: null,
    outline: null,
    posX: 0,
    posY: 0,
    mouseX: 0,
    mouseY: 0,
    
    init() {
        this.dot = document.getElementById('cursor-dot');
        this.outline = document.getElementById('cursor-outline');
        
        if (!this.dot || !this.outline) return;
        
        // Check if device supports hover
        if (window.matchMedia('(hover: none)').matches) return;
        
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mousedown', () => this.onMouseDown());
        document.addEventListener('mouseup', () => this.onMouseUp());
        
        // Add hover effects to interactive elements
        this.addHoverEffects();
        
        // Animate cursor
        this.animate();
    },
    
    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update dot position immediately
        this.dot.style.left = `${this.mouseX}px`;
        this.dot.style.top = `${this.mouseY}px`;
    },
    
    onMouseDown() {
        this.dot.classList.add('active');
        this.outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    },
    
    onMouseUp() {
        this.dot.classList.remove('active');
        this.outline.style.transform = 'translate(-50%, -50%) scale(1)';
    },
    
    animate() {
        // Smooth follow for outline
        this.posX += (this.mouseX - this.posX) * 0.15;
        this.posY += (this.mouseY - this.posY) * 0.15;
        
        this.outline.style.left = `${this.posX}px`;
        this.outline.style.top = `${this.posY}px`;
        
        requestAnimationFrame(() => this.animate());
    },
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .hobby-card, .social-link');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.classList.add('hover');
                
                // Add specific class for gaming elements
                if (el.classList.contains('gaming') || el.classList.contains('game-link')) {
                    this.outline.classList.add('hover-game');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                this.outline.classList.remove('hover', 'hover-game');
            });
        });
    }
};

// ============================================
// NAVIGATION MODULE
// ============================================
const Navigation = {
    navbar: null,
    hamburger: null,
    navLinks: null,
    
    init() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navLinks = document.getElementById('nav-links');
        
        if (!this.navbar) return;
        
        // Scroll effect
        window.addEventListener('scroll', () => this.onScroll());
        
        // Hamburger menu
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navLinks.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Active link highlighting
        this.highlightActiveSection();
    },
    
    onScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    },
    
    closeMenu() {
        this.hamburger?.classList.remove('active');
        this.navLinks?.classList.remove('active');
    },
    
    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-links a[data-section]').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === current) {
                    link.classList.add('active');
                }
            });
        });
    }
};

// ============================================
// SCROLL EFFECTS MODULE
// ============================================
const ScrollEffects = {
    scrollProgress: null,
    
    init() {
        this.scrollProgress = document.getElementById('scroll-progress');
        
        // Smooth scroll for anchor links
        this.initSmoothScroll();
        
        // Scroll progress bar
        window.addEventListener('scroll', () => this.updateScrollProgress());
        
        // Reveal animations
        this.initScrollReveal();
        
        // Parallax effects
        this.initParallax();
    },
    
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },
    
    updateScrollProgress() {
        if (!this.scrollProgress) return;
        
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        this.scrollProgress.style.width = `${scrolled}%`;
    },
    
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.hobby-card, .feature-item, .quote-container').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    },
    
    initParallax() {
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translate(-50%, calc(-50% + ${scrolled * speed}px))`;
            });
        });
    }
};

// ============================================
// PARTICLES MODULE
// ============================================
const Particles = {
    container: null,
    particleCount: 30,
    
    init() {
        this.container = document.getElementById('hero-particles');
        if (!this.container) return;
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        this.createParticles();
    },
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = `particle ${i % 2 === 0 ? 'rock-particle' : 'game-particle'}`;
            
            // Random properties
            const size = Math.random() * 8 + 4;
            const left = Math.random() * 100;
            const delay = Math.random() * 20;
            const duration = Math.random() * 15 + 10;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            this.container.appendChild(particle);
        }
    }
};

// ============================================
// TYPEWRITER MODULE
// ============================================
const Typewriter = {
    element: null,
    texts: ['My Hobbies', 'Rock & Gaming', 'My Passions'],
    textIndex: 0,
    charIndex: 0,
    isDeleting: false,
    typeSpeed: 100,
    deleteSpeed: 50,
    pauseTime: 2000,
    
    init() {
        this.element = document.getElementById('typewriter');
        if (!this.element) return;
        
        this.type();
    },
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let timeout = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            timeout = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            timeout = 500;
        }
        
        setTimeout(() => this.type(), timeout);
    }
};

// ============================================
// CARD TILT MODULE
// ============================================
const CardTilt = {
    cards: [],
    
    init() {
        this.cards = document.querySelectorAll('[data-tilt]');
        
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.onMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.onMouseLeave(e, card));
        });
    },
    
    onMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        
        // Move glow effect
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        }
    },
    
    onMouseLeave(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
};

// ============================================
// PROGRESS BARS MODULE
// ============================================
const ProgressBars = {
    init() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = `${progress}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
};

// ============================================
// QUOTE SLIDER MODULE
// ============================================
const QuoteSlider = {
    quotes: [
        { text: "Music is the universal language of mankind.", author: "Henry Wadsworth Longfellow" },
        { text: "Video games are the future of entertainment.", author: "Shigeru Miyamoto" },
        { text: "Rock and roll is here to stay.", author: "Neil Young" },
        { text: "The game is not over until it's over.", author: "Yogi Berra" },
        { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" }
    ],
    currentIndex: 0,
    
    init() {
        this.textElement = document.getElementById('quote-text');
        this.authorElement = document.getElementById('quote-author');
        this.dotsContainer = document.getElementById('quote-dots');
        this.prevBtn = document.getElementById('quote-prev');
        this.nextBtn = document.getElementById('quote-next');
        
        if (!this.textElement) return;
        
        this.createDots();
        this.showQuote(0);
        
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());
        
        // Auto-advance
        setInterval(() => this.next(), 8000);
    },
    
    createDots() {
        if (!this.dotsContainer) return;
        
        this.quotes.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'quote-dot';
            dot.addEventListener('click', () => this.showQuote(index));
            this.dotsContainer.appendChild(dot);
        });
    },
    
    showQuote(index) {
        this.currentIndex = index;
        const quote = this.quotes[index];
        
        this.textElement.style.opacity = '0';
        
        setTimeout(() => {
            this.textElement.textContent = `"${quote.text}"`;
            this.authorElement.textContent = `— ${quote.author}`;
            this.textElement.style.opacity = '1';
        }, 300);
        
        // Update dots
        document.querySelectorAll('.quote-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    },
    
    next() {
        const nextIndex = (this.currentIndex + 1) % this.quotes.length;
        this.showQuote(nextIndex);
    },
    
    prev() {
        const prevIndex = (this.currentIndex - 1 + this.quotes.length) % this.quotes.length;
        this.showQuote(prevIndex);
    }
};

// ============================================
// BACK TO TOP MODULE
// ============================================
const BackToTop = {
    button: null,
    progressCircle: null,
    
    init() {
        this.button = document.getElementById('back-to-top');
        this.progressCircle = document.querySelector('.progress-ring-circle');
        
        if (!this.button) return;
        
        window.addEventListener('scroll', () => this.onScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    onScroll() {
        const scrolled = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrolled / windowHeight;
        
        // Show/hide button
        if (scrolled > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
        
        // Update progress ring
        if (this.progressCircle) {
            const circumference = 138.2;
            const offset = circumference - (progress * circumference);
            this.progressCircle.style.strokeDashoffset = offset;
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ============================================
// TOAST NOTIFICATION MODULE
// ============================================
const Toast = {
    container: null,
    
    init() {
        this.container = document.getElementById('toast-container');
        
        // Show welcome toast after page load
        setTimeout(() => {
            this.show('Welcome! Explore my hobbies 🎸🎮', 'info');
        }, 3000);
    },
    
    show(message, type = 'info', duration = 4000) {
        if (!this.container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${message}</span>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        this.container.appendChild(toast);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.dismiss(toast);
        });
        
        // Auto dismiss
        setTimeout(() => {
            this.dismiss(toast);
        }, duration);
    },
    
    dismiss(toast) {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }
};

// ============================================
// GLOBAL EVENT LISTENERS
// ============================================
function addGlobalListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile menu
        if (e.key === 'Escape') {
            Navigation.closeMenu();
        }
        
        // Arrow keys for quote slider
        if (e.key === 'ArrowLeft') {
            QuoteSlider.prev();
        }
        if (e.key === 'ArrowRight') {
            QuoteSlider.next();
        }
    });
    
    // Scroll indicator click
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const hobbiesSection = document.getElementById('hobbies');
            if (hobbiesSection) {
                hobbiesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Card click effects
    document.querySelectorAll('.hobby-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Create ripple effect
            createRipple(e, card);
        });
    });
    
    // Social link interactions
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('aria-label');
            Toast.show(`${platform} link clicked!`, 'info');
        });
    });
    
    // Magnetic button effect
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.addEventListener('mousemove', (e) => magneticEffect(e, el));
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
    
    // Easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            Toast.show('🎉 Konami Code Activated! You\'re a true gamer!', 'success');
            document.body.style.animation = 'rainbow 2s linear';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 2000);
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function createRipple(e, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size/2}px;
        top: ${e.clientY - rect.top - size/2}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function magneticEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ============================================
// FLOATING ICONS (Features Section)
// ============================================
const FloatingIcons = {
    icons: ['fa-guitar', 'fa-gamepad', 'fa-music', 'fa-headphones', 'fa-compact-disc', 'fa-trophy'],
    
    init() {
        const container = document.getElementById('floating-icons');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const icon = document.createElement('i');
            const randomIcon = this.icons[Math.floor(Math.random() * this.icons.length)];
            icon.className = `fas ${randomIcon} floating-icon`;
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.animationDelay = `${Math.random() * 20}s`;
            icon.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(icon);
        }
    }
};

// Initialize floating icons
document.addEventListener('DOMContentLoaded', () => {
    FloatingIcons.init();
});