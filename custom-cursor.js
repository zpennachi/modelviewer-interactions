document.addEventListener('DOMContentLoaded', function () {
    const mvAnimationViewer = document.querySelector('#hover-trigger');
    let animationAllowed = true; // Flag to control animation starts

    // Function to start a specific animation based on its order
    function startAnimation(animationOrder) {
        if (animationAllowed && !mvAnimationViewer.hasAttribute('data-playing')) {
            const animationName = `animation ${animationOrder}`; // Construct animation name dynamically
            console.log('Starting animation:', animationName);
            mvAnimationViewer.animationName = animationName;
            mvAnimationViewer.currentTime = 0;
            mvAnimationViewer.play({repetitions: 1});
            mvAnimationViewer.setAttribute('data-playing', 'true');
            animationAllowed = false; // Prevent new animations from starting
        }
    }

    function stopAndResetAnimation() {
        console.log('Stopping and resetting animation...');
        mvAnimationViewer.pause();
        mvAnimationViewer.currentTime = 0;
        mvAnimationViewer.removeAttribute('data-playing');
        animationAllowed = true; // Allow animations to start again
    }

    // Generic function to handle mouse enter
    function handleMouseEnter(elementClass) {
        // Extract animation order from class name (e.g., "hover-1" -> 1)
        const animationOrder = elementClass.split('-')[1];
        if (animationAllowed) {
            startAnimation(animationOrder);
        }
    }

    // Enhanced mouse leave handler to ensure cleanup and readiness for next animation
    function enhancedMouseLeave() {
        stopAndResetAnimation();
        setTimeout(() => animationAllowed = true, 100); // Short delay to manage quick transitions
    }

    // Dynamic event listeners binding for all hover elements
    document.querySelectorAll('[class*="hover-"]').forEach(btn => {
        const elementClass = btn.className.split(' ').find(className => className.startsWith('hover-'));
        if (elementClass) {
            btn.addEventListener('mouseenter', () => handleMouseEnter(elementClass));
            btn.addEventListener('mouseleave', enhancedMouseLeave);
        }
    });

    // Handling model viewer load event
    mvAnimationViewer.addEventListener('load', function() {
        console.log('Model Viewer Loaded.');
    });
});
