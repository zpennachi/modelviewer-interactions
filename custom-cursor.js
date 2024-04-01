document.addEventListener('DOMContentLoaded', function () {
    const mvAnimationViewer = document.querySelector('#hover-trigger');
    let animationAllowed = true; // Flag to control animation starts

    // Function to start a specific animation based on its name
    function startAnimation(animationName) {
        if (animationAllowed && !mvAnimationViewer.hasAttribute('data-playing')) {
            console.log('Starting animation:', animationName);
            mvAnimationViewer.animationName = animationName;
            mvAnimationViewer.currentTime = 0;
            mvAnimationViewer.play({repetitions: 1});
            mvAnimationViewer.setAttribute('data-playing', 'true');
            animationAllowed = false; // Prevent new animations from starting
        }
    }

    // Function to stop the animation and reset, with additional logic to allow for new animations
    function stopAndResetAnimation() {
        console.log('Stopping and resetting animation...');
        mvAnimationViewer.pause();
        mvAnimationViewer.currentTime = 0;
        mvAnimationViewer.removeAttribute('data-playing');
        animationAllowed = true; // Allow animations to start again
    }

    // Function to handle mouse enter, prevents immediate re-triggering
    function handleMouseEnter(animationName) {
        if (animationAllowed) {
            startAnimation(animationName);
        }
    }

    // Enhanced mouse leave handler to ensure cleanup and readiness for next animation
    function enhancedMouseLeave() {
        stopAndResetAnimation();
        setTimeout(() => animationAllowed = true, 100); // Short delay to manage quick transitions
    }

    // Add event listeners for hover-btn-1
    document.querySelectorAll('.hover-btn-1').forEach(btn => {
        btn.addEventListener('mouseenter', () => handleMouseEnter('1'));
        btn.addEventListener('mouseleave', enhancedMouseLeave);
    });

    // Add event listeners for hover-btn-2
    document.querySelectorAll('.hover-btn-2').forEach(btn => {
        btn.addEventListener('mouseenter', () => handleMouseEnter('2'));
        btn.addEventListener('mouseleave', enhancedMouseLeave);
    });

    // Handling model viewer load event
    mvAnimationViewer.addEventListener('load', function() {
        console.log('Model Viewer Loaded.');
    });
});
