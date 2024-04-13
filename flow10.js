import 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';

document.addEventListener('DOMContentLoaded', function () {
    // Function to set interpolation decay based on fv-interpolate attribute or default to 100
    function setInterpolationDecay(modelViewer) {
        const interpolationDecayValue = modelViewer.getAttribute('fv-interpolate') || 100;
        modelViewer.interpolationDecay = interpolationDecayValue;
    }

    // Replace div elements containing model URLs with model-viewer elements
    document.querySelectorAll('div[fv-element]').forEach(div => {
        const urlText = div.textContent.trim();
        const modelUrl = urlText.replace('.txt', ''); // Remove '.txt' if present

        const modelViewer = document.createElement('model-viewer');
        modelViewer.src = modelUrl;
        modelViewer.setAttribute('style', 'width: 100%; height: 400px;');
        modelViewer.setAttribute('camera-controls', '');
        modelViewer.setAttribute('auto-rotate', '');
        modelViewer.setAttribute('shadow-intensity', '1');

        // Set up model-viewer attributes and listeners
        setInterpolationDecay(modelViewer);
        modelViewer.addEventListener('load', function() {
            // Initialize or update anything related to the model viewer after loading
        });

        div.textContent = ''; // Clear the original text content
        div.appendChild(modelViewer); // Append the new model-viewer element
    });

    // Handling additional interactive features
    window.addEventListener('scroll', function() {
        // Update animation or viewer settings based on scroll, if necessary
    });

    if (window.innerWidth >= 1024) {
        document.querySelectorAll('[fv-hover-rotate]').forEach(container => {
            const hoverRotator = container.querySelector('model-viewer');
            if (hoverRotator) {
                const baseAzimuthalAngle = 270;
                const basePolarAngle = 90;
                const baseRadius = '30m';

                document.addEventListener('mousemove', event => {
                    const mouseX = event.clientX;
                    const mouseY = event.clientY;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const normalizedX = (mouseX / viewportWidth) * 2 - 1;
                    const normalizedY = (mouseY / viewportHeight) * 2 - 1;

                    const azimuthalAngleAdjustment = normalizedX * -10;
                    const polarAngleAdjustment = normalizedY * -10;

                    const azimuthalAngle = baseAzimuthalAngle + azimuthalAngleAdjustment;
                    const polarAngle = basePolarAngle + polarAngleAdjustment;

                    hoverRotator.cameraOrbit = `${azimuthalAngle}deg ${polarAngle}deg ${baseRadius}`;
                });
            }
        });
    }
});
