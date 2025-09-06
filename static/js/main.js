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

// Resource data (in a real application, this would come from a database or API)
const resourceData = {
    'course-materials': {
        title: 'Course Materials',
        courses: {
            'mathematics': {
                name: 'Mathematics',
                years: {
                    first: [
                        { name: 'Mathematics 101 Notes', type: 'pdf', size: '2.4 MB', url: 'https://drive.google.com/drive/folders/math101-1st' },
                        { name: 'Calculus Fundamentals', type: 'pdf', size: '3.1 MB', url: 'https://drive.google.com/drive/folders/calculus-1st' }
                    ],
                    second: [
                        { name: 'Advanced Calculus', type: 'pdf', size: '4.2 MB', url: 'https://drive.google.com/drive/folders/adv-calculus-2nd' },
                        { name: 'Linear Algebra', type: 'pdf', size: '3.8 MB', url: 'https://drive.google.com/drive/folders/linear-algebra-2nd' }
                    ],
                    third: [
                        { name: 'Differential Equations', type: 'pdf', size: '5.3 MB', url: 'https://drive.google.com/drive/folders/diff-eq-3rd' },
                        { name: 'Numerical Methods', type: 'pdf', size: '4.7 MB', url: 'https://drive.google.com/drive/folders/num-methods-3rd' }
                    ]
                }
            },
            'physics': {
                name: 'Physics',
                years: {
                    first: [
                        { name: 'Physics 101 Notes', type: 'pdf', size: '2.8 MB', url: 'https://drive.google.com/drive/folders/physics101-1st' },
                        { name: 'Mechanics Fundamentals', type: 'pdf', size: '3.5 MB', url: 'https://drive.google.com/drive/folders/mechanics-1st' }
                    ],
                    second: [
                        { name: 'Electromagnetism', type: 'pdf', size: '4.5 MB', url: 'https://drive.google.com/drive/folders/electromagnetism-2nd' },
                        { name: 'Thermodynamics', type: 'pdf', size: '3.9 MB', url: 'https://drive.google.com/drive/folders/thermodynamics-2nd' }
                    ],
                    third: [
                        { name: 'Quantum Mechanics', type: 'pdf', size: '5.7 MB', url: 'https://drive.google.com/drive/folders/quantum-3rd' },
                        { name: 'Solid State Physics', type: 'pdf', size: '4.8 MB', url: 'https://drive.google.com/drive/folders/solid-state-3rd' }
                    ]
                }
            },
            'programming': {
                name: 'Programming',
                years: {
                    first: [
                        { name: 'Introduction to Programming', type: 'pdf', size: '2.1 MB', url: 'https://drive.google.com/drive/folders/intro-prog-1st' },
                        { name: 'Python Basics', type: 'pdf', size: '2.5 MB', url: 'https://drive.google.com/drive/folders/python-1st' }
                    ],
                    second: [
                        { name: 'Data Structures', type: 'pdf', size: '3.8 MB', url: 'https://drive.google.com/drive/folders/data-structures-2nd' },
                        { name: 'Algorithms', type: 'pdf', size: '4.2 MB', url: 'https://drive.google.com/drive/folders/algorithms-2nd' }
                    ],
                    third: [
                        { name: 'Software Engineering', type: 'pdf', size: '5.1 MB', url: 'https://drive.google.com/drive/folders/software-eng-3rd' },
                        { name: 'Advanced Programming', type: 'pdf', size: '4.5 MB', url: 'https://drive.google.com/drive/folders/adv-prog-3rd' }
                    ]
                }
            }
        }
    },
    'past-exams': {
        title: 'Past Exams',
        courses: {
            'mathematics': {
                name: 'Mathematics',
                years: {
                    first: [
                        { name: 'Mathematics 101 - 2022', type: 'pdf', size: '1.2 MB', url: 'https://drive.google.com/drive/folders/math101-exam-2022' },
                        { name: 'Mathematics 101 - 2021', type: 'pdf', size: '1.3 MB', url: 'https://drive.google.com/drive/folders/math101-exam-2021' }
                    ],
                    second: [
                        { name: 'Advanced Calculus - 2022', type: 'pdf', size: '1.8 MB', url: 'https://drive.google.com/drive/folders/adv-calc-exam-2022' },
                        { name: 'Linear Algebra - 2021', type: 'pdf', size: '1.5 MB', url: 'https://drive.google.com/drive/folders/linear-alg-exam-2021' }
                    ],
                    third: [
                        { name: 'Differential Equations - 2022', type: 'pdf', size: '2.3 MB', url: 'https://drive.google.com/drive/folders/diff-eq-exam-2022' },
                        { name: 'Numerical Methods - 2021', type: 'pdf', size: '2.1 MB', url: 'https://drive.google.com/drive/folders/num-methods-exam-2021' }
                    ]
                }
            },
            'physics': {
                name: 'Physics',
                years: {
                    first: [
                        { name: 'Physics 101 - 2022', type: 'pdf', size: '1.4 MB', url: 'https://drive.google.com/drive/folders/physics101-exam-2022' },
                        { name: 'Physics 101 - 2021', type: 'pdf', size: '1.3 MB', url: 'https://drive.google.com/drive/folders/physics101-exam-2021' }
                    ],
                    second: [
                        { name: 'Electromagnetism - 2022', type: 'pdf', size: '1.9 MB', url: 'https://drive.google.com/drive/folders/electromag-exam-2022' },
                        { name: 'Thermodynamics - 2021', type: 'pdf', size: '1.7 MB', url: 'https://drive.google.com/drive/folders/thermo-exam-2021' }
                    ],
                    third: [
                        { name: 'Quantum Mechanics - 2022', type: 'pdf', size: '2.5 MB', url: 'https://drive.google.com/drive/folders/quantum-exam-2022' },
                        { name: 'Solid State Physics - 2021', type: 'pdf', size: '2.3 MB', url: 'https://drive.google.com/drive/folders/solid-state-exam-2021' }
                    ]
                }
            },
            'programming': {
                name: 'Programming',
                years: {
                    first: [
                        { name: 'Programming 101 - 2022', type: 'pdf', size: '1.1 MB', url: 'https://drive.google.com/drive/folders/prog101-exam-2022' },
                        { name: 'Programming 101 - 2021', type: 'pdf', size: '1.2 MB', url: 'https://drive.google.com/drive/folders/prog101-exam-2021' }
                    ],
                    second: [
                        { name: 'Data Structures - 2022', type: 'pdf', size: '1.6 MB', url: 'https://drive.google.com/drive/folders/data-struct-exam-2022' },
                        { name: 'Algorithms - 2021', type: 'pdf', size: '1.5 MB', url: 'https://drive.google.com/drive/folders/algorithms-exam-2021' }
                    ],
                    third: [
                        { name: 'Software Engineering - 2022', type: 'pdf', size: '2.2 MB', url: 'https://drive.google.com/drive/folders/software-eng-exam-2022' },
                        { name: 'Advanced Programming - 2021', type: 'pdf', size: '2.0 MB', url: 'https://drive.google.com/drive/folders/adv-prog-exam-2021' }
                    ]
                }
            }
        }
    },
    'software-tools': {
        title: 'Software Tools',
        courses: {
            'matlab': {
                name: 'MATLAB',
                years: {
                    first: [
                        { name: 'MATLAB Student License', type: 'external', size: 'N/A', url: 'https://mathworks.com' },
                        { name: 'MATLAB Basics Tutorial', type: 'pdf', size: '2.8 MB', url: 'https://drive.google.com/drive/folders/matlab-basics' }
                    ],
                    second: [
                        { name: 'MATLAB Advanced Functions', type: 'pdf', size: '3.5 MB', url: 'https://drive.google.com/drive/folders/matlab-advanced' },
                        { name: 'MATLAB for Engineering', type: 'pdf', size: '4.2 MB', url: 'https://drive.google.com/drive/folders/matlab-engineering' }
                    ],
                    third: [
                        { name: 'MATLAB Simulink Guide', type: 'pdf', size: '5.1 MB', url: 'https://drive.google.com/drive/folders/matlab-simulink' },
                        { name: 'MATLAB for Research', type: 'pdf', size: '4.8 MB', url: 'https://drive.google.com/drive/folders/matlab-research' }
                    ]
                }
            },
            'cad': {
                name: 'CAD Software',
                years: {
                    first: [
                        { name: 'CAD Basics Tutorial', type: 'pdf', size: '3.2 MB', url: 'https://drive.google.com/drive/folders/cad-basics' },
                        { name: '2D Drawing Fundamentals', type: 'pdf', size: '2.9 MB', url: 'https://drive.google.com/drive/folders/2d-drawing' }
                    ],
                    second: [
                        { name: '3D Modeling Guide', type: 'pdf', size: '4.5 MB', url: 'https://drive.google.com/drive/folders/3d-modeling' },
                        { name: 'CAD for Electrical Engineering', type: 'pdf', size: '4.1 MB', url: 'https://drive.google.com/drive/folders/cad-electrical' }
                    ],
                    third: [
                        { name: 'Advanced CAD Techniques', type: 'pdf', size: '5.3 MB', url: 'https://drive.google.com/drive/folders/adv-cad' },
                        { name: 'CAD Project Examples', type: 'pdf', size: '6.2 MB', url: 'https://drive.google.com/drive/folders/cad-projects' }
                    ]
                }
            },
            'programming-ide': {
                name: 'Programming IDEs',
                years: {
                    first: [
                        { name: 'VS Code Setup Guide', type: 'pdf', size: '2.1 MB', url: 'https://drive.google.com/drive/folders/vscode-setup' },
                        { name: 'Python IDE Comparison', type: 'pdf', size: '1.8 MB', url: 'https://drive.google.com/drive/folders/ide-comparison' }
                    ],
                    second: [
                        { name: 'Advanced VS Code Features', type: 'pdf', size: '3.2 MB', url: 'https://drive.google.com/drive/folders/adv-vscode' },
                        { name: 'Debugging Techniques', type: 'pdf', size: '2.9 MB', url: 'https://drive.google.com/drive/folders/debugging' }
                    ],
                    third: [
                        { name: 'Professional Development Setup', type: 'pdf', size: '4.5 MB', url: 'https://drive.google.com/drive/folders/pro-dev-setup' },
                        { name: 'Team Collaboration Tools', type: 'pdf', size: '3.8 MB', url: 'https://drive.google.com/drive/folders/collab-tools' }
                    ]
                }
            }
        }
    },
    'career-center': {
        title: 'Career Center',
        courses: {
            'resume': {
                name: 'Resume Building',
                years: {
                    first: [
                        { name: 'Resume Template - Entry Level', type: 'doc', size: '0.3 MB', url: 'https://drive.google.com/drive/folders/resume-template-entry' },
                        { name: 'Resume Writing Guide', type: 'pdf', size: '1.2 MB', url: 'https://drive.google.com/drive/folders/resume-guide' }
                    ],
                    second: [
                        { name: 'Technical Resume Examples', type: 'pdf', size: '1.8 MB', url: 'https://drive.google.com/drive/folders/technical-resumes' },
                        { name: 'Achievement Statements Guide', type: 'pdf', size: '1.5 MB', url: 'https://drive.google.com/drive/folders/achievement-statements' }
                    ],
                    third: [
                        { name: 'Senior Year Resume Template', type: 'doc', size: '0.4 MB', url: 'https://drive.google.com/drive/folders/senior-resume' },
                        { name: 'Industry-Specific Resumes', type: 'pdf', size: '2.3 MB', url: 'https://drive.google.com/drive/folders/industry-resumes' }
                    ]
                }
            },
            'interview': {
                name: 'Interview Preparation',
                years: {
                    first: [
                        { name: 'Basic Interview Questions', type: 'pdf', size: '1.1 MB', url: 'https://drive.google.com/drive/folders/basic-interview' },
                        { name: 'Interview Etiquette Guide', type: 'pdf', size: '1.3 MB', url: 'https://drive.google.com/drive/folders/interview-etiquette' }
                    ],
                    second: [
                        { name: 'Technical Interview Questions', type: 'pdf', size: '2.2 MB', url: 'https://drive.google.com/drive/folders/technical-interview' },
                        { name: 'Behavioral Interview Guide', type: 'pdf', size: '1.9 MB', url: 'https://drive.google.com/drive/folders/behavioral-interview' }
                    ],
                    third: [
                        { name: 'Advanced Interview Techniques', type: 'pdf', size: '2.8 MB', url: 'https://drive.google.com/drive/folders/adv-interview' },
                        { name: 'Industry Panel Questions', type: 'pdf', size: '2.5 MB', url: 'https://drive.google.com/drive/folders/panel-questions' }
                    ]
                }
            },
            'internship': {
                name: 'Internship Search',
                years: {
                    first: [
                        { name: 'Finding First Internship', type: 'pdf', size: '1.5 MB', url: 'https://drive.google.com/drive/folders/first-internship' },
                        { name: 'Internship Application Timeline', type: 'pdf', size: '1.2 MB', url: 'https://drive.google.com/drive/folders/internship-timeline' }
                    ],
                    second: [
                        { name: 'Technical Internship Guide', type: 'pdf', size: '2.3 MB', url: 'https://drive.google.com/drive/folders/technical-internship' },
                        { name: 'Company Research Methods', type: 'pdf', size: '1.8 MB', url: 'https://drive.google.com/drive/folders/company-research' }
                    ],
                    third: [
                        { name: 'Senior Internship Strategies', type: 'pdf', size: '2.7 MB', url: 'https://drive.google.com/drive/folders/senior-internship' },
                        { name: 'Converting Internship to Job', type: 'pdf', size: '2.1 MB', url: 'https://drive.google.com/drive/folders/internship-to-job' }
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
        document.getElementById('breadcrumbResourceType').textContent = resourceData[currentResourceType].title;
        document.getElementById('breadcrumbCourse').classList.remove('active');
        document.getElementById('breadcrumbYear').classList.remove('active');
    });
    
    // Back to course button
    document.getElementById('btnBackToCourse').addEventListener('click', showCourseSelection);
    
    // Back to year button
    document.getElementById('btnBackToYear').addEventListener('click', showYearSelection);
    
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
    document.getElementById('yearSelection').style.display = 'none';
    document.getElementById('resourceLinks').style.display = 'none';
    document.getElementById('downloadAllBtn').style.display = 'none';
    
    // Show course selection
    document.getElementById('courseSelection').style.display = 'block';
    
    // Update navigation buttons
    document.getElementById('btnBackToCourse').style.display = 'none';
    document.getElementById('btnBackToYear').style.display = 'none';
    
    // Update title
    document.getElementById('modalResourceTitle').textContent = `Select a Course - ${resourceData[currentResourceType].title}`;
    
    // Populate courses
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    
    for (const [courseId, course] of Object.entries(resourceData[currentResourceType].courses)) {
        const courseCol = document.createElement('div');
        courseCol.className = 'col-md-4';
        
        const courseBtn = document.createElement('div');
        courseBtn.className = 'course-btn';
        courseBtn.setAttribute('data-course', courseId);
        
        // Add icon based on course
        let iconClass = 'fas fa-book';
        if (courseId.includes('math')) iconClass = 'fas fa-calculator';
        if (courseId.includes('physics')) iconClass = 'fas fa-atom';
        if (courseId.includes('programming')) iconClass = 'fas fa-code';
        if (courseId.includes('matlab')) iconClass = 'fas fa-project-diagram';
        if (courseId.includes('cad')) iconClass = 'fas fa-drafting-compass';
        if (courseId.includes('resume')) iconClass = 'fas fa-file-alt';
        if (courseId.includes('interview')) iconClass = 'fas fa-comments';
        if (courseId.includes('internship')) iconClass = 'fas fa-briefcase';
        
        courseBtn.innerHTML = `
            <i class="${iconClass}"></i>
            ${course.name}
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
    document.getElementById('breadcrumbCourse').classList.remove('active');
    document.getElementById('breadcrumbYear').classList.remove('active');
    document.getElementById('breadcrumbResourceType').classList.add('active');
}

// Show year selection view
function showYearSelection() {
    // Hide other views
    document.getElementById('courseSelection').style.display = 'none';
    document.getElementById('resourceLinks').style.display = 'none';
    
    // Show year selection
    document.getElementById('yearSelection').style.display = 'block';
    
    // Update navigation buttons
    document.getElementById('btnBackToCourse').style.display = 'block';
    document.getElementById('btnBackToYear').style.display = 'none';
    
    // Update title
    document.getElementById('modalYearTitle').textContent = `Select Academic Year - ${currentCourseName}`;
    document.getElementById('selectedCourseName').textContent = currentCourseName;
    
    // Update breadcrumb
    document.getElementById('breadcrumbCourse').textContent = currentCourseName;
    document.getElementById('breadcrumbCourse').classList.add('active');
    document.getElementById('breadcrumbYear').classList.remove('active');
}

// Show resource links view
function showResourceLinks() {
    // Hide other views
    document.getElementById('courseSelection').style.display = 'none';
    document.getElementById('yearSelection').style.display = 'none';
    
    // Show resource links
    document.getElementById('resourceLinks').style.display = 'block';
    document.getElementById('downloadAllBtn').style.display = 'inline-block';
    
    // Update navigation buttons
    document.getElementById('btnBackToCourse').style.display = 'block';
    document.getElementById('btnBackToYear').style.display = 'block';
    
    // Update title
    const yearNames = {
        'first': 'First Year',
        'second': 'Second Year',
        'third': 'Third Year'
    };
    
    document.getElementById('modalLinksTitle').textContent = `${currentCourseName} - ${yearNames[currentYear]} Resources`;
    document.getElementById('resourceDescription').textContent = `${currentCourseName}, ${yearNames[currentYear]}`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbYear').textContent = yearNames[currentYear];
    document.getElementById('breadcrumbYear').classList.add('active');
    
    // Populate resource links
    const resourceFileList = document.getElementById('resourceFileList');
    resourceFileList.innerHTML = '';
    
    const resources = resourceData[currentResourceType].courses[currentCourseId].years[currentYear];
    
    resources.forEach(resource => {
        const resourceItem = document.createElement('a');
        resourceItem.className = 'd-block resource-item p-3 border-bottom';
        resourceItem.href = resource.url;
        resourceItem.target = '_blank';
        
        // Determine icon based on file type
        let fileIcon = 'fa-file';
        if (resource.type === 'pdf') fileIcon = 'fa-file-pdf';
        else if (resource.type === 'doc') fileIcon = 'fa-file-word';
        else if (resource.type === 'ppt') fileIcon = 'fa-file-powerpoint';
        else if (resource.type === 'external') fileIcon = 'fa-external-link-alt';
        
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
    document.getElementById('downloadAllBtn').href = `https://drive.google.com/drive/folders/${currentResourceType}-${currentCourseId}-${currentYear}`;
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