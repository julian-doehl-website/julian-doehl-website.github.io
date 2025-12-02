document.addEventListener('DOMContentLoaded', function() {
    const mainText = document.getElementById('mainText');
    const termsLink = document.getElementById('termsLink');
    const termsModal = document.getElementById('termsModal');
    const closeModal = document.getElementById('closeModal');
    
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
    
    // Terms and Conditions Modal functionality
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        termsModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    closeModal.addEventListener('click', function() {
        termsModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside the content
    termsModal.addEventListener('click', function(e) {
        if (e.target === termsModal) {
            termsModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && termsModal.classList.contains('active')) {
            termsModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
});

