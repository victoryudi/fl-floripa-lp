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
    
    // Reel videos functionality
    const reelVideos = document.querySelectorAll('.reel-video');
    const reelPlayButtons = document.querySelectorAll('.reel-play-button');
    
    // Load video when src is set
    reelVideos.forEach(video => {
        const dataSrc = video.getAttribute('data-src');
        if (dataSrc) {
            video.src = dataSrc;
            video.classList.add('loaded');
            video.load();
        }
    });
    
    // Play/pause video on click
    reelPlayButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const video = reelVideos[index];
            const overlay = button.closest('.video-overlay');
            
            if (video.src && video.src !== window.location.href) {
                if (video.paused) {
                    // Pause all other videos
                    reelVideos.forEach((v, i) => {
                        if (i !== index && !v.paused) {
                            v.pause();
                            const otherOverlay = reelPlayButtons[i].closest('.video-overlay');
                            otherOverlay.style.opacity = '1';
                        }
                    });
                    
                    video.play();
                    overlay.style.opacity = '0';
                } else {
                    video.pause();
                    overlay.style.opacity = '1';
                }
            } else {
                // No video source set yet
                alert('Video URL will be added soon. This is a placeholder for reel-style video testimonial.');
            }
        });
    });
    
    // Show overlay when video ends
    reelVideos.forEach((video, index) => {
        video.addEventListener('ended', function() {
            const overlay = reelPlayButtons[index].closest('.video-overlay');
            overlay.style.opacity = '1';
        });
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