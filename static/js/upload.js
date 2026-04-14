// REPLACE THIS URL WITH YOUR NEW WEB APP URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTLBPHegkWFRDJAKTdDYXdYAm3DbA4M9Vdg6dcY8ZT_K_F2xlLCEvXfJrRfPLmigxD/exec";

async function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    const btn = document.querySelector('.btn');
    if (!fileInput.files.length) return alert("Select a file first.");

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    btn.innerText = "UPLOADING...";
    btn.disabled = true;

    reader.onload = async () => {
        const base64 = reader.result.split(',')[1];
        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify({ base64: base64, type: file.type, name: file.name })
            });
            alert("Upload Successful!");
        } catch (e) {
            alert("Upload failed. Check console.");
            console.error(e);
        } finally {
            btn.innerText = "PUSH TO DRIVE";
            btn.disabled = false;
        }
    };
    reader.readAsDataURL(file);
}