
document.addEventListener('DOMContentLoaded', function () {
    // First, select the container with the custom attribute
    const mvScrollContainer = document.querySelector('[mv-scroll="scroll-element"]');
    // Then, find the model-viewer within that container
    const mvScroll = mvScrollContainer ? mvScrollContainer.querySelector('model-viewer') : null;

    if (!mvScroll) {
        console.error('No model-viewer found within the container with mv-scroll="scroll-element".');
        return;
    }

    mvScroll.addEventListener('load', () => {
        mvScroll.pause(); // Initially pause the animation

        window.addEventListener('scroll', () => {
            clearTimeout(mvScroll.pauseTimeout); // Clear any existing timeout

            // Calculate the scroll percentage
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const maxTime = mvScroll.duration - 0.04; // Adjust for the final frame

            // Set the current time of the model viewer based on scroll, not exceeding maxTime
            mvScroll.currentTime = Math.min(scrollPercentage * mvScroll.duration, maxTime);
            
            mvScroll.play(); // Play to update the frame

            // Set a short timeout to pause the animation, ensuring it stops if scrolling stops
            mvScroll.pauseTimeout = setTimeout(() => {
                mvScroll.pause();
            }, 10);
        });
    });
});

