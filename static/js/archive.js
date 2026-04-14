// REPLACE THIS URL WITH YOUR NEW WEB APP URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTLBPHegkWFRDJAKTdDYXdYAm3DbA4M9Vdg6dcY8ZT_K_F2xlLCEvXfJrRfPLmigxD/exec";

async function loadArchive() {
    const container = document.getElementById('archive-list');
    if (!container) return;
    
    container.innerHTML = "<p>Retrieving data...</p>";

    try {
        const response = await fetch(SCRIPT_URL);
        const files = await response.json();
        
        if (files.length === 0) {
            container.innerHTML = "<p>Archive empty.</p>";
            return;
        }

        container.innerHTML = files.map(f => `
            <div style="border: 1px solid var(--border); padding: 15px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${f.name}</strong><br>
                    <small>${f.size} | ${new Date(f.date).toLocaleDateString()}</small>
                </div>
                <a href="${f.url}" target="_blank" class="btn" style="padding: 5px 10px; font-size: 0.7rem; text-decoration: none;">VIEW</a>
            </div>
        `).join('');
    } catch (err) {
        container.innerHTML = "<p>Connection error.</p>";
        console.error(err);
    }
}

loadArchive();