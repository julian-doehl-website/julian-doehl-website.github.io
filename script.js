document.addEventListener('DOMContentLoaded', function() {
    const mainText = document.getElementById('mainText');
    
    mainText.addEventListener('click', function() {
        // Remove any existing animation class
        this.classList.remove('animate');
        
        // Force reflow to restart animation
        void this.offsetWidth;
        
        // Add animation class
        this.classList.add('animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('animate');
        }, 600);
    });
    
    // Add touch support for mobile devices
    mainText.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.98)';
    });
    
    mainText.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = '';
        // Trigger click animation
        this.classList.remove('animate');
        void this.offsetWidth;
        this.classList.add('animate');
        setTimeout(() => {
            this.classList.remove('animate');
        }, 600);
    });
});

