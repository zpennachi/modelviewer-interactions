document.addEventListener('DOMContentLoaded', function () {
    const mvAnimationViewer = document.querySelector('#hover-trigger');
    let animationAllowed = true; // Flag to control animation starts

    // Function to start a specific animation based on its identifier
    function startAnimation(animationId) {
        if (animationAllowed && !mvAnimationViewer.hasAttribute('data-playing')) {
            const animationName = `animation ${animationId}`; // Use the identifier directly for the animation name
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

    // Generic function to handle mouse enter based on cursor-element attribute value
    function handleMouseEnter(value) {
        // Parse the value to determine the action; for now, we focus on hover triggers
        const [type, id] = value.split('-');
        if (type === 'hover' && animationAllowed) {
            startAnimation(id);
        }
        // Future case handling can go here, e.g., if (type === 'cursor') { ... }
    }

    // Enhanced mouse leave handler to ensure cleanup and readiness for next animation
    function enhancedMouseLeave() {
        stopAndResetAnimation();
        setTimeout(() => animationAllowed = true, 100); // Short delay to manage quick transitions
    }

    // Dynamic event listeners binding for all elements with cursor-element attribute
    document.querySelectorAll('[cursor-element]').forEach(element => {
        const attributeValue = element.getAttribute('cursor-element');
        if (attributeValue.startsWith('hover')) {
            element.addEventListener('mouseenter', () => handleMouseEnter(attributeValue));
            element.addEventListener('mouseleave', enhancedMouseLeave);
        }
        // Future bindings for other cursor-related elements can be added here
    });

    // Handling model viewer load event
    mvAnimationViewer.addEventListener('load', function() {
        console.log('Model Viewer Loaded.');
    });
});
