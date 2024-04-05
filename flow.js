<script type="module">
    // Import the model-viewer module from its URL
    import 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';

    document.addEventListener('DOMContentLoaded', function () {
        const scrollAnimateContainer = document.querySelector('[wf-scroll-animate]');
        const scrollAnimateModel = scrollAnimateContainer ? scrollAnimateContainer.querySelector('model-viewer') : null;
        let originalAnimationName = '';
        let isHovering = false;

        if (scrollAnimateModel) {
            originalAnimationName = scrollAnimateModel.getAttribute('animation-name') || '';

            scrollAnimateModel.addEventListener('load', function() {
                updateAnimationFrame(); // Update frame on model load
            });

            function updateAnimationFrame() {
                if (!isHovering) {
                    const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                    const animationProgress = Math.min(scrollPercentage, 0.95);
                    scrollAnimateModel.currentTime = animationProgress * scrollAnimateModel.duration;
                    if (!scrollAnimateModel.loop) {
                        scrollAnimateModel.pause();
                    }
                }
            }

            window.addEventListener('scroll', updateAnimationFrame);
        }

        if (window.innerWidth >= 1024) {
            document.querySelectorAll('[wf-hover-rotate]').forEach(container => {
                const hoverRotator = container.querySelector('model-viewer');
                if (hoverRotator) {
                    document.addEventListener('mousemove', event => {
                        const mouseX = event.clientX;
                        const mouseY = event.clientY;
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;
                        const normalizedX = (mouseX / viewportWidth) * 2 - 1;
                        const normalizedY = (mouseY / viewportHeight) * 2 - 1;
                        const azimuthalAngle = normalizedX * -40;
                        const polarAngle = normalizedY * -180;
                        hoverRotator.cameraOrbit = `${azimuthalAngle}deg ${polarAngle}deg auto`;
                    });
                }
            });
        }

        document.querySelectorAll('[wf-ar]').forEach(container => {
            const modelViewer = container.querySelector('model-viewer');
            if (modelViewer) {
                modelViewer.setAttribute('ar', '');
                modelViewer.setAttribute('ar-modes', 'webxr scene-viewer quick-look');
                const arButton = document.createElement('button');
                const buttonText = container.getAttribute('wf-ar-button-text') || 'View in AR';
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
                scrollAnimateModel.animationName = originalAnimationName;
                updateAnimationFrame();
                scrollAnimateModel.pause();
            }

            document.querySelectorAll('[hover-trigger]').forEach(element => {
                const animationName = element.getAttribute('hover-trigger');
                element.addEventListener('mouseenter', () => switchToHoverAnimation(animationName));
                element.addEventListener('mouseleave', revertToOriginalAnimation);
            });
        }
    });
</script>
