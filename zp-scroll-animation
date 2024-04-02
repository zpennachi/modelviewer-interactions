document.addEventListener('DOMContentLoaded', function () {
    // Select the model viewer using the new custom attribute and value
    const mv3_modelViewer = document.querySelector('[mv-scroll="scroll-element"]');
    let mv3_pauseTimeout;

    if (!mv3_modelViewer) {
        console.error('No model-viewer found with mv-scroll="scroll-element".');
        return;
    }

    mv3_modelViewer.addEventListener('load', () => {
        mv3_modelViewer.pause(); // Initially pause the animation

        window.addEventListener('scroll', () => {
            clearTimeout(mv3_pauseTimeout); // Clear any existing timeout

            // Calculate the scroll percentage
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const maxTime = mv3_modelViewer.duration - 0.04; // Adjust for the final frame

            // Set the current time of the model viewer based on scroll, not exceeding maxTime
            mv3_modelViewer.currentTime = Math.min(scrollPercentage * mv3_modelViewer.duration, maxTime);
            
            mv3_modelViewer.play(); // Play to update the frame

            // Set a short timeout to pause the animation, ensuring it stops if scrolling stops
            mv3_pauseTimeout = setTimeout(() => {
                mv3_modelViewer.pause();
            }, 10);
        });
    });
});
