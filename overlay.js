document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('santaContainer');
    const overlayContainer = document.querySelector('.overlay-container');
    const messageContainer = document.querySelector('.message-container');
    const buttonContainer = document.querySelector('.button-container');
    const santas = [];
    let visibleCount = 1; // Start with 1 visible Santa
    const totalSantas = 100;
    
    // Get container dimensions
    let containerWidth = container.offsetWidth;
    let containerHeight = container.offsetHeight;
    
    // Function to create a bouncing Santa
    function createSanta(index) {
        const santa = document.createElement('img');
        santa.src = 'santa.gif';
        santa.alt = 'Santa';
        santa.className = 'bouncing-santa';
        // First Santa (index 0) starts visible, rest are transparent
        santa.style.opacity = index === 0 ? '1' : '0';
        container.appendChild(santa);
        
        // Wait for image to load to get dimensions
        santa.onload = function() {
            const santaWidth = santa.offsetWidth;
            const santaHeight = santa.offsetHeight;
            
            // Initial position (random)
            let x = Math.random() * (containerWidth - santaWidth);
            let y = Math.random() * (containerHeight - santaHeight);
            
            // Velocity (speed and direction)
            let vx = (Math.random() - 0.5) * 4 + 2;
            let vy = (Math.random() - 0.5) * 4 + 2;
            
            // Make sure Santa moves in a visible direction
            if (Math.abs(vx) < 1) vx = vx > 0 ? 2 : -2;
            if (Math.abs(vy) < 1) vy = vy > 0 ? 2 : -2;
            
            const santaData = {
                element: santa,
                x: x,
                y: y,
                vx: vx,
                vy: vy,
                width: santaWidth,
                height: santaHeight,
                visible: index === 0, // First Santa is visible
                index: index
            };
            
            santas.push(santaData);
            
            // Start animation for this Santa
            function animate() {
                // Update position
                santaData.x += santaData.vx;
                santaData.y += santaData.vy;
                
                // Bounce off walls
                if (santaData.x <= 0 || santaData.x >= containerWidth - santaData.width) {
                    santaData.vx = -santaData.vx;
                    santaData.x = Math.max(0, Math.min(santaData.x, containerWidth - santaData.width));
                }
                
                if (santaData.y <= 0 || santaData.y >= containerHeight - santaData.height) {
                    santaData.vy = -santaData.vy;
                    santaData.y = Math.max(0, Math.min(santaData.y, containerHeight - santaData.height));
                }
                
                // Apply position
                santa.style.left = santaData.x + 'px';
                santa.style.top = santaData.y + 'px';
                
                // Continue animation
                requestAnimationFrame(animate);
            }
            
            animate();
        };
    }
    
    // Create all 20 Santas initially (all transparent)
    for (let i = 0; i < totalSantas; i++) {
        createSanta(i);
    }
    
    // Function to make the next Santa visible
    function showNextSanta() {
        if (visibleCount < totalSantas) {
            const santaData = santas[visibleCount];
            if (santaData && santaData.element) {
                santaData.visible = true;
                santaData.element.style.opacity = '1';
                santaData.element.style.transition = 'opacity 0.5s ease-in';
                visibleCount++;
            }
        }
    }
    
    // Handle clicks anywhere on the overlay to reveal Santas
    overlayContainer.addEventListener('click', function(e) {
        // Don't reveal Santa if clicking on the message container, button container, or the link itself
        if (e.target === messageContainer || 
            e.target === buttonContainer || 
            e.target.closest('.message-container') || 
            e.target.closest('.button-container') ||
            e.target.closest('.click-link')) {
            return; // Let the link work normally
        }
        
        // Make the next Santa visible
        showNextSanta();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        
        // Update container dimensions
        containerWidth = newWidth;
        containerHeight = newHeight;
        
        // Adjust all Santa positions if out of bounds
        santas.forEach(santaData => {
            santaData.x = Math.min(santaData.x, newWidth - santaData.width);
            santaData.y = Math.min(santaData.y, newHeight - santaData.height);
        });
    });
});

