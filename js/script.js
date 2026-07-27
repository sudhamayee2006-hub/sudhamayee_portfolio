// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        const href = this.getAttribute("href");

        if(href === "#") return;

        e.preventDefault();

        const target=document.querySelector(href);

        if(target){
            target.scrollIntoView({
                behavior:"smooth"
            });
        }

    });

});
/* ===========================
   SCROLL TO TOP BUTTON
=========================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
/* ===========================
   TYPING EFFECT
=========================== */

const words = [
    "Graphic Designer",
    "Photoshop Expert",
    "Canva Designer",
    "Brand Identity Designer",
    "Social Media Designer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    if(!typing) return;

    let current = words[wordIndex];

    if(!deleting){

        typing.textContent = current.substring(0,charIndex++);

        if(charIndex > current.length){

            deleting = true;

            setTimeout(typeEffect,1500);

            return;
        }

    }else{

        typing.textContent = current.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            wordIndex++;

            if(wordIndex >= words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,deleting ? 60 : 100);

}

typeEffect();
/*==========================
     DARK MODE
===========================*/

const themeBtn = document.getElementById("themeToggle");

if(themeBtn){

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("light-mode");

const icon=themeBtn.querySelector("i");

if(document.body.classList.contains("light-mode")){

icon.classList.remove("fa-moon");
icon.classList.add("fa-sun");

}else{

icon.classList.remove("fa-sun");
icon.classList.add("fa-moon");

}

});

}
/* ===========================
   MOBILE MENU
=========================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if(menuBtn && navLinks){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}
/* ===========================
   SCROLL REVEAL
=========================== */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

    reveals.forEach(section=>{

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();
/* ===========================
   LOADER
=========================== */

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

setTimeout(()=>{

loader.classList.add("hide");

},1200);

}

});
/* =======================
   LIGHTBOX
======================= */

const images = document.querySelectorAll(".project-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeLightbox");

if (lightbox && lightboxImg && closeBtn) {

    images.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

}
/* ===========================
   PROJECT FILTER
=========================== */

const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        // Active button
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        projectCards.forEach(card => {

            const category = card.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
/* ===========================
   PROJECT SEARCH
=========================== */

const searchInput = document.getElementById("searchProject");

if(searchInput){

    searchInput.addEventListener("keyup",()=>{

        const value = searchInput.value.toLowerCase();

        document.querySelectorAll(".project-card").forEach(card=>{

            const title = card.querySelector("h3").textContent.toLowerCase();

            if(title.includes(value)){
                card.style.display="block";
            }else{
                card.style.display="none";
            }

        });

    });

}
/* ==========================================
   EMAILJS CONTACT FORM
========================================== */

emailjs.init({
    publicKey: "NGChjZHS35XlP9nFM",
});

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        emailjs.sendForm(
            "service_y1ryufx",
            "template_15l84we",
            this
        )
        .then(() => {

            alert("✅ Message Sent Successfully!");
            this.reset();

        })
        .catch((error) => {

            console.error(error);
            alert("❌ Failed to send message!");

        });

    });

}
/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#navLinks a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   CREATIVE HIGHLIGHTS COUNTER
========================================== */

const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const section = document.querySelector(".highlights");

    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 120) {

        counterStarted = true;

        counters.forEach(counter => {

            const target = +counter.getAttribute("data-target");

            let count = 0;

            const increment = Math.ceil(target / 60);

            const updateCounter = () => {

                count += increment;

                if (count >= target) {

                    counter.textContent = target;

                } else {

                    counter.textContent = count;

                    requestAnimationFrame(updateCounter);

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);
