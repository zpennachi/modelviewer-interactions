document.addEventListener('DOMContentLoaded', function () {
    const mvAnimationViewer = document.querySelector('#hover-trigger');
    let animationAllowed = true; // Flag to control animation starts

    // Function to start a specific animation based on its order (index)
    function startAnimationByIndex(animationIndex) {
        if (animationAllowed && !mvAnimationViewer.hasAttribute('data-playing')) {
            // Assuming animations are an array-like structure within mvAnimationViewer
            if(animationIndex < mvAnimationViewer.availableAnimations.length) {
                mvAnimationViewer.animationName = mvAnimationViewer.availableAnimations[animationIndex];
                console.log(`Starting animation by index:`, mvAnimationViewer.availableAnimations[animationIndex]);
                mvAnimationViewer.currentTime = 0;
                mvAnimationViewer.play({repetitions: 1});
                mvAnimationViewer.setAttribute('data-playing', 'true');
                animationAllowed = false; // Prevent new animations from starting
            } else {
                console.error("Animation index out of bounds:", animationIndex);
            }
        }
    }

    function stopAndResetAnimation() {
        console.log('Stopping and resetting animation...');
        mvAnimationViewer.pause();
        mvAnimationViewer.currentTime = 0;
        mvAnimationViewer.removeAttribute('data-playing');
        animationAllowed = true; // Allow animations to start again
    }

    function handleMouseEnter(value) {
        // Assuming value is in the format "hover-x"
        const [type, id] = value.split('-');
        if (type === 'hover' && animationAllowed) {
            const animationIndex = parseInt(id, 10) - 1; // Convert to zero-based index
            startAnimationByIndex(animationIndex);
        }
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
    });

    // Handling model viewer load event
