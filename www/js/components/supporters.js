// components/supporters.js
export function setupSupporters() {
    const supportersTrack = document.querySelector('.supporters-track');
    const supportersItems = document.querySelectorAll('.supporters-item');

    // A function to handle the setup logic
    function runSetup() {
        // Remove all previously duplicated items (keep only the original ones)
        const originalItems = [...supportersItems]; // Convert NodeList to array of the original items
        supportersTrack.innerHTML = ''; // Clear the track

        // Re-append original items to the track
        originalItems.forEach(item => {
            supportersTrack.appendChild(item);
        });

        // Recalculate item width and total width
        const itemWidth = originalItems[0].offsetWidth; // Width of a single item
        const totalItemsWidth = itemWidth * originalItems.length; // Total width of original items
        const screenWidth = window.innerWidth; // Get the screen width

        // Calculate how many times we need to duplicate the items to fill the screen width
        const numDuplicates = Math.ceil(screenWidth / totalItemsWidth) + 1;

        // Duplicate the items
        for (let i = 0; i < numDuplicates; i++) {
            originalItems.forEach(item => {
                let clone = item.cloneNode(true); // Clone each item
                supportersTrack.appendChild(clone); // Append the cloned item to the track
            });
        }
    }

    // Run the setup initially
    runSetup();

    // Add resize event listener to re-run setup when window is resized
    window.addEventListener('resize', runSetup);
}
