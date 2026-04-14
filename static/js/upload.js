// USE YOUR NEWEST WEB APP URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCzCIo5B1isazCkBT1MxfMDZSxa8ypJJPKpabXg27HnQxPP5Yp9UmEFyen8UwnOJhjqg/exec";

async function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const dateInput = document.getElementById('showDate');
    const venueSelect = document.getElementById('venueSelect');
    const customVenue = document.getElementById('customVenue');
    const btn = document.querySelector('.btn');

    // Validation
    if (!fileInput.files.length || !dateInput.value || !venueSelect.value) {
        return alert("Please fill out all fields.");
    }

    let venue = venueSelect.value === 'OTHER' ? customVenue.value : venueSelect.value;
    if (!venue) return alert("Please enter a venue name.");

    const file = fileInput.files[0];
    const reader = new FileReader();
    btn.innerText = "UPLOADING...";
    btn.disabled = true;

    reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Apps Script requires no-cors for POST
                body: JSON.stringify({ 
                    base64: base64, 
                    type: file.type, 
                    date: dateInput.value, 
                    venue: venue 
                })
            });
            
            alert("Flyer posted to the board!");
            window.location.href = "/"; // Send them back to the board to see it!
            
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Check console.");
        } finally {
            btn.innerText = "PUSH TO DRIVE";
            btn.disabled = false;
        }
    };
    reader.readAsDataURL(file);
}