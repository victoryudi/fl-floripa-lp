// Video player functionality
document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.querySelector('.play-button');
    const videoPlayer = document.querySelector('.video-player');
    
    // Play button click handler
    playButton.addEventListener('click', function() {
        // Here you would implement the actual video player
        // For now, we'll just show a placeholder behavior
        alert('Video player would open here. Implement with your preferred video solution (YouTube, Vimeo, or custom player).');
    });
    
    // Smooth scroll for CTA button (if you add form section later)
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // Implement scroll to form or open modal
        alert('Formulário de cadastro seria aberto aqui.');
    });
    
    // Add hover effect to testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Lazy load animation for testimonials
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
    
    // Set initial state for testimonial cards
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});