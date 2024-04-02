document.addEventListener('DOMContentLoaded', function () {
    const mvAnimationViewer = document.querySelector('[cursor-element="embed"] model-viewer');

    if (!mvAnimationViewer) {
        console.error('No model-viewer found within an element with cursor-element="embed".');
        return;
    }

    // Reset to the first frame of the animation when hover ends
    function resetAnimation() {
        mvAnimationViewer.pause();
        mvAnimationViewer.currentTime = 0;
    }

    // Play the animation associated with the hover target
    function playAnimation(animationIndex) {
        // Check if the animation index is valid
        if (animationIndex >= 0 && animationIndex < mvAnimationViewer.availableAnimations.length) {
            // Ensure we're starting from the beginning if the animation is already ongoing
            resetAnimation();
            mvAnimationViewer.animationName = mvAnimationViewer.availableAnimations[animationIndex];
            mvAnimationViewer.play();
        }
    }

    // Handle hover to play animation
    document.querySelectorAll('[cursor-element^="hover"]').forEach(element => {
        element.addEventListener('mouseenter', () => {
            const animationIndex = parseInt(element.getAttribute('cursor-element').split('-')[1], 10) - 1;
            playAnimation(animationIndex);
        });

        element.addEventListener('mouseleave', resetAnimation);
    });

    // Apply 'pointer-events: none' to specified elements to ensure they do not block the hover interactions
    document.querySelectorAll('[cursor-element="cursor"], [cursor-element="embed"], [cursor-element="wrapper"]').forEach(element => {
        element.style.pointerEvents = 'none';
    });
});
