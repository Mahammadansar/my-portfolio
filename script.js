// Custom Cursor
const cursor = document.getElementById("cursor");
const cursorBlur = document.getElementById("cursor-blur");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    
    // Slight delay for the blur effect
    setTimeout(() => {
        cursorBlur.style.left = e.clientX + "px";
        cursorBlur.style.top = e.clientY + "px";
    }, 50);
});

// Cursor shape changing on hovers
const links = document.querySelectorAll("a, .btn, .glass-card");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursor.style.border = "1px solid var(--primary)";
        cursor.style.backgroundColor = "transparent";
    });
    
    link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.border = "none";
        cursor.style.backgroundColor = "var(--primary)";
    });
});

// Update Navbar on Scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Scroll Reveal with Intersection Observer API
const revealElements = document.querySelectorAll("[data-reveal]");

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Trigger reveals elements that are in view on page load
setTimeout(() => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add("active");
        }
    });
}, 100);

// Active link switching based on scroll position
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
