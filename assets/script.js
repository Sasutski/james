document.addEventListener('DOMContentLoaded', function() {
    const profileSection = document.getElementById('profileSection');
    const profilePicture = document.getElementById('profilePicture');
    
    // Create a container for the text elements when in collapsed state
    function createTextContainer() {
        const textContainer = document.createElement('div');
        textContainer.className = 'text-container';
        // Get the name and alt elements
        const name = document.querySelector('.name');
        const alt = document.querySelector('.alt');
        // Clone them to preserve event listeners
        const nameClone = name.cloneNode(true);
        const altClone = alt.cloneNode(true);
        // Add clones to text container
        textContainer.appendChild(nameClone);
        textContainer.appendChild(altClone);
        return { textContainer, originalName: name, originalAlt: alt };
    }
    
    // Handle profile picture click
    profilePicture.addEventListener('click', function() {
        if (!profileSection.classList.contains('collapsed')) {
            // Switching to collapsed state
            profileSection.classList.add('collapsed');
            // Create and add text container
            const { textContainer, originalName, originalAlt } = createTextContainer();
            originalName.style.display = 'none';
            originalAlt.style.display = 'none';
            profileSection.appendChild(textContainer);
        } else {
            // Switching back to expanded state
            profileSection.classList.remove('collapsed');
            // Remove text container and show original elements
            const textContainer = document.querySelector('.text-container');
            if (textContainer) {
                profileSection.removeChild(textContainer);
            }
            const name = document.querySelector('.name');
            const alt = document.querySelector('.alt');
            name.style.display = '';
            alt.style.display = '';
        }
    });
});
