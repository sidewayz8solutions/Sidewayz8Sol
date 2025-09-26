document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.main-header');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    // Smooth Scrolling for Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }

                // Scroll to section with offset for fixed header
                const headerOffset = header.offsetHeight;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active class
                updateActiveClass(targetId);
            }
        });
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Highlight active nav link on scroll
    const updateActiveClass = (currentId) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentId) {
                link.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateActiveClass(`#${entry.target.id}`);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.id) { // Only observe sections with an ID for navigation
            sectionObserver.observe(section);
        }
    });

    // Initial active link for hero section
    updateActiveClass('#hero');

    // Scroll Reveal for sections
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // When 10% of the item is visible
    });

    scrollRevealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax effect (subtle) for hero content on scroll
    window.addEventListener('scroll', () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            let scrollY = window.pageYOffset;
            heroContent.style.transform = `translateY(calc(-20px + ${scrollY * 0.15}px))`; // Move content slightly up
            // Optional: Header shrink/background change on scroll
            if (scrollY > 50) {
                header.style.backgroundColor = 'rgba(10, 10, 12, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = 'rgba(10, 10, 12, 0.8)';
                header.style.padding = '15px 0';
            }
        }
    });
});