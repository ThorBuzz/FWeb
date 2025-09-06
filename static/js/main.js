// Enhanced JavaScript for FECESA Website

// In-memory theme storage (no localStorage)
let currentTheme = 'light';

// Resource data with your Google Drive links
const resourceData = {
    'course-materials': {
        title: 'Course Materials',
        courses: {
            'computer-engineering': {
                name: 'Computer Engineering',
                years: {
                    first: [
                        { name: 'First Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/10oZS8ZLWzmIGgXWjQqVtI7OuBjV7t8NI' }
                    ],
                    second: [
                        { name: 'Second Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/104MxXOm0BT5iwGz6lIKPJ3YjavqWP9aT' }
                    ],
                    third: [
                        { name: 'Third Year Semester 1', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/jvhgg39i8shs6g6/AABnyf1wa6aROtsZGrzrlWCDa?dl=0' },
                        { name: 'Third Year Semester 2', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/61n42ybmjnosdgl/AAAX3fNlMCpmrCKG_3aap4fba?dl=0' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1nZT4411OGKg_qLZptDeAdL7W4OQPvPdb?usp=sharing' }
                    ]
                }
            },
            'electrical-engineering': {
                name: 'Electrical Engineering',
                years: {
                    first: [
                        { name: 'First Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/10oZS8ZLWzmIGgXWjQqVtI7OuBjV7t8NI' }
                    ],
                    second: [
                        { name: 'Second Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/104MxXOm0BT5iwGz6lIKPJ3YjavqWP9aT' }
                    ],
                    third: [
                        { name: 'Third Year Semester 1', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/jvhgg39i8shs6g6/AABnyf1wa6aROtsZGrzrlWCDa?dl=0' },
                        { name: 'Third Year Semester 2', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/61n42ybmjnosdgl/AAAX3fNlMCpmrCKG_3aap4fba?dl=0' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1nZT4411OGKg_qLZptDeAdL7W4OQPvPdb?usp=sharing' }
                    ]
                }
            },
            'biomedical-engineering': {
                name: 'Biomedical Engineering',
                years: {
                    first: [
                        { name: 'First Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/10oZS8ZLWzmIGgXWjQqVtI7OuBjV7t8NI' }
                    ],
                    second: [
                        { name: 'Second Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/104MxXOm0BT5iwGz6lIKPJ3YjavqWP9aT' }
                    ],
                    third: [
                        { name: 'Third Year Semester 1', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/jvhgg39i8shs6g6/AABnyf1wa6aROtsZGrzrlWCDa?dl=0' },
                        { name: 'Third Year Semester 2', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/61n42ybmjnosdgl/AAAX3fNlMCpmrCKG_3aap4fba?dl=0' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1nZT4411OGKg_qLZptDeAdL7W4OQPvPdb?usp=sharing' }
                    ]
                }
            },
            'telecommunications': {
                name: 'Telecommunications',
                years: {
                    first: [
                        { name: 'First Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/10oZS8ZLWzmIGgXWjQqVtI7OuBjV7t8NI' }
                    ],
                    second: [
                        { name: 'Second Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/104MxXOm0BT5iwGz6lIKPJ3YjavqWP9aT' }
                    ],
                    third: [
                        { name: 'Third Year Semester 1', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/jvhgg39i8shs6g6/AABnyf1wa6aROtsZGrzrlWCDa?dl=0' },
                        { name: 'Third Year Semester 2', type: 'folder', size: 'Multiple files', url: 'https://www.dropbox.com/sh/61n42ybmjnosdgl/AAAX3fNlMCpmrCKG_3aap4fba?dl=0' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Materials', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1nZT4411OGKg_qLZptDeAdL7W4OQPvPdb?usp=sharing' }
                    ]
                }
            }
        }
    },
    'past-exams': {
        title: 'Past Exams',
        courses: {
            'computer-engineering': {
                name: 'Computer Engineering',
                years: {
                    first: [
                        { name: 'First Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    second: [
                        { name: 'Second Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    third: [
                        { name: 'Third Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ]
                }
            },
            'electrical-engineering': {
                name: 'Electrical Engineering',
                years: {
                    first: [
                        { name: 'First Year Exams', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    second: [
                        { name: 'Second Year Exams', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    third: [
                        { name: 'Third Year Exams', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Exams', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ]
                }
            },
            'telecommunications': {
                name: 'Telecommunications',
                years: {
                    first: [
                        { name: 'First Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    second: [
                        { name: 'Second Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    third: [
                        { name: 'Third Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Exams', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ]
                }
            }
        }
    },
    'software-tools': {
        title: 'Software Tools',
        courses: {
            'engineering-software': {
                name: 'Engineering Software',
                years: {
                    first: [
                        { name: 'First Year Software', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    second: [
                        { name: 'Second Year Software', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    third: [
                        { name: 'Third Year Software', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Software', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ]
                }
            },
            'programming-tools': {
                name: 'Programming Tools',
                years: {
                    first: [
                        { name: 'First Year Tools', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    second: [
                        { name: 'Second Year Tools', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    third: [
                        { name: 'Third Year Tools', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Tools', type: 'folder', size: 'Multiple files', url: 'https://tinyurl.com/6e79rppw' }
                    ]
                }
            }
        }
    },
    'career-center': {
        title: 'Career Center',
        courses: {
            'internships': {
                name: 'Internship Opportunities',
                years: {
                    first: [
                        { name: 'First Year Internships', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    second: [
                        { name: 'Second Year Internships', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    third: [
                        { name: 'Third Year Internships', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Internships', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/14wIxci2A5mgMtDLc2uHBhkC9XSRUOL5k' }
                    ]
                }
            },
            'job-placements': {
                name: 'Job Placements',
                years: {
                    first: [
                        { name: 'First Year Job Resources', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    second: [
                        { name: 'Second Year Job Resources', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    third: [
                        { name: 'Third Year Job Resources', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ],
                    fourth: [
                        { name: 'Fourth Year Job Resources', type: 'folder', size: 'Multiple files', url: 'https://drive.google.com/drive/folders/1ugT4AIxSz-NhS88OU0ColBzhNmFbxNU1' }
                    ]
                }
            }
        }
    }
};

// Global variables to track current selection
let currentResourceType = '';
let currentCourseId = '';
let currentCourseName = '';
let currentYear = '';

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
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

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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

// Initialize resource modal functionality
function initResourceModal() {
    const resourceModal = document.getElementById('resourceModal');
    if (!resourceModal) return;
    
    // Update modal when shown
    resourceModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        currentResourceType = button.getAttribute('data-resource-type');
        
        // Reset to course selection view
        showCourseSelection();
        
        // Update breadcrumb
        const breadcrumbResourceType = document.getElementById('breadcrumbResourceType');
        const breadcrumbCourse = document.getElementById('breadcrumbCourse');
        const breadcrumbYear = document.getElementById('breadcrumbYear');
        
        if (breadcrumbResourceType) {
            breadcrumbResourceType.textContent = resourceData[currentResourceType].title;
        }
        if (breadcrumbCourse) breadcrumbCourse.classList.remove('active');
        if (breadcrumbYear) breadcrumbYear.classList.remove('active');
    });
    
    // Back to course button
    const btnBackToCourse = document.getElementById('btnBackToCourse');
    if (btnBackToCourse) {
        btnBackToCourse.addEventListener('click', showCourseSelection);
    }
    
    // Back to year button
    const btnBackToYear = document.getElementById('btnBackToYear');
    if (btnBackToYear) {
        btnBackToYear.addEventListener('click', showYearSelection);
    }
    
    // Year selection buttons
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentYear = this.getAttribute('data-year');
            showResourceLinks();
        });
    });
}

// Show course selection view
function showCourseSelection() {
    // Hide other views
    const yearSelection = document.getElementById('yearSelection');
    const resourceLinks = document.getElementById('resourceLinks');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    const courseSelection = document.getElementById('courseSelection');
    
    if (yearSelection) yearSelection.style.display = 'none';
    if (resourceLinks) resourceLinks.style.display = 'none';
    if (downloadAllBtn) downloadAllBtn.style.display = 'none';
    if (courseSelection) courseSelection.style.display = 'block';
    
    // Update navigation buttons
    const btnBackToCourse = document.getElementById('btnBackToCourse');
    const btnBackToYear = document.getElementById('btnBackToYear');
    if (btnBackToCourse) btnBackToCourse.style.display = 'none';
    if (btnBackToYear) btnBackToYear.style.display = 'none';
    
    // Update title
    const modalResourceTitle = document.getElementById('modalResourceTitle');
    if (modalResourceTitle) {
        modalResourceTitle.textContent = `Select a Course - ${resourceData[currentResourceType].title}`;
    }
    
    // Populate courses
    const courseList = document.getElementById('courseList');
    if (!courseList) return;
    
    courseList.innerHTML = '';
    
    for (const [courseId, course] of Object.entries(resourceData[currentResourceType].courses)) {
        const courseCol = document.createElement('div');
        courseCol.className = 'col-md-4 mb-3';
        
        const courseBtn = document.createElement('div');
        courseBtn.className = 'course-btn p-3 text-center border rounded shadow-sm h-100 d-flex flex-column align-items-center justify-content-center';
        courseBtn.style.cursor = 'pointer';
        courseBtn.style.transition = 'all 0.3s ease';
        courseBtn.setAttribute('data-course', courseId);
        
        // Add hover effects
        courseBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
        
        courseBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        // Add icon based on course
        let iconClass = 'fas fa-book';
        if (courseId.includes('computer')) iconClass = 'fas fa-laptop-code';
        if (courseId.includes('electrical')) iconClass = 'fas fa-bolt';
        if (courseId.includes('biomedical')) iconClass = 'fas fa-heartbeat';
        if (courseId.includes('telecommunications')) iconClass = 'fas fa-satellite';
        if (courseId.includes('engineering-software')) iconClass = 'fas fa-cogs';
        if (courseId.includes('programming-tools')) iconClass = 'fas fa-terminal';
        if (courseId.includes('internships')) iconClass = 'fas fa-briefcase';
        if (courseId.includes('job-placements')) iconClass = 'fas fa-user-tie';
        
        courseBtn.innerHTML = `
            <i class="${iconClass} mb-2" style="font-size: 2rem; color: #007bff;"></i>
            <h6 class="mb-0">${course.name}</h6>
        `;
        
        courseBtn.addEventListener('click', function() {
            currentCourseId = this.getAttribute('data-course');
            currentCourseName = resourceData[currentResourceType].courses[currentCourseId].name;
            showYearSelection();
        });
        
        courseCol.appendChild(courseBtn);
        courseList.appendChild(courseCol);
    }
    
    // Update breadcrumb
    const breadcrumbCourse = document.getElementById('breadcrumbCourse');
    const breadcrumbYear = document.getElementById('breadcrumbYear');
    const breadcrumbResourceType = document.getElementById('breadcrumbResourceType');
    
    if (breadcrumbCourse) breadcrumbCourse.classList.remove('active');
    if (breadcrumbYear) breadcrumbYear.classList.remove('active');
    if (breadcrumbResourceType) breadcrumbResourceType.classList.add('active');
}

// Show year selection view
function showYearSelection() {
    // Hide other views
    const courseSelection = document.getElementById('courseSelection');
    const resourceLinks = document.getElementById('resourceLinks');
    const yearSelection = document.getElementById('yearSelection');
    
    if (courseSelection) courseSelection.style.display = 'none';
    if (resourceLinks) resourceLinks.style.display = 'none';
    if (yearSelection) yearSelection.style.display = 'block';
    
    // Update navigation buttons
    const btnBackToCourse = document.getElementById('btnBackToCourse');
    const btnBackToYear = document.getElementById('btnBackToYear');
    if (btnBackToCourse) btnBackToCourse.style.display = 'block';
    if (btnBackToYear) btnBackToYear.style.display = 'none';
    
    // Update title
    const modalYearTitle = document.getElementById('modalYearTitle');
    const selectedCourseName = document.getElementById('selectedCourseName');
    
    if (modalYearTitle) {
        modalYearTitle.textContent = `Select Academic Year - ${currentCourseName}`;
    }
    if (selectedCourseName) {
        selectedCourseName.textContent = currentCourseName;
    }
    
    // Update breadcrumb
    const breadcrumbCourse = document.getElementById('breadcrumbCourse');
    const breadcrumbYear = document.getElementById('breadcrumbYear');
    
    if (breadcrumbCourse) {
        breadcrumbCourse.textContent = currentCourseName;
        breadcrumbCourse.classList.add('active');
    }
    if (breadcrumbYear) {
        breadcrumbYear.classList.remove('active');
    }
}

// Show resource links view
function showResourceLinks() {
    // Hide other views
    const courseSelection = document.getElementById('courseSelection');
    const yearSelection = document.getElementById('yearSelection');
    const resourceLinks = document.getElementById('resourceLinks');
    const downloadAllBtn = document.getElementById('downloadAllBtn');
    
    if (courseSelection) courseSelection.style.display = 'none';
    if (yearSelection) yearSelection.style.display = 'none';
    if (resourceLinks) resourceLinks.style.display = 'block';
    if (downloadAllBtn) downloadAllBtn.style.display = 'inline-block';
    
    // Update navigation buttons
    const btnBackToCourse = document.getElementById('btnBackToCourse');
    const btnBackToYear = document.getElementById('btnBackToYear');
    if (btnBackToCourse) btnBackToCourse.style.display = 'block';
    if (btnBackToYear) btnBackToYear.style.display = 'block';
    
    // Update title
    const yearNames = {
        'first': 'First Year',
        'second': 'Second Year',
        'third': 'Third Year',
        'fourth': 'Fourth Year'
    };
    
    const modalLinksTitle = document.getElementById('modalLinksTitle');
    const resourceDescription = document.getElementById('resourceDescription');
    
    if (modalLinksTitle) {
        modalLinksTitle.textContent = `${currentCourseName} - ${yearNames[currentYear]} Resources`;
    }
    if (resourceDescription) {
        resourceDescription.textContent = `${currentCourseName}, ${yearNames[currentYear]}`;
    }
    
    // Update breadcrumb
    const breadcrumbYear = document.getElementById('breadcrumbYear');
    if (breadcrumbYear) {
        breadcrumbYear.textContent = yearNames[currentYear];
        breadcrumbYear.classList.add('active');
    }
    
    // Populate resource links
    const resourceFileList = document.getElementById('resourceFileList');
    if (!resourceFileList) return;
    
    resourceFileList.innerHTML = '';
    
    const resources = resourceData[currentResourceType].courses[currentCourseId].years[currentYear];
    
    resources.forEach(resource => {
        const resourceItem = document.createElement('a');
        resourceItem.className = 'd-block resource-item p-3 border-bottom text-decoration-none';
        resourceItem.href = resource.url;
        resourceItem.target = '_blank';
        resourceItem.style.transition = 'background-color 0.3s ease';
        
        // Add hover effect
        resourceItem.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
        });
        
        resourceItem.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
        
        // Determine icon based on file type
        let fileIcon = 'fa-file';
        if (resource.type === 'pdf') fileIcon = 'fa-file-pdf';
        else if (resource.type === 'doc') fileIcon = 'fa-file-word';
        else if (resource.type === 'folder') fileIcon = 'fa-folder';
        
        resourceItem.innerHTML = `
            <div class="d-flex align-items-center">
                <div class="file-icon text-primary me-3">
                    <i class="fas ${fileIcon}"></i>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-0">${resource.name}</h6>
                    <small class="text-muted">${resource.size}</small>
                </div>
                <div class="ms-3">
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
        `;
        
        resourceFileList.appendChild(resourceItem);
    });
    
    // Update download all button
    if (downloadAllBtn && resources.length > 0) {
        downloadAllBtn.href = resources[0].url;
    }
}

// Placeholder for generic modal functionality
// This function will populate the genericModal with content and show it
function showModal(title, content) {
    const genericModal = document.getElementById('genericModal');
    const genericModalLabel = document.getElementById('genericModalLabel');
    const genericModalBody = document.getElementById('genericModalBody');
    
    if (genericModal && genericModalLabel && genericModalBody) {
        const modal = new bootstrap.Modal(genericModal);
        genericModalLabel.textContent = title;
        genericModalBody.innerHTML = `<p>${content}</p>`;
        modal.show();
    }
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
    initResourceModal();
    initLoadingOverlay();
    
    console.log('All features initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}

