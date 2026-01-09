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
const texts = ["Python Web Fullstack Developer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

// ====== DARK MODE ======
function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

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

// ====== TYPEWRITER ======
function typeWriter() {
    const currentText = texts[textIndex];

    if (!isPaused) {
        if (!isDeleting && charIndex <= currentText.length) {
            animatedText.textContent = currentText.substring(0, charIndex++);
            setTimeout(typeWriter, 50);
        } else if (isDeleting && charIndex >= 0) {
            animatedText.textContent = currentText.substring(0, charIndex--);
            setTimeout(typeWriter, 25);
        } else {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = !isDeleting;
                setTimeout(typeWriter, 200);
            }, 0);
        }
    }
}

// ====== NAVIGATION ======
function initNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ====== SKILLS ======
const skillsData = [
    { name: "HTML/CSS", percentage: 95 },
    { name: "JavaScript", percentage: 90 },
    { name: "React", percentage: 88 },
    { name: "Python", percentage: 85 },
    { name: "Django", percentage: 82 },
    { name: "MySQL", percentage: 90 }
];

function renderSkillBars() {
    skillBarsContainer.innerHTML = skillsData.map(skill => `
        <div class="skill-item">
            <span>${skill.name}</span>
            <div class="skill-bar">
                <div class="skill-progress" style="width:${skill.percentage}%"></div>
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
        technologies: ["flask", "Html/Css", "JavaScript"],
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


// ====== EMAIL FORM (FIXED) ======
function initForm() {
    if (!contactForm) return;

    emailjs.init("Y-F533lBBrUQHF5L8"); // ✅ Public Key

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_tbtytl6",   // Service ID
            "template_xb94ay8",  // Template ID
            contactForm
        ).then(
            () => {
                alert("Message sent successfully!");
                contactForm.reset();
            },
            (error) => {
                alert("Failed to send message: " + error.text);
            }
        );
    });
}

// ====== OBSERVER ======
function initIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// ====== INIT ======
function init() {
    initDarkMode();
    initNavigation();
    initForm();
    initIntersectionObserver();
    renderSkillBars();
    renderProjects();
    setTimeout(typeWriter, 1000);
}

document.addEventListener('DOMContentLoaded', init);
