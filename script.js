document.addEventListener('DOMContentLoaded', () => {
    // Function to adjust tooltip visibility and position
    const toggleTooltip = (icon, tooltip) => {
        // Initially display the tooltip to measure dimensions
        tooltip.style.display = 'block';
        tooltip.style.visibility = 'hidden';

        const mapContainerRect = document.getElementById('map-container').getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();

        // Calculate horizontal position
        let leftOffset = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);
        // Adjust if tooltip overflows the map container on the left
        if (leftOffset < mapContainerRect.left) {
            leftOffset = mapContainerRect.left + 10; // 10px padding from edge
        }
        // Adjust if tooltip overflows the map container on the right
        else if ((leftOffset + tooltipRect.width) > mapContainerRect.right) {
            leftOffset = mapContainerRect.right - tooltipRect.width - 10; // 10px padding from edge
        }

        // Calculate vertical position
        let topOffset = iconRect.top + window.scrollY - tooltipRect.height - 10; // Position above the icon
        // Check if there's enough space above, if not display below
        if (topOffset < mapContainerRect.top + window.scrollY) {
            topOffset = iconRect.bottom + window.scrollY + 10; // 10px below the icon
        }

        // Apply calculated positions
        tooltip.style.left = `${leftOffset}px`;
        tooltip.style.top = `${topOffset}px`;

        // Make tooltip visible
        tooltip.style.visibility = 'visible';
    };

    // Event listeners for icons and tooltips
    document.querySelectorAll('.icon').forEach(icon => {
        const tooltip = icon.querySelector('.tooltip');
        icon.addEventListener('mouseenter', () => toggleTooltip(icon, tooltip));
        icon.addEventListener('mouseleave', () => tooltip.style.display = 'none');
    });

    // Prevent tooltip from hiding when mouse is over the tooltip itself
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        tooltip.addEventListener('mouseenter', () => tooltip.style.display = 'block');
        tooltip.addEventListener('mouseleave', () => tooltip.style.display = 'none');
    });
});
