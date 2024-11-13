let openWindow;
let refreshInterval;
let urlToOpen = '';

const urlInput = document.getElementById('urlInput');
const runBtn = document.getElementById('runBtn');
const stopBtn = document.getElementById('stopBtn');
const statusMessage = document.getElementById('statusMessage');

function startRefreshing() {
    urlToOpen = urlInput.value.trim();

    if (urlToOpen && isValidURL(urlToOpen)) {

        runBtn.disabled = true;
        stopBtn.disabled = false;

        statusMessage.textContent = `Opening and closing ${urlToOpen} repeatedly...`;
        openWindow = window.open(urlToOpen, '_blank');
        refreshInterval = setInterval(() => {
            if (openWindow && !openWindow.closed) {
                openWindow.close();
            }
            openWindow = window.open(urlToOpen, '_blank');
        }, 1000); // change time interval (use longer time so github doestn block your ip ig)
    } else {
        statusMessage.textContent = 'Please enter a valid URL goofball.';
    }
}

function stopRefreshing() {
    clearInterval(refreshInterval);

    if (openWindow && !openWindow.closed) {
        openWindow.close();
    }
    stopBtn.disabled = true;
    runBtn.disabled = false;

    statusMessage.textContent = 'Refreshing stopped. Enter a new URL to start again.';
}

function isValidURL(url) {
    const pattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return pattern.test(url);
}

runBtn.addEventListener('click', startRefreshing);
stopBtn.addEventListener('click', stopRefreshing);

// Doesnt work this part is idk maybe switching so fast
window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'x') {
        event.preventDefault();
        stopRefreshing();
    }
});


// do something