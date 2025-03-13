// Add any JavaScript if needed for interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ashen Maneth\'s portfolio loaded');
    
    // Typing effect for header
    const typingText = document.querySelector('.typing-text');
    const phrases = ['Software Engineer', 'Web Developer', 'Problem Solver', 'Innovation Enthusiast'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isTyping = true;
    
    function type() {
        if (isTyping && charIndex < phrases[phraseIndex].length) {
            typingText.textContent = phrases[phraseIndex].substring(0, charIndex + 1);
            charIndex++;
            setTimeout(type, 100);
        } else if (isTyping && charIndex >= phrases[phraseIndex].length) {
            isTyping = false;
            setTimeout(type, 1500);
        } else if (!isTyping && charIndex > 0) {
            typingText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 50);
        } else if (!isTyping && charIndex === 0) {
            isTyping = true;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        }
    }
    
    type();
    
    // Enhanced intersection observer with staggered animations
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // Stagger the animations slightly for a more dynamic effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    appearOnScroll.unobserve(entry.target);
                }, index * 100);
            }
        });
    }, appearOptions);
    
    fadeElems.forEach(fadeElem => {
        appearOnScroll.observe(fadeElem);
    });
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Add form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally add AJAX to submit the form
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});
