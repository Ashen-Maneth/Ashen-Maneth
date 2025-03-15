// Add this to the top of your script.js
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        // Remove the loader from DOM after transition completes
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 500);
});

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
    
    // Email contact form functionality
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading spinner
            submitBtn.querySelector('span:first-child').style.display = 'none';
            loadingSpinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Check if emailjs is available
            if (typeof emailjs === 'undefined') {
                console.error('EmailJS is not loaded');
                alert('Sorry, the email service is currently unavailable. Please try again later or contact me directly at manethpamuditha23b@gmail.com');
                
                // Restore button state
                submitBtn.querySelector('span:first-child').style.display = 'inline-block';
                loadingSpinner.style.display = 'none';
                submitBtn.disabled = false;
                return;
            }
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_name: "Ashen Maneth",
                reply_to: email
            };
            
            // Send email using EmailJS with better error handling
            emailjs.send('service_pmo8i84', 'template_n0riclk', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Hide form, show success message
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Reset form and button state
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.querySelector('span:first-child').style.display = 'inline-block';
                    loadingSpinner.style.display = 'none';
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // Show detailed error message for debugging
                    alert('Error sending message: ' + (error.text || 'Unknown error'));
                    
                    // Restore button state
                    submitBtn.querySelector('span:first-child').style.display = 'inline-block';
                    loadingSpinner.style.display = 'none';
                    submitBtn.disabled = false;
                });
        });

        

    }

    // Interactive skills radar chart
    const ctx = document.getElementById('skillsRadar');
    
    if (ctx) {
        // Load Chart.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            const radarChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: [
                        'Frontend', 'Backend', 'Mobile',
                        'Databases', 'UI/UX', 'Problem Solving'
                    ],
                    datasets: [{
                        label: 'Skills',
                        data: [85, 80, 65, 80, 75, 90],
                        backgroundColor: 'rgba(108, 99, 255, 0.2)',
                        borderColor: 'rgba(0, 247, 255, 0.8)',
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#00f7ff',
                        pointHoverBackgroundColor: '#ffffff',
                        pointHoverBorderColor: '#00f7ff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: 1.2, // More compact ratio (default is usually 2)
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            titleFont: {
                                size: 12
                            },
                            bodyFont: {
                                size: 11
                            }
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                display: false
                            },
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            angleLines: {
                                color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                                color: '#e6e6e6',
                                font: {
                                    family: "'Poppins', sans-serif",
                                    size: 12 // Reduced from 14
                                }
                            }
                        }
                    }
                }
            });
        };
        document.body.appendChild(script);
    }


});
