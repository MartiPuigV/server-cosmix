async function getUploads(amount) {
    const url = 'http://localhost:8000/muons/';

    console.log(url + String(amount));

    const response = await fetch(url + String(amount));

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}


async function setup() {
    const data = await getUploads(10);
    const div = document.getElementById('data-wrap-js')
    data.forEach(line => {
        const wrap = document.createElement('div')
        wrap.className = 'data'
        const ptag = document.createElement('p')
        ptag.innerText = 'Ping at ' + line;
        wrap.appendChild(ptag);
        div.appendChild(wrap)
    });
    const last = parseInt(data.at(-1));
    console.log(last);
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
    console.log(currentTime-time);
    return currentTime-time < timeout;
}

setup();
