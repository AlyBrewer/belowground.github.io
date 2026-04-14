var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTLBPHegkWFRDJAKTdDYXdYAm3DbA4M9Vdg6dcY8ZT_K_F2xlLCEvXfJrRfPLmigxD/exec";

// --- UPGRADED: Smarter Date Parser ---
function formatFlyerText(filename) {
    let cleanName = filename.replace(/\.[^/.]+$/, "");
    
    // This regex looks for ANY combo of numbers and dashes (e.g. 4-11-2026 OR 2026-04-11)
    // followed by a dash, space, or underscore, and then the Venue name.
    const dateMatch = cleanName.match(/^(\d{1,4}[-/]\d{1,2}[-/]\d{1,4})[-_ ]+(.*)/);
    
    if (dateMatch) {
        const rawDate = dateMatch[1]; 
        // Replace any remaining dashes in the venue name with spaces (North-End -> North End)
        const venue = dateMatch[2].replace(/-/g, ' ');   
        
        // Let JavaScript's native date engine figure out the messy formatting
        const dateObj = new Date(rawDate); 
        
        if (!isNaN(dateObj)) {
            const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return `<strong>${venue}</strong><br><span style="font-size: 0.85em; opacity: 0.7;">${formattedDate}</span>`;
        }
    }
    return cleanName;
}

// --- MAIN FUNCTION ---
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

        grid.innerHTML = "";

        files.forEach((file) => {
            const rotation = Math.floor(Math.random() * 7) - 3;
            const match = file.url.match(/[-\w]{25,}/); 
            const prettyText = formatFlyerText(file.name);
            
            let displayContent = `<div style="padding: 10px;">${prettyText}</div>`; 
            
            if (match && match[0]) {
                const fileId = match[0];
                // Using the Thumbnail API instead of the export link to bypass Firefox strict mode
                const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
                
                displayContent = `
                    <img src="${imageUrl}" alt="${file.name}" class="poster-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="poster-fallback" style="display: none; padding: 10px; text-align: center;">${prettyText}</div>
                `;
            }

            const posterHTML = `
                <a href="${file.url}" target="_blank" class="poster-item" style="transform: rotate(${rotation}deg);" title="${file.name}">
                    ${displayContent}
                </a>
            `;
            
            grid.innerHTML += posterHTML;
        });

    } catch (err) {
        grid.innerHTML = "<p style='padding: 2rem; color: red;'>Someone ripped down the flyers (Connection Error).</p>";
        console.error(err);
    }
}

loadPosterboard();