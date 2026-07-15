// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("active");
    if (nav.classList.contains("active")) {
        menu.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    } else {
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
});

// ===============================
// CLOSE MENU AFTER CLICK
// ===============================

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", () => {
        nav.classList.remove("active");
        menu.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ===============================
// STICKY HEADER
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(255,255,255,.95)";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.12)";
    } else {
        header.style.background = "rgba(255,255,255,.85)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
    }
});

// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ===============================
// SCROLL REVEAL
// ===============================

const revealElements = document.querySelectorAll(
".hero,.about-container,.skill,.project,.certificate,.resume,.contact"
);

function reveal() {
    revealElements.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 120) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
}

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .8s ease";
});
window.addEventListener("scroll", reveal);

reveal();

// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// HERO TYPING EFFECT
// ===============================

const title = document.querySelector(".hero-text h3");
const roles = [
    "Network Engineer",
    "CCNA Learner",
    "Cisco Packet Tracer Expert"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typingEffect() {
    const currentRole = roles[roleIndex];
    if (!deleting) {
        title.textContent = currentRole.substring(0, charIndex++);
        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(typingEffect, 1500);
            return;
        }
    } else {
        title.textContent = currentRole.substring(0, charIndex--);
        if (charIndex === 0) {
            deleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
        }
    }
    setTimeout(typingEffect, deleting ? 60 : 120);
}
typingEffect();

// ===============================
// CURRENT YEAR
// ===============================

const footerYear = document.querySelector("footer h3");
if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Purushothaman Palanivel`;
}