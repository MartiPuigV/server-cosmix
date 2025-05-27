async function getUploads(amount) {
    const url = 'https://server-cosmix.onrender.com/muons/';
    const response = await fetch(url + String(amount));

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function setup() {
    // Sets up the display of the latest 'amount' values
    let amount = 10;
    const data = await getUploads(amount);
    const div = document.getElementById('data-wrap-js')
    data.forEach(epoch_sec => {
        const date = new Date(epoch_sec*1000);
        const wrap = document.createElement('div')
        wrap.className = 'data'
        const ptag = document.createElement('p')
        ptag.innerText = 'Coincidence : ' + date.toUTCString();
        wrap.appendChild(ptag);
        div.appendChild(wrap)
    });
    const last = parseInt(data.at(-1))+3600;
    const status = validateStatus(300, last);
    updateStatus(status);
}

function updateStatus(status) {
    // Update the status of the server
    const statustag = document.getElementById('status-text');
    if (status) {
        statustag.innerText = 'Alive';
        statustag.style.color = 'green';
    } else {
        statustag.innerText = 'Down';
        statustag.style.color = 'red';
    }
}

function validateStatus(timeout, time) {
    // Assert if the server is down or not at function runtime
    const currentTime = Date.now()/1000;
    return currentTime-time < timeout;
}

setup(); // Call setup on page load
