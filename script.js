// DOM Elements
const darkModeToggle = document.getElementById('darkModeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const animatedText = document.getElementById('animatedText');
const contactForm = document.getElementById('contactForm');
const skillBarsContainer = document.querySelector('.skill-bars');
const projectsGrid = document.querySelector('.projects-grid');

// Text for typewriter animation
const texts = [
    "Python Web Fullstack Developer"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

// ====== DARK MODE FUNCTIONALITY ======
function initDarkMode() {
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ====== TYPEWRITER ANIMATION ======
function typeWriter() {
    const currentText = texts[textIndex];
    
    if (!isPaused) {
        if (!isDeleting && charIndex <= currentText.length) {
            animatedText.textContent = currentText.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && charIndex >= 0) {
            animatedText.textContent = currentText.substring(0, charIndex);
            charIndex--;
            setTimeout(typeWriter, 50);
        } else {
            // Pause at the end of typing
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = !isDeleting;
                
                if (!isDeleting) {
                    textIndex = (textIndex + 1) % texts.length;
                }
                
                setTimeout(typeWriter, 500);
            }, 1500);
        }
    }
}

// ====== NAVIGATION FUNCTIONALITY ======
function initNavigation() {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ====== SKILLS DATA AND RENDERING ======
const skillsData = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "JavaScript", percentage: 90 },
    { name: "React", percentage: 88 },
    { name: "Python", percentage: 85 },
    { name: "Django", percentage: 82 },
    { name: "MySQL", percentage: 80 }
];

function renderSkillBars() {
    skillBarsContainer.innerHTML = skillsData.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" data-percent="${skill.percentage}"></div>
            </div>
        </div>
    `).join('');
}

// ====== PROJECTS DATA AND RENDERING ======
const projectsData = [
    {
        title: "Bus-Ticket Booking",
        description: "A Bus Ticket Booking System is an online platform that allows users to search for buses, check routes, view seat availability, compare fares, and book tickets easily.",
        technologies: ["React", "Django Rest api", "MySQL"],
        image: "https://www.shutterstock.com/image-vector/bus-ticket-online-pay-smart-600nw-2595978685.jpg",
        demoUrl: "demo.mp4",              
        githubUrl: "https://github.com/Vasu-4795-cmd/Bus_Ticket_Booking_Fullstack-Project1"
    },
    {
        title: "BMI (Body Mass Index)App",
        description: "A BMI App helps users calculate their BMI by entering their height and weight. The app instantly displays the BMI value along with the corresponding health category such as underweight, normal weight, overweight, or obese.",
        technologies: ["Node.js", "Html/Css", "JavaScript"],
        image: "https://gymitfitness.com/storage/2024/02/Over-35.png",
        demoUrl: "#",              // ✅ different URL
        githubUrl: "https://github.com/Vasu-4795-cmd/BMI-flask"
    },
    {
        title: "Travel Blog",
        description: "A responsive blog website for travel enthusiasts with photo galleries, user comments, and location mapping.",
        technologies: ["Next.js", "GraphQL", "Mapbox"],
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        demoUrl: "#",              // ✅ different URL
        githubUrl: "#"
    }
];



function renderProjects() {
    projectsGrid.innerHTML = projectsData.map(project => `
        <div class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-img">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" class="btn btn-primary">Live Demo</a>
                    <a href="${project.githubUrl}" class="btn btn-secondary">GitHub</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ====== ANIMATE SKILL BARS ON SCROLL ======
function animateSkillBars() {
    const skillProgresses = document.querySelectorAll('.skill-progress');
    const skillCircles = document.querySelectorAll('.skill-circle');
    
    skillProgresses.forEach(progress => {
        const percent = progress.getAttribute('data-percent');
        progress.style.width = `${percent}%`;
    });
    
    skillCircles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        circle.style.background = `conic-gradient(var(--primary-color) 0% ${percent}%, #eee ${percent}% 100%)`;
    });
}

// ====== FORM HANDLING ======
function initForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('name') || this.querySelector('input[type="text"]').value;
        const email = formData.get('email') || this.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || this.querySelector('input[placeholder="Subject"]').value;
        const message = formData.get('message') || this.querySelector('textarea').value;
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you ${name}! Your message has been sent. I'll get back to you soon at ${email}.`);
        
        // Reset form
        this.reset();
    });
}

// ====== OBSERVER FOR ANIMATIONS ======
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Add animation class to section
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

function sendEmail() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const subject = encodeURIComponent("New Contact Message");
    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    window.location.href =
        `mailto:vasuperugu6@gmail.com?subject=${subject}&body=${body}`;
}


// ====== INITIALIZE EVERYTHING ======
function init() {
    initDarkMode();
    initNavigation();
    initForm();
    initIntersectionObserver();
    
    // Start typewriter animation
    setTimeout(typeWriter, 1000);
    
    // Render dynamic content
    renderSkillBars();
    renderProjects();
    
    // Animate skill bars when page loads if already in view
    setTimeout(animateSkillBars, 500);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Additional window load effects
window.addEventListener('load', () => {
    // Add fade-in effect to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});