// Video player functionality
document.addEventListener('DOMContentLoaded', function() {
    // Main VSL Video Player
    const video = document.getElementById('vslVideo');
    
    // Set initial thumbnail to 3:13 (193 seconds)
    if (video) {
        video.addEventListener('loadedmetadata', function() {
            video.currentTime = 193;
        });
        
        // Reset to beginning when user plays the video
        video.addEventListener('play', function() {
            if (video.currentTime === 193 && !video.hasAttribute('data-played')) {
                video.currentTime = 0;
                video.setAttribute('data-played', 'true');
            }
        });
    }
    
    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.carousel-button-prev');
    const nextButton = document.querySelector('.carousel-button-next');
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    const totalCards = carouselCards.length;
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    
    // Update carousel position
    function updateCarousel() {
        const cardWidth = carouselCards[0].offsetWidth;
        const gap = window.innerWidth <= 768 ? 16 : 32; // 1rem on mobile, 2rem on desktop
        const offset = -currentIndex * (cardWidth + gap);
        carouselTrack.style.transform = `translateX(${offset}px)`;
        
        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextButton.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        nextButton.style.cursor = currentIndex === maxIndex ? 'not-allowed' : 'pointer';
    }
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Next button click
    nextButton.addEventListener('click', function() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const newCardsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                const newMaxIndex = Math.max(0, totalCards - cardsPerView);
                if (currentIndex > newMaxIndex) {
                    currentIndex = newMaxIndex;
                }
                updateCarousel();
            }
        }, 250);
    });
    
    // Initialize carousel
    updateCarousel();
    
    // Form modal functionality
    const ctaButton = document.querySelector('.cta-button');
    const formOverlay = document.getElementById('formOverlay');
    const formClose = document.getElementById('formClose');
    const registrationForm = document.getElementById('registrationForm');
    
    // Open form when CTA button is clicked
    ctaButton.addEventListener('click', function() {
        formOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close form when close button is clicked
    formClose.addEventListener('click', function() {
        formOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close form when clicking outside the form container
    formOverlay.addEventListener('click', function(e) {
        if (e.target === formOverlay) {
            formOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullname: document.getElementById('fullname').value,
            email: document.getElementById('email').value,
            whatsapp: document.getElementById('whatsapp').value
        };
        
        // For now, just log the data and show a success message
        console.log('Form submitted:', formData);
        
        // Show success message (you can customize this)
        alert('Inscrição realizada com sucesso! Você receberá o convite em breve.');
        
        // Reset form and close modal
        registrationForm.reset();
        formOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Format WhatsApp input
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length > 6) {
                value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0,2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
        }
        e.target.value = value;
    });
    
    // Lazy load animation for carousel
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state for carousel container
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.style.opacity = '0';
    carouselContainer.style.transform = 'translateY(30px)';
    carouselContainer.style.transition = 'all 0.6s ease';
    observer.observe(carouselContainer);
});