// Page Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Scroll Progress Indicator
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.pageYOffset / totalScroll;
        scrollProgress.style.transform = `scaleX(${progress})`;
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Portfolio Lightbox
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.querySelector('.portfolio-lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        const imageSrc = portfolioItems[index].querySelector('img').src;
        lightboxImage.src = imageSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentImageIndex = (currentImageIndex + direction + portfolioItems.length) % portfolioItems.length;
        const imageSrc = portfolioItems[currentImageIndex].querySelector('img').src;
        lightboxImage.src = imageSrc;
    }

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Load portfolio items
    loadPortfolioItems();

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Form submission handler with validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }

            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }

            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }

            if (isValid) {
                // Show success message
                contactForm.innerHTML = `
                    <div class="form-success" data-aos="zoom-in">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank you for your message, ${name.value}!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                    </div>
                `;
                AOS.refresh();
            }
        });
    }

    // Add AOS attributes to elements for animations
    applyAnimations();
});

// Function to load portfolio items
function loadPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (!portfolioGrid) return;
    
    const portfolioItems = [
        {
            image: 'IMG_3797.jpeg',
            title: 'Soft Glam Look',
            description: 'Natural everyday makeup with a subtle glow'
        },
        {
            image: 'IMG_2635.jpeg',
            title: 'Evening Glam',
            description: 'Perfect for special occasions and events'
        },
        {
            image: 'FullSizeRender.jpeg',
            title: 'Professional Portrait',
            description: 'Clean, polished look for professional settings'
        },
        {
            image: 'FullSizeRender 2.jpeg',
            title: 'Classic Beauty',
            description: 'Timeless makeup that enhances natural features'
        }
    ];
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-aos', 'fade-up');
        portfolioItem.setAttribute('data-aos-delay', (index * 100).toString());
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <div class="overlay-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Function to apply animations to elements
function applyAnimations() {
    // Apply animations to sections
    document.querySelectorAll('section h2').forEach(heading => {
        heading.setAttribute('data-aos', 'fade-up');
    });
    
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index * 100).toString());
    });
    
    document.querySelectorAll('.skills li, .experience-item li').forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-in');
        item.setAttribute('data-aos-delay', (index * 50).toString());
    });
}

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}

function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Add styles dynamically
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
    }

    .form-group input.error,
    .form-group textarea.error {
        border: 1px solid #dc3545;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
    }

    .form-success {
        text-align: center;
        padding: 40px 20px;
    }

    .form-success i {
        font-size: 60px;
        color: var(--accent-color);
        margin-bottom: 20px;
    }

    .form-success h3 {
        margin-bottom: 15px;
        color: var(--accent-color);
    }

    .portfolio-item {
        background-color: var(--white);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        position: relative;
    }
    
    .portfolio-item:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
    
    .portfolio-image {
        position: relative;
        overflow: hidden;
    }
    
    .portfolio-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .portfolio-item:hover .portfolio-image img {
        transform: scale(1.05);
    }
    
    .portfolio-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(212, 165, 165, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .portfolio-item:hover .portfolio-overlay {
        opacity: 1;
    }
    
    .overlay-content {
        text-align: center;
        padding: 20px;
        color: white;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }
    
    .portfolio-item:hover .overlay-content {
        transform: translateY(0);
    }
    
    .portfolio-info {
        padding: 20px;
    }
    
    .portfolio-info h3 {
        color: var(--accent-color);
        margin-bottom: 10px;
    }
    
    /* Add animations for elements with AOS */
    [data-aos="fade-up"] {
        transform: translateY(50px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-in"] {
        opacity: 0;
    }
    
    [data-aos="fade-in"].aos-animate {
        opacity: 1;
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.8);
        opacity: 0;
    }
    
    [data-aos="zoom-in"].aos-animate {
        transform: scale(1);
        opacity: 1;
    }
`;

document.head.appendChild(style); 