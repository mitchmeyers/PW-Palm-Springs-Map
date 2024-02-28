document.addEventListener('DOMContentLoaded', function () {
    // Add mouseover event listeners to icons
    document.querySelectorAll('.icon').forEach(item => {
        item.addEventListener('mouseover', event => {
            const tooltipImage = event.target.getAttribute('data-tooltip-image');
            const description = event.target.getAttribute('data-description');

            document.getElementById('tooltip-image').src = tooltipImage;
            document.getElementById('description').textContent = description;
        });
    });

    // Call scaleIcons function initially and on window resize
    scaleIcons();
    window.addEventListener('resize', scaleIcons);
});

function scaleIcons() {
    const mapContainer = document.getElementById('map-container');
    const icons = document.querySelectorAll('.icon');

    const mapWidth = mapContainer.offsetWidth;

    icons.forEach(icon => {
        // Example: Scale icon width based on map container width
        // Assuming 1200px is the original map width and 75px is the original icon width
        const originalWidth = 75; // This value needs to be dynamically adjusted if it varies between icons
        const scaleRatio = mapWidth / 1200; // Adjust based on your layout's original size
        icon.style.width = `${originalWidth * scaleRatio}px`;
        icon.style.height = 'auto'; // Maintain aspect ratio

        // Example of adjusting position - You might need to dynamically calculate or adjust these
        const originalTopPercent = 29; // Assuming original top position was 29%
        // You need to adjust these calculations based on your icons' original positions
        icon.style.top = `${originalTopPercent * scaleRatio}%`;
        // Repeat for left position or any other properties as needed
    });
}
