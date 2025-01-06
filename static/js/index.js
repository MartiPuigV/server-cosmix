async function getUploads(amount) {
    const url = 'http://localhost:8000/muons/';
    const response = await fetch(url + String(amount));

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

async function setup() {
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
    const last = parseInt(data.at(-1));
    const status = validateStatus(300, last);
    updateStatus(status);
}

function updateStatus(status) {
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
    const currentTime = Date.now()/1000;
    return currentTime-time < timeout;
}

setup();
