document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle tooltip visibility
    const toggleTooltip = (tooltip) => {
        // Check if the tooltip is already displayed
        const isDisplayed = tooltip.style.display === 'block';
        // Hide all tooltips
        document.querySelectorAll('.tooltip').forEach(el => el.style.display = 'none');
        // Toggle the clicked tooltip's visibility
        tooltip.style.display = isDisplayed ? 'none' : 'block';
    };

    // Event listener for icons to toggle tooltips
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            // Prevent the icon click from triggering the image click
            event.stopPropagation();
            const tooltip = icon.querySelector('.tooltip');
            toggleTooltip(tooltip);
        });
    });

    // Event listener for tooltip images for redirection
    document.querySelectorAll('.tooltip img').forEach(img => {
        img.addEventListener('click', (event) => {
            // Prevent the image click from triggering the icon click
            event.stopPropagation();
            const url = img.getAttribute('data-url');
            if (url) window.location.href = url; // Redirect to the URL
        });
    });

    // Optional: Add an event listener to the document to hide tooltips when clicking anywhere else
    document.addEventListener('click', () => {
        document.querySelectorAll('.tooltip').forEach(el => el.style.display = 'none');
    });
});
