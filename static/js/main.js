// Enhanced JavaScript for FECESA Website

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', newTheme);
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}

// Back to top button functionality
function initBackToTop() {
    const backToTop = document.getElementById('backToTop') || document.getElementById('back-to-top');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
}

// Initialize tooltips if Bootstrap is available
function initTooltips() {
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Blog-specific functionality
function initBlogFeatures() {
    const gridContainer = document.querySelector('.grid-container');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!gridContainer || !loadMoreBtn) return;
    
    // Sample articles data
    const articles = [
        {
            id: 1,
            title: "The Evolution of Web Design in 2024",
            excerpt: "How modern CSS and JavaScript frameworks are pushing the boundaries of what's possible in web design.",
            category: "Design",
            date: "January 15, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 2,
            title: "Building Scalable Microservices with Node.js",
            excerpt: "Best practices for architecting your Node.js applications to handle millions of requests.",
            category: "Development",
            date: "January 12, 2024",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 3,
            title: "The Rise of AI in Engineering Education",
            excerpt: "How artificial intelligence is transforming the way we teach and learn engineering concepts.",
            category: "Technology",
            date: "January 10, 2024",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 4,
            title: "UX Psychology: Principles Every Designer Should Know",
            excerpt: "Leveraging cognitive psychology to create more intuitive and engaging user experiences.",
            category: "Design",
            date: "January 8, 2024",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 5,
            title: "React 18: New Features and Performance Improvements",
            excerpt: "Exploring concurrent rendering, automatic batching, and other enhancements in the latest React release.",
            category: "Development",
            date: "January 5, 2024",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
            id: 6,
            title: "The Future of Remote Work in Tech",
            excerpt: "How distributed teams are reshaping company cultures and productivity in the tech industry.",
            category: "Business",
            date: "January 3, 2024",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
    ];

    let visibleArticles = 3;
    
    function renderArticles() {
        gridContainer.innerHTML = '';
        
        articles.slice(0, visibleArticles).forEach(article => {
            const articleEl = document.createElement('article');
            articleEl.className = 'article-card';
            articleEl.innerHTML = `
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}" loading="lazy">
                </div>
                <div class="card-content">
                    <span class="card-category">${article.category}</span>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-excerpt">${article.excerpt}</p>
                    <div class="card-footer">
                        <span>${article.date}</span>
                        <span>${article.readTime}</span>
                    </div>
                </div>
            `;
            
            gridContainer.appendChild(articleEl);
        });
        
        // Hide load more button if all articles are visible
        if (visibleArticles >= articles.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    // Load more articles
    loadMoreBtn.addEventListener('click', () => {
        visibleArticles += 3;
        renderArticles();
        
        // Smooth scroll to bottom of new articles
        setTimeout(() => {
            const lastArticle = gridContainer.lastElementChild;
            if (lastArticle) {
                lastArticle.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }, 100);
    });
    
    // Initial render
    renderArticles();
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (email) {
            // Simulate newsletter subscription
            alert('Thanks for subscribing to our newsletter!');
            e.target.reset();
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileMenuBtn || !mainNav) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('show');
        });
    });
}

// Animation on scroll
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.featured-post, .article-card, .newsletter, .program-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('.featured-post, .article-card, .newsletter, .program-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
}

// Dashboard functionality
function initDashboard() {
    const dashboardForm = document.querySelector('#dashboard-form');
    if (!dashboardForm) return;
    
    dashboardForm.addEventListener('submit', (e) => {
        const title = e.target.querySelector('[name="title"]').value;
        const price = e.target.querySelector('[name="price"]').value;
        const category = e.target.querySelector('[name="category"]').value;
        
        if (!title || !price || !category) {
            e.preventDefault();
            alert('Please fill in all required fields!');
            return;
        }
        
        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            e.preventDefault();
            alert('Please enter a valid price!');
            return;
        }
    });
}

// Search functionality
function initSearch() {
    const searchBar = document.querySelector('.search-bar input');
    if (!searchBar) return;
    
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            if (query) {
                // Simulate search functionality
                console.log('Searching for:', query);
                alert(`Searching for: "${query}". Search functionality coming soon!`);
            }
        }
    });
    
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchBar.value.trim();
            if (query) {
                console.log('Searching for:', query);
                alert(`Searching for: "${query}". Search functionality coming soon!`);
            }
        });
    }
}

// Wishlist functionality for marketplace
function initWishlist() {
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = btn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas', 'text-danger');
                btn.setAttribute('title', 'Remove from wishlist');
            } else {
                icon.classList.remove('fas', 'text-danger');
                icon.classList.add('far');
                btn.setAttribute('title', 'Add to wishlist');
            }
        });
    });
}

// Add to cart functionality
function initAddToCart() {
    const addToCartBtns = document.querySelectorAll('.btn:contains("Add to Cart")');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulate adding to cart
            const productCard = btn.closest('.product-card');
            const productTitle = productCard.querySelector('.card-title').textContent;
            
            // Update cart counter (if exists)
            const cartCounter = document.querySelector('.cart-floater .badge');
            if (cartCounter) {
                const currentCount = parseInt(cartCounter.textContent) || 0;
                cartCounter.textContent = currentCount + 1;
            }
            
            // Show confirmation
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check me-2"></i>Added!';
            btn.classList.add('btn-success');
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.disabled = false;
            }, 2000);
            
            console.log(`Added "${productTitle}" to cart`);
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('FECESA Website JavaScript Loaded');
    
    // Initialize all features
    initThemeToggle();
    initBackToTop();
    initTooltips();
    initBlogFeatures();
    initNewsletterForm();
    initMobileMenu();
    initScrollAnimations();
    initDashboard();
    initSearch();
    initWishlist();
    initAddToCart();
    
    console.log('All features initialized successfully');
});

// Handle page-specific functionality
window.addEventListener('load', function() {
    // Trigger initial animations
    const event = new Event('scroll');
    window.dispatchEvent(event);
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeToggle,
        initBackToTop,
        initBlogFeatures,
        initNewsletterForm,
        initMobileMenu,
        initScrollAnimations
    };
}