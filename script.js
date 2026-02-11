document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Typing Animation Effect ---
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    
    const textArray = ["Cybersecurity Enthusiast", "VAPT Learner", "Threat Detection Dev"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect on load
    if(textArray.length) setTimeout(type, newTextDelay + 250);


    // --- 2. Scroll Reveal Animation ---
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        let windowHeight = window.innerHeight;
        let elementVisible = 150; // pixels before element becomes visible

        reveals.forEach(reveal => {
            let elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");
            }
        });
    }
    
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load


    // --- 3. Contact Form Submission (Mock) ---
    const contactForm = document.getElementById("contact-form");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // Basic validation check
            const name = document.getElementById('name').value;
            if(name.trim() !== "") {
                alert(`Message sent successfully, ${name}! I will get back to you soon.`);
                contactForm.reset();
            }
        });
    }
});

// --- 4. Modal Functions (Global scope for onclick attributes) ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "block";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside of the content box
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}
// =========================================
// NEW FEATURES EXTENSIONS
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    // --- 5. Dark/Light Mode Toggle Logic ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    
    // Check local storage for saved theme
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        themeIcon.classList.replace("fa-sun", "fa-moon");
    }

    // Toggle theme on click
    themeToggleBtn.addEventListener("click", () => {
        let theme = document.body.getAttribute("data-theme");
        
        if (theme === "light") {
            document.body.removeAttribute("data-theme");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.setAttribute("data-theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }
    });

    // --- 6. Bug Report Form Validation ---
    const bugForm = document.getElementById("bug-form");
    if(bugForm) {
        bugForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const bugName = document.getElementById('bug-name').value;
            const bugIssue = document.getElementById('bug-issue').value;
            
            if(bugName.trim() !== "" && bugIssue.trim() !== "") {
                alert(`Thank you, ${bugName}! Your bug report has been logged. I will investigate it shortly.`);
                bugForm.reset();
                closeModal('bugModal');
            }
        });
    }

    // --- 7. Resume Tabs Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.resume-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes from all buttons and content blocks
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active-content'));

            // Add active class to the clicked button
            btn.classList.add('active');

            // Find the matching content block and show it
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-content');
        });
    });

});