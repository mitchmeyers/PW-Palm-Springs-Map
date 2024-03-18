document.addEventListener('DOMContentLoaded', () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW1leWVycyIsImEiOiJja3ZyazE3aTY3c2R4MnBtczc2aHBqdzg1In0.YPciThiEyOCx0TQBnFzNtg';
    const map = new mapboxgl.Map({
        container: 'map-container',
        style: 'mapbox://styles/mmeyers/cltq5c1ip03ga01p047qf2dji',
        center: [-122.538690, 47.646544],
        zoom: 10
    });

    function toggleInfo(show, properties, iconName) {
        const infoContainer = document.getElementById('info-container');
        const descriptionContainer = document.getElementById('description-container');
        const imageContainer = document.getElementById('image-container');
        const closeButton = document.createElement('button');


        closeButton.innerText = 'X'; // Set the button text to 'X'
closeButton.style.position = 'absolute'; // Position it absolutely within the info-container
closeButton.style.top = '10px'; // 10px from the top
closeButton.style.right = '10px'; // Adjusted to position it 10px from the right instead of the left
closeButton.style.width = '30px'; // Fixed width
closeButton.style.height = '30px'; // Fixed height to make it square (and thus circular with border-radius)
closeButton.style.paddingRight = '4px'; // Adjust padding if needed to center the 'X'
closeButton.style.borderRadius = '50%'; // Makes it circular
closeButton.style.border = '1px solid black';
closeButton.style.background = '#f7f6ec'; // Background color
closeButton.style.cursor = 'pointer'; // Cursor on hover
closeButton.style.fontSize = '16px'; // Font size
closeButton.style.zIndex = '10'; // Ensure it's above other content
closeButton.style.fontFamily = "'Lulo', sans-serif"; // Use the Lulo font
closeButton.style.display = 'flex'; // Use flexbox to center content
closeButton.style.alignItems = 'center'; // Center content vertically
closeButton.style.justifyContent = 'center'; // Center content horizontally
closeButton.style.textAlign = 'center'; // Ensure text is centered (useful if the font renders oddly)
closeButton.setAttribute('aria-label', 'Close');

// Event listener for the close button remains the same.
closeButton.addEventListener('click', function() {
    // Remove the 'open' class to hide the info-container
    infoContainer.classList.remove('open');
});

// Append the close button to the info-container.
infoContainer.appendChild(closeButton);

    
        // Adjust the descriptionContainer to allow for vertical layout with flex-end to push children to the bottom
        descriptionContainer.style.display = 'flex';
        descriptionContainer.style.flexDirection = 'column';
        descriptionContainer.style.alignItems = 'center'; // This centers the content horizontally
        descriptionContainer.style.justifyContent = 'flex-start'; // This pushes the content to the bottom
        descriptionContainer.innerHTML = ''; // Clear previous content
        descriptionContainer.style.overflowY = 'auto';
        descriptionContainer.innerHTML = ''; // Clear previous content
        descriptionContainer.scrollTop = 0; // Reset scroll position to the top

        imageContainer.innerHTML = ''; // Clear previous image



        if (show) {
            infoContainer.classList.add('open');
    
            // Create iconContainer first as it will be the parent for imgWrapper
            const iconContainer = document.createElement('div');
            iconContainer.style.flexDirection = 'column';
            iconContainer.style.display = 'flex'; // Style as needed
            iconContainer.style.justifyContent = 'center'; // Centers the icon within the container
            iconContainer.style.alignItems = 'center'; // Align the icon vertically in the center
            iconContainer.style.width = '100%'; // Adjust the width as needed
            iconContainer.style.height = 'auto'; // Adjust the height as needed
    
            // Only then check for and handle the imageUrl
            if (properties && properties.imageUrl) {
                const imgWrapper = document.createElement('div');
                imgWrapper.style.width = '100%';
                imgWrapper.style.height = '100%';
                imgWrapper.style.overflow = 'hidden';
                imgWrapper.style.position = 'relative';
                imgWrapper.style.display = 'flex';
                imgWrapper.style.justifyContent = 'center';
                imgWrapper.style.alignItems = 'center';
                imgWrapper.style.background = 'none';
                imgWrapper.style.paddingTop = '10px';
                imgWrapper.style.paddingBottom = '30px';
    
                const mainImg = new Image();
                mainImg.src = properties.imageUrl;
                mainImg.style.width = '95%';
                mainImg.style.height = '250px';
                mainImg.style.objectFit = 'cover';
                mainImg.style.borderRadius = '20px';
                mainImg.style.boxShadow = '0px 0px 7px rgba(0, 0, 0, 0.4)';
    
                imgWrapper.appendChild(mainImg);
                // Insert the imgWrapper at the top of the iconContainer
                iconContainer.insertBefore(imgWrapper, iconContainer.firstChild); // Now correct
            }
    
            // If iconName is provided, append the icon to the iconContainer
            if (iconName) {
                const iconImg = document.createElement('img');
                iconImg.src = `icons/${iconName}.png`;
                iconImg.alt = iconName;
                iconImg.style.width = '45px'; // Adjust as needed
                iconImg.style.height = '45px'; // Adjust as needed
    
                // Append the iconImg below the imgWrapper in the iconContainer
                iconContainer.appendChild(iconImg);
            }
    
            // Finally, append the iconContainer (which now includes the imgWrapper) to the iconTitleContainer
            const iconTitleContainer = document.createElement('div');
            iconTitleContainer.style.margin = '-20px';
            iconTitleContainer.style.display = 'flex';
            iconTitleContainer.style.flexDirection = 'column';
            iconTitleContainer.style.alignItems = 'center';
            iconTitleContainer.style.justifyContent = 'center';
            iconTitleContainer.style.paddingRight = '30px';
            iconTitleContainer.style.paddingLeft = '30px';
            iconTitleContainer.style.paddingTop = '30px';
    
            iconTitleContainer.appendChild(iconContainer); // This places the iconContainer, which includes imgWrapper, at the beginning
    
            // Append the iconTitleContainer to the descriptionContainer
            const descriptionContainer = document.getElementById('description-container');
            descriptionContainer.appendChild(iconTitleContainer);

            // Check if the properties object has a Category property
            if (properties && properties.Category) {
            // Create a new container for the category
                const categoryContainer = document.createElement('div');
                categoryContainer.style.display = 'flex'; // Optional: Adjust the display to your needs
                categoryContainer.style.justifyContent = 'center'; // Centers the category within the container
                categoryContainer.style.width = '100%'; // Optional: Adjust the width as needed

            // Create the category element
                const categoryElement = document.createElement('p');
                categoryElement.textContent = properties.Category;
                categoryElement.style.fontSize = '16px'; // Adjust as needed
                categoryElement.style.margin = '5px 0'; // Add some vertical spacing
                categoryElement.style.textAlign = 'center';
                categoryElement.className = 'title-lulo'; // Matches the CSS class name

            // Append the category element to the category container
                categoryContainer.appendChild(categoryElement);

            // Insert the category container in the iconTitleContainer, right after the icon
            // Assuming the icon container is the first child of iconTitleContainer
                iconTitleContainer.insertBefore(categoryContainer, iconTitleContainer.children[1]);
            }
            
            // Check if the properties object has a Title property
            if (properties && properties.Title) {
            // Create a new container for the title
                const titleContainer = document.createElement('div');
                titleContainer.style.display = 'flex'; // Optional: Adjust the display to your needs
                titleContainer.style.justifyContent = 'center'; // Centers the title within the container
                titleContainer.style.width = '100%'; // Optional: Adjust the width as needed
                titleContainer.style.height = 'auto'; // Optional: Adjust the width as needed

            // Create the title element
                const titleElement = document.createElement('h3');
                titleElement.textContent = properties.Title;
                titleElement.className = 'title-signpainter';
                titleElement.style.textAlign = 'center';
                titleElement.style.margin = '8px';
                titleElement.style.paddingBottom = '15px';

            // Append the title element to the title container
                titleContainer.appendChild(titleElement);

            // Append the title container to the iconTitleContainer
                iconTitleContainer.appendChild(titleContainer);
            }
    
            if (properties && properties.Description) {
                // Create a new container for the description
                const descriptionContainer = document.createElement('div');
                descriptionContainer.style.display = 'flex'; // Optional: Adjust the display to your needs
                descriptionContainer.style.justifyContent = 'center'; // Centers the description within the container
                descriptionContainer.style.width = '94%'; // Optional: Adjust the width as needed
                descriptionContainer.style.paddingBottom = '20px';
            
                // Create the description element
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = properties.Description;
                descriptionElement.style.textAlign = 'center';
                descriptionElement.style.fontSize = '13px';
                descriptionElement.className = 'open-sans'; // Apply to elements as needed

            
                // Append the description element to the description container
                descriptionContainer.appendChild(descriptionElement);
            
                // Append the description container to the iconTitleContainer
                iconTitleContainer.appendChild(descriptionContainer);
            }
            
            // Append the iconTitleContainer to the description container of the main layout
            descriptionContainer.appendChild(iconTitleContainer);
    
            // Container for icons and their info text
                const infoIconsContainer = document.createElement('div');
                infoIconsContainer.style.display = 'flex';
                infoIconsContainer.style.flexWrap = 'wrap'; // Allow items to wrap as needed
                infoIconsContainer.style.justifyContent = 'center'; // Center items in the container
                infoIconsContainer.style.width = '88%';
                infoIconsContainer.style.paddingTop = '10px';
                infoIconsContainer.style.paddingBottom = '10px';
                infoIconsContainer.style.margin = '20px';
                infoIconsContainer.style.borderRadius = '20px';
                infoIconsContainer.style.boxShadow = '0px 0px 7px rgba(0, 0, 0, 0.2)';
            
                let iconCount = 0; // Counter for the number of icons added
                const maxIcons = 3; // Maximum number of icons to display
            
                for (let i = 1; i <= 6; i++) {
                    if (properties[`Info${i}`] && iconCount < maxIcons) {
                        // Main container for each icon-info pair
                        const iconAndInfoContainer = document.createElement('div');
                        iconAndInfoContainer.style.display = 'flex';
                        iconAndInfoContainer.style.flexDirection = 'column'; // Stack icon above its info text
                        iconAndInfoContainer.style.alignItems = 'center'; // Center items vertically
                        iconAndInfoContainer.style.margin = '5px'; // Add some space around each container
                        iconAndInfoContainer.style.width = 'calc(33.33% - 10px)'; // Set width to 33.33% minus margins
                        iconAndInfoContainer.style.boxSizing = 'border-box'; // Include padding and border in the element's total width
            
                    // Create an additional container for the icon itself
                    const iconWrapper = document.createElement('div');
                    iconWrapper.style.padding = '5px'; // Example padding, adjust as needed
                    iconWrapper.style.height = '90px';
            
                    // Create and add the icon to its wrapper
                    const infoIcon = document.createElement('img');
                    infoIcon.src = `icons/icon-${i}.png`;
                    infoIcon.alt = `Information ${i}`;
                    infoIcon.style.width = '90px';
                    infoIcon.style.height = 'auto';
                    iconWrapper.appendChild(infoIcon);
            
                    // Add the icon wrapper to the main container
                    iconAndInfoContainer.appendChild(iconWrapper);
            
                    // Create and add the info text directly to the main container
                    const infoText = document.createElement('p');
                    infoText.textContent = properties[`Info${i}`];
                    infoText.style.fontSize = '13px'; // Adjust the font size as needed
                    infoText.className = 'title-lulo'; // Correctly applies the CSS class name
                    iconAndInfoContainer.appendChild(infoText);
            
                    // Add the main container to the infoIconsContainer
                    infoIconsContainer.appendChild(iconAndInfoContainer);
                    
                    iconCount++; // Increment the counter after adding an icon and its info
                }
            }
            
            // Only append the infoIconsContainer if it contains any children
            if (infoIconsContainer.hasChildNodes()) {
                descriptionContainer.appendChild(infoIconsContainer);
            }

            // Create a new container for the buttons
            const buttonsContainer = document.createElement('div');
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.justifyContent = 'space-around'; // Space the buttons evenly
            buttonsContainer.style.paddingTop = '10px'; // Add some padding for visual spacing
            buttonsContainer.style.width = '90%'; // Make the container take the full width of its parent
            buttonsContainer.style.justifyContent = 'space-between';
            buttonsContainer.style.flexWrap = 'wrap'; // Allows items to wrap if needed
            buttonsContainer.style.alignItems = 'center'; // Centers items vertically
            buttonsContainer.className = 'buttonsContainer'; // Add this line to assign a class to your container
            buttonsContainer.style.paddingBottom = '50px';



            // Create the first button
const buttonOne = document.createElement('button');
buttonOne.innerText = 'DIRECTIONS'; // Set the button text
buttonOne.style.padding = '10px 5px'; // Add padding for a larger click area
buttonOne.style.cursor = 'pointer'; // Change the cursor on hover
buttonOne.style.borderRadius = '20px';
buttonOne.style.outline = 'none'; // Removes the outline on focus
buttonOne.style.border = '1px solid black'; // Adds a black line around the button
buttonOne.style.boxShadow = '0px 0px 7px rgba(0, 0, 0, 0.2)'; // Adds a shadow behind the button
buttonOne.style.width = '120px';
buttonOne.className = 'button-lulo'; // Applies the CSS class name
buttonOne.style.background = 'none';
buttonOne.style.fontSize = '12px';
buttonOne.style.marginRight = '5px';
buttonOne.style.flexGrow = '1';

// Assuming properties.Google contains the URL
if (properties && properties.Google) {
    buttonOne.addEventListener('click', function() {
        console.log("Button clicked. Redirecting to:", properties.Google);
        window.open(properties.Google, '_blank');
    });
}



            // Add any additional styles or event listeners to buttonOne here

            // Create the second button
            const buttonTwo = document.createElement('button');
            buttonTwo.innerText = 'Button Two'; // Set the button text
            buttonTwo.style.padding = '10px 5px'; // Add padding for a larger click area
            buttonTwo.style.cursor = 'pointer'; // Change the cursor on hover
            buttonTwo.style.borderRadius = '20px';
            buttonTwo.style.outline = 'none'; // Removes the outline on focus
            buttonTwo.style.border = '1px solid black'; // Adds a black line around the button
            buttonTwo.style.boxShadow = '0px 0px 7px rgba(0, 0, 0, 0.2)'; // Adds a shadow behind the button
            buttonTwo.style.width = '120px';
            buttonTwo.innerText = 'READ GUIDE'; // Change the button text to "READ GUIDE"
            buttonTwo.className = 'button-lulo'; // For the second button
            buttonTwo.style.background = 'none';
            buttonTwo.style.fontSize = '12px';
            buttonTwo.style.flexGrow = '1';


            // Add any additional styles or event listeners to buttonTwo here

            // Append the buttons to the buttons container
            buttonsContainer.appendChild(buttonOne);
            buttonsContainer.appendChild(buttonTwo);

            // Append the buttons container to the descriptionContainer
            // This places it underneath the infoIconsContainer or at the end if infoIconsContainer is not present
            descriptionContainer.appendChild(buttonsContainer);


        } else {
            infoContainer.classList.remove('open');
        }
    }

    map.on('load', () => {
        const icons = [
            { name: 'pw-eatsicon', path: 'icons/pw-eatsicon.png', data: './geoJson/West_Coast_Eats.geojson', layerId: 'eats-layer' },
            { name: 'pw-campicon', path: 'icons/pw-campicon.png', data: './geoJson/West_Coast_Camping.geojson', layerId: 'camping-layer' },
            { name: 'pw-logoicon', path: 'icons/pw-logoicon.png', data: './geoJson/PW_Locations.geojson', layerId: 'hub-layer' },
            { name: 'pw-hikesicon', path: 'icons/pw-hikesicon.png', data: './geoJson/West_Coast_Hiking.geojson', layerId: 'hikes-layer' }
        ];

        icons.forEach(icon => {
            map.loadImage(icon.path, (error, image) => {
                if (error) throw error;
                if (!map.hasImage(icon.name)) {
                    map.addImage(icon.name, image);
                }

                map.addSource(icon.layerId, {
                    type: 'geojson',
                    data: icon.data
                });

                map.addLayer({
                    id: icon.layerId,
                    type: 'symbol',
                    source: icon.layerId,
                    layout: {
                        'icon-image': icon.name,
                        'icon-size': 0.5,
                        'text-field': '{Title}',
                        'text-font': ['SignPainter HouseScript', 'Arial Unicode MS Bold'],
                        'text-size': 13,
                        'text-offset': [0, 1.2],
                        'text-anchor': 'top',
                    },
                    paint: {
                        'text-halo-width': 1,
                        'text-halo-color': 'white'
                    }
                });

                map.on('click', icon.layerId, (e) => {
                    const properties = e.features[0].properties;
                    console.log(properties); // Inspect the properties object
                    toggleInfo(true, properties, icon.name);
                });
            });
        });

        map.on('click', () => toggleInfo(false));
        map.on('mouseleave', 'places', () => map.getCanvas().style.cursor = '');
    });
});
