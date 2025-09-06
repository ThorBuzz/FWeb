// Enhanced JavaScript for FECESA Website

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', newTheme);
    });
}

// Navbar scroll functionality
function initNavbarScroll() {
    const navbar = document.querySelector('.fecesa-navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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

// Animation on scroll
function initScrollAnimations() {
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.loading');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('loaded');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Initial check
    setTimeout(animateOnScroll, 100);
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.navbar-toggler');
    const mainNav = document.querySelector('.navbar-collapse');
    
    if (!mobileMenuBtn || !mainNav) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // Check if the link is not for a modal or a dropdown toggle
            if (!link.dataset.bsToggle && !link.classList.contains('dropdown-toggle')) {
                mainNav.classList.remove('show');
            }
        });
    });
}



// Loading overlay functionality
function initLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (!loadingOverlay) return;
    
    // Hide loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 300);
        }, 1000);
    });
}

// Placeholder for generic modal functionality
// This function will populate the genericModal with content and show it
function showModal(title, content) {
    const genericModal = new bootstrap.Modal(document.getElementById('genericModal'));
    document.getElementById('genericModalLabel').textContent = title;
    document.getElementById('genericModalBody').innerHTML = `<p>${content}</p>`;
    genericModal.show();
}

// Placeholder for other specific button actions
function showAllNews() {
    alert('Navigating to all news articles...');
    // Implement actual navigation or content loading here
    // window.location.href = '/news-archive'; 
}

function readNews(newsId) {
    alert(`Reading news article: ${newsId}`);
    // Implement actual news article loading/display
    // window.location.href = `/news/${newsId}`;
}

function accessResource(resourceId) {
    alert(`Accessing resource: ${resourceId}`);
    // Implement actual resource access, e.g., redirect to a PDF or internal page
    // window.location.href = `/resources/${resourceId}`;
}

function contactSeller(itemId) {
    alert(`Contacting seller for item: ${itemId}`);
    // Implement a contact form or direct link to seller
}

function startApplication(programType) {
    alert(`Starting application for ${programType} programs.`);
    // Implement actual application form or redirect
    // window.location.href = `/apply?program=${programType}`;
}

function playVideo() {
    alert('Playing campus tour video!');
    // Implement actual video playback, e.g., replace placeholder with an iframe
    // Example: document.querySelector('#videoModal .ratio').innerHTML = '<iframe src="YOUR_VIDEO_URL" title="YouTube video" allowfullscreen></iframe>';
}


// Initialize all functionality
function initAll() {
    console.log('FECESA Website JavaScript Loaded');
    
    // Initialize all features
    initThemeToggle();
    initNavbarScroll();
    initBackToTop();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initLoadingOverlay(); // This should be the last one to ensure other elements are loaded
    
    console.log('All features initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

// Resource Modal Functionality
function initResourceModal() {
    const resourceModal = document.getElementById('resourceModal');
    if (!resourceModal) return;
    
    // Update modal title based on which resource card was clicked
    resourceModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        const resourceType = button.getAttribute('data-resource-type');
        const modalTitle = resourceModal.querySelector('#modalResourceTitle');
        
        // Set the modal title based on resource type
        if (resourceType === 'course-materials') {
            modalTitle.textContent = 'Course Materials';
        } else if (resourceType === 'past-exams') {
            modalTitle.textContent = 'Past Exams';
        } else if (resourceType === 'software-tools') {
            modalTitle.textContent = 'Software Tools';
        } else if (resourceType === 'career-center') {
            modalTitle.textContent = 'Career Center';
        }
        
        // Update Google Drive links based on resource type
        updateResourceLinks(resourceType);
    });
    
    // Add click event to all resource cards
    document.querySelectorAll('.resource-card').forEach(card => {
        card.style.cursor = 'pointer';
    });
}

// Function to update resource links based on type
function updateResourceLinks(resourceType) {
    // These would be your actual Google Drive links
    const links = {
        'course-materials': {
            firstYear: 'https://drive.google.com/drive/folders/course-materials-first-year',
            secondYear: 'https://drive.google.com/drive/folders/course-materials-second-year',
            thirdYear: 'https://drive.google.com/drive/folders/course-materials-third-year',
            allResources: 'https://drive.google.com/drive/folders/course-materials-all'
        },
        'past-exams': {
            firstYear: 'https://drive.google.com/drive/folders/past-exams-first-year',
            secondYear: 'https://drive.google.com/drive/folders/past-exams-second-year',
            thirdYear: 'https://drive.google.com/drive/folders/past-exams-third-year',
            allResources: 'https://drive.google.com/drive/folders/past-exams-all'
        },
        'software-tools': {
            firstYear: 'https://drive.google.com/drive/folders/software-tools-first-year',
            secondYear: 'https://drive.google.com/drive/folders/software-tools-second-year',
            thirdYear: 'https://drive.google.com/drive/folders/software-tools-third-year',
            allResources: 'https://drive.google.com/drive/folders/software-tools-all'
        },
        'career-center': {
            firstYear: 'https://drive.google.com/drive/folders/career-center-first-year',
            secondYear: 'https://drive.google.com/drive/folders/career-center-second-year',
            thirdYear: 'https://drive.google.com/drive/folders/career-center-third-year',
            allResources: 'https://drive.google.com/drive/folders/career-center-all'
        }
    };
    
    // Update the links in the modal
    if (links[resourceType]) {
        document.querySelector('[href*="first-year"]').href = links[resourceType].firstYear;
        document.querySelector('[href*="second-year"]').href = links[resourceType].secondYear;
        document.querySelector('[href*="third-year"]').href = links[resourceType].thirdYear;
        document.querySelector('[href*="all-resources"]').href = links[resourceType].allResources;
    }
}

// Add initResourceModal to your initAll function
function initAll() {
    console.log('FECESA Website JavaScript Loaded');
    
    // Initialize all features
    initThemeToggle();
    initNavbarScroll();
    initBackToTop();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initResourceModal(); // Add this line
    initLoadingOverlay();
    
    console.log('All features initialized successfully');
}