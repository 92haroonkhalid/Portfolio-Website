// Performance optimization: Use strict mode
'use strict';

// DOM Elements Cache
const header = document.getElementById('header');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.querySelector('.theme-toggle');
const lazyImages = document.querySelectorAll('.lazy-load');

// Utility Functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Header Scroll Effect
const handleScroll = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Mobile Menu Toggle
const toggleMenu = () => {
    navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    );
};

// Theme Toggle
const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    // Update icon
    const themeIcon = themeToggle.querySelector('i');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
};

// Lazy Loading Images
const loadImage = (image) => {
    image.classList.add('loaded');
};

// Initialize Theme
const initTheme = () => {
    const storedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme !== null) {
        document.body.classList.toggle('dark-mode', storedTheme === 'true');
    } else if (prefersDark) {
        document.body.classList.add('dark-mode');
    }
    
    // Update icon based on current theme
    const themeIcon = themeToggle.querySelector('i');
    if (themeIcon) {
        themeIcon.className = document.body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
    }
};

// Smooth Scroll
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

// Event Listeners
window.addEventListener('scroll', debounce(handleScroll, 10));
menuToggle.addEventListener('click', toggleMenu);
themeToggle.addEventListener('click', toggleTheme);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupPortfolioFilter();
    setupPortfolioModals();
    setupScrollAnimation();
    setupContactForm();
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Smooth scroll with performance optimization
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Your scroll handling code here
            const header = document.querySelector('#header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    });

    // Optimized gallery image loading
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });

    // Optimized animations
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}

// Service Worker registration for PWA support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.menu-toggle')) {
        toggleMenu();
    }
});

// Handle mobile orientation change
window.addEventListener('orientationchange', () => {
    if (navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Performance optimization: Remove unused event listeners on cleanup
window.addEventListener('unload', () => {
    window.removeEventListener('scroll', handleScroll);
    menuToggle.removeEventListener('click', toggleMenu);
    themeToggle.removeEventListener('click', toggleTheme);
});

/**
 * Portfolio Filtering
 */
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Accessibility: update aria-pressed
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');

            const filterValue = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // Keyboard accessibility: allow arrow keys to move between filter buttons
    filterButtons.forEach((button, idx) => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                filterButtons[(idx + 1) % filterButtons.length].focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                filterButtons[(idx - 1 + filterButtons.length) % filterButtons.length].focus();
            }
        });
    });
}

/**
 * Portfolio Modal Functionality
 */
function setupPortfolioModals() {
    const modalLinks = document.querySelectorAll('[data-project]');
    const modals = document.querySelectorAll('.project-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal when clicking project link
    if (modalLinks.length > 0) {
        modalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project');
                const modal = document.getElementById(projectId);
                
                if (modal) {
                    // Add fade-in animation
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    setTimeout(() => {
                        modal.classList.add('show');
                        modal.querySelector('.modal-content').classList.add('show');
                    }, 10);
                }
            });
        });
    }
    
    // Close modal when clicking close button
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.project-modal');
                if (modal) {
                    closeModal(modal);
                }
            });
        });
    }
    
    // Close modal when clicking outside
    if (modals.length > 0) {
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal);
                }
            });
        }
    });

    // Function to handle modal closing with animation
    function closeModal(modal) {
        modal.classList.remove('show');
        modal.querySelector('.modal-content').classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

/**
 * Contact Form Submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (simple validation)
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill out all fields';
                formStatus.className = 'error';
                formStatus.style.display = 'block';
                return;
            }
            
            // Simulate form submission (would be replaced with actual AJAX call)
            formStatus.textContent = 'Sending message...';
            formStatus.className = '';
            formStatus.style.display = 'block';
            
            // Simulate success after 2 seconds
            setTimeout(function() {
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.className = 'success';
                contactForm.reset();
                
                // Hide status message after 5 seconds
                setTimeout(function() {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 2000);
        });
    }
}

/**
 * Scroll Animation
 */
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.section-header, .about-preview-content, .about-grid, .skills-grid, .timeline, .portfolio-grid, .services-grid, .process-steps, .pricing-grid, .contact-grid');
    
    // Add animation class when the element is in viewport
    function animateOnScroll() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Call once on load
    animateOnScroll();
    
    // Call on scroll
    window.addEventListener('scroll', animateOnScroll);
}
