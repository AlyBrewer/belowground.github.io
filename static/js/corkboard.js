// 1. Make sure this matches your NEW Deployment URL exactly!
const API_URL = "https://script.google.com/macros/s/AKfycbwCzCIo5B1isazCkBT1MxfMDZSxa8ypJJPKpabXg27HnQxPP5Yp9UmEFyen8UwnOJhjqg/exec"; 
let currentPage = 1;

async function loadPosterboard(page = 1) {
    const grid = document.getElementById('poster-grid');
    if (!grid) return;

    grid.innerHTML = "<p style='padding: 2rem; font-weight: bold;'>Pinning up flyers...</p>";

    try {
        // Change limit to 20 here
        const response = await fetch(`${API_URL}?page=${page}&limit=20&index=${page === 1}`);
        const data = await response.json();
        
        if (!data.posters || data.posters.length === 0) {
            grid.innerHTML = "<p style='padding: 2rem;'>The board is empty.</p>";
            return;
        }

        grid.innerHTML = "";

        data.posters.forEach((poster) => {
            const rotation = Math.floor(Math.random() * 7) - 3;
            
            const posterHTML = `
                <a href="https://drive.google.com/open?id=${poster.id}" target="_blank" class="poster-item" style="transform: rotate(${rotation}deg);">
                    <img src="${poster.imageUrl}" alt="${poster.venue}" class="poster-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div class="poster-fallback" style="display: none; padding: 10px; text-align: center;">
                        <strong>${poster.venue}</strong><br>
                        <span style="opacity: 0.7;">${poster.displayDate}</span>
                    </div>
                </a>
            `;
            grid.innerHTML += posterHTML;
        });

        renderPagination(data.currentPage, data.totalPages);

    } catch (err) {
        grid.innerHTML = "<p style='padding: 2rem; color: red;'>Someone ripped down the flyers (Connection Error).</p>";
        console.error(err);
    }
}

function renderPagination(current, total) {
    let controls = document.getElementById('pagination-controls');
    if (!controls) {
        controls = document.createElement('div');
        controls.id = 'pagination-controls';
        controls.className = 'pagination';
        document.querySelector('.corkboard').after(controls);
    }

    controls.innerHTML = `
        <button class="page-btn" onclick="changePage(-1)" ${current <= 1 ? 'disabled' : ''}>← Newer</button>
        <span>Page ${current} of ${total}</span>
        <button class="page-btn" onclick="changePage(1)" ${current >= total ? 'disabled' : ''}>Older →</button>
    `;
}

window.changePage = function(step) {
    currentPage += step;
    loadPosterboard(currentPage);
    document.querySelector('.corkboard').scrollIntoView({ behavior: 'smooth' });
};

loadPosterboard(1);