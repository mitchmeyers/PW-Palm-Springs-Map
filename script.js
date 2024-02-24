document.querySelectorAll('.icon').forEach(item => {
    item.addEventListener('mouseover', event => {
        const tooltipImage = event.target.getAttribute('data-tooltip-image');
        const description = event.target.getAttribute('data-description');
        
        document.getElementById('tooltip-image').src = tooltipImage;
        document.getElementById('description').textContent = description;
    });
});
