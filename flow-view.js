
import 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';

document.addEventListener('DOMContentLoaded', function () {
    const scrollAnimateContainer = document.querySelector('[fv-scroll]');
    const scrollAnimateModel = scrollAnimateContainer ? scrollAnimateContainer.querySelector('model-viewer') : null;
    let originalAnimationName = '';
    let isHovering = false;

    // Use the fv-scroll attribute value as the animation name for scrolling
    const scrollAnimationName = scrollAnimateContainer ? scrollAnimateContainer.getAttribute('fv-scroll') : '';

    // Function to set interpolation decay based on fv-interpolate attribute or default to 100
    function setInterpolationDecay(modelViewer) {
        const interpolationDecayValue = modelViewer.getAttribute('fv-interpolate') || 100;
        modelViewer.interpolationDecay = interpolationDecayValue;
    }

    // Apply interpolation decay settings to all model-viewer elements initially
    document.querySelectorAll('model-viewer').forEach(setInterpolationDecay);

    function updateAnimationFrame() {
        if (scrollAnimateModel && !isHovering) {
            const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            const animationProgress = Math.min(scrollPercentage, 0.95);
            scrollAnimateModel.currentTime = animationProgress * scrollAnimateModel.duration;
            if (!scrollAnimateModel.loop) {
                scrollAnimateModel.pause();
            }
        }
    }

    if (scrollAnimateModel) {
        originalAnimationName = scrollAnimateModel.getAttribute('animation-name') || scrollAnimationName;

        scrollAnimateModel.addEventListener('load', function() {
            scrollAnimateModel.animationName = scrollAnimationName; // Set the animation name for scroll
            updateAnimationFrame(); // Update frame based on current scroll
        });

        window.addEventListener('scroll', updateAnimationFrame);
    }

    if (window.innerWidth >= 1024) {
        document.querySelectorAll('[fv-hover-rotate]').forEach(container => {
            const hoverRotator = container.querySelector('model-viewer');
            if (hoverRotator) {
                // Capture initial camera orbit values
                const baseAzimuthalAngle = 270; // Base azimuthal angle from your settings
                const basePolarAngle = 90; // Base polar angle from your settings
                const baseRadius = '30m'; // Base radius from your settings

                document.addEventListener('mousemove', event => {
                    const mouseX = event.clientX;
                    const mouseY = event.clientY;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const normalizedX = (mouseX / viewportWidth) * 2 - 1;
                    const normalizedY = (mouseY / viewportHeight) * 2 - 1;

                    // Adjust these values to control the sensitivity of the camera orbit changes
                    const azimuthalAngleAdjustment = normalizedX * -10; // Less sensitive adjustment
                    const polarAngleAdjustment = normalizedY * -10; // Less sensitive adjustment

                    // Apply differential rotation based on initial settings
                    const azimuthalAngle = baseAzimuthalAngle + azimuthalAngleAdjustment;
                    const polarAngle = basePolarAngle + polarAngleAdjustment;

                    hoverRotator.cameraOrbit = `${azimuthalAngle}deg ${polarAngle}deg ${baseRadius}`;
                });
            }
        });
    }

    document.querySelectorAll('[fv-ar]').forEach(container => {
        const modelViewer = container.querySelector('model-viewer');
        if (modelViewer) {
            modelViewer.setAttribute('ar', '');
            modelViewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
            const arButton = document.createElement('button');
            const buttonText = container.getAttribute('fv-ar-button-text') || 'View in AR';
            arButton.innerText = buttonText;
            arButton.classList.add('ar-button');
            container.appendChild(arButton);
            arButton.addEventListener('click', () => modelViewer.activateAR());
        }
    });

    if (scrollAnimateModel) {
        function switchToHoverAnimation(animationName) {
            isHovering = true;
            scrollAnimateModel.animationName = animationName;
            scrollAnimateModel.loop = true;
            scrollAnimateModel.play();
        }

        function revertToOriginalAnimation() {
            isHovering = false;
            scrollAnimateModel.animationName = originalAnimationName; // Revert to the original or scrolling animation name
            updateAnimationFrame(); // Update frame based on current scroll
            scrollAnimateModel.pause();
        }

        document.querySelectorAll('[fv-hover-trigger]').forEach(element => {
            const animationName = element.getAttribute('fv-hover-trigger');
            element.addEventListener('mouseenter', () => switchToHoverAnimation
(animationName));
element.addEventListener('mouseleave', revertToOriginalAnimation);
});
}
});
