var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTLBPHegkWFRDJAKTdDYXdYAm3DbA4M9Vdg6dcY8ZT_K_F2xlLCEvXfJrRfPLmigxD/exec";

async function loadPosterboard() {
    const grid = document.getElementById('poster-grid');
    if (!grid) return;

    grid.innerHTML = "<p style='padding: 2rem; font-weight: bold;'>Pinning up flyers...</p>";

    try {
        const response = await fetch(SCRIPT_URL);
        const files = await response.json();
        
        if (files.length === 0) {
            grid.innerHTML = "<p style='padding: 2rem;'>The board is empty.</p>";
            return;
        }

        // Clear the "loading" message
        grid.innerHTML = "";

        // Loop through the files and build the HTML for each poster
        files.forEach((file) => {
            // Generate a random rotation between -3 and +3 degrees for that messy punk look
            const rotation = Math.floor(Math.random() * 7) - 3;
            
            const posterHTML = `
                <a href="${file.url}" target="_blank" class="poster-item" style="transform: rotate(${rotation}deg);">
                    ${file.name}
                </a>
            `;
            // Add the new poster to the grid
            grid.innerHTML += posterHTML;
        });

    } catch (err) {
        grid.innerHTML = "<p style='padding: 2rem; color: red;'>Someone ripped down the flyers (Connection Error).</p>";
        console.error(err);
    }
}

// Run the function when the page loads
loadPosterboard();