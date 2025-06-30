// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00ff9d', '#6c63ff']
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.6,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff9d',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Typing effect for headings
document.addEventListener('DOMContentLoaded', function() {
    const headings = document.querySelectorAll('.typing-effect');
    headings.forEach(heading => {
        heading.style.width = '0';
        setTimeout(() => {
            heading.style.width = '100%';
        }, 100);
    });
});

// Smooth scroll for navigation
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .project-card, .skill-tag').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Dynamic skill progress bars
function updateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(progress => {
        const value = progress.getAttribute('data-value');
        progress.style.width = value + '%';
    });
}

// Call once on load
updateSkillBars();

// Contact form handling
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the submit button
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Disable the submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Get form data
        const formData = {
            from_name: this.querySelector('input[name="name"]').value,
            from_email: this.querySelector('input[name="email"]').value,
            subject: this.querySelector('input[name="subject"]').value,
            message: this.querySelector('textarea[name="message"]').value,
            to_name: 'Muhammad Waqas Ali',
            to_email: 'aliayubi167@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('default_service', 'template_id', formData) // Replace with your service ID and template ID
            .then(() => {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            })
            .catch((error) => {
                // Show error message
                alert('Oops! There was an error sending your message. Please try again later or contact me directly at aliayubi167@gmail.com');
                console.error('EmailJS error:', error);
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animations
document.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Skills animation
const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach(badge => {
    badge.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    badge.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Theme toggle functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    
    // Set initial theme
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        updateThemeIcon(storedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initTheme); 