document.addEventListener('DOMContentLoaded', function () {
    // Find the container with the cursor-element attribute set to "embed"
    const embedContainer = document.querySelector('[cursor-element="embed"]');
    // Find the model-viewer element within this container
    const mvAnimationViewer = embedContainer ? embedContainer.querySelector('model-viewer') : null;

    if (!mvAnimationViewer) {
        return; // Exit the script if model-viewer isn't found
    }

    let animationAllowed = true; // Flag to control animation starts

    function startAnimationByIndex(animationIndex) {
        if (animationAllowed && !mvAnimationViewer.hasAttribute('data-playing')) {
            if(animationIndex < mvAnimationViewer.availableAnimations.length) {
                mvAnimationViewer.animationName = mvAnimationViewer.availableAnimations[animationIndex];
                mvAnimationViewer.currentTime = 0;
                mvAnimationViewer.play({repetitions: 1});
                mvAnimationViewer.setAttribute('data-playing', 'true');
                animationAllowed = false; // Prevent new animations from starting
            }
        }
    }

    function stopAndResetAnimation() {
        mvAnimationViewer.pause();
        mvAnimationViewer.currentTime = 0;
        mvAnimationViewer.removeAttribute('data-playing');
        animationAllowed = true; // Allow animations to start again
    }

    function handleMouseEnter(value) {
        const [type, id] = value.split('-');
        if (type === 'hover' && animationAllowed) {
            const animationIndex = parseInt(id, 10) - 1; // Convert to zero-based index
            startAnimationByIndex(animationIndex);
        }
    }

    function enhancedMouseLeave() {
        stopAndResetAnimation();
        setTimeout(() => animationAllowed = true, 100); // Short delay to manage quick transitions
    }

    function disablePointerEventsForCursorElements() {
        document.querySelectorAll('[cursor-element="cursor"], [cursor-element="embed"], [cursor-element="wrapper"]').forEach(element => {
            element.style.pointerEvents = 'none';
        });
    }

    // Dynamic event listeners binding for all elements with cursor-element attribute for hover
    document.querySelectorAll('[cursor-element^="hover"]').forEach(element => {
        const attributeValue = element.getAttribute('cursor-element');
        element.addEventListener('mouseenter', () => handleMouseEnter(attributeValue));
        element.addEventListener('mouseleave', enhancedMouseLeave);
    });

    // Disable pointer events on specific cursor elements when the document is ready
    disablePointerEventsForCursorElements();

    // Handling model viewer load event
    mvAnimationViewer.addEventListener('load', function() {
        // Model Viewer Loaded
    });
});
