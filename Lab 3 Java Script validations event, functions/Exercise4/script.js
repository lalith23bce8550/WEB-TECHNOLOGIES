const activities = [];
let clickCount = 0;
const CLICK_THRESHOLD = 10;

const logDisplay = document.getElementById('activity-log');
const warningBox = document.getElementById('warning-box');

function logActivity(type, target, details = "") {
    const activity = {
        timestamp: new Date().toLocaleTimeString(),
        type: type,
        target: target,
        details: details
    };

    activities.push(activity);
    updateDisplay(activity);
    checkSecurity(type);
}

function updateDisplay(activity) {
    const li = document.createElement('li');
    li.innerHTML = `[${activity.timestamp}] ${activity.type} on ${activity.target} ${activity.details}`;
    logDisplay.insertBefore(li, logDisplay.firstChild);

    if (logDisplay.children.length > 15) {
        logDisplay.removeChild(logDisplay.lastChild);
    }
}

function checkSecurity(type) {
    if (type === 'CLICK') {
        clickCount++;
        if (clickCount > CLICK_THRESHOLD) {
            warningBox.innerText = "WARNING: Suspicious rapid clicking detected!";
        }
    }
}

function resetLog() {
    activities.length = 0;
    clickCount = 0;
    logDisplay.innerHTML = "";
    warningBox.innerText = "";
}

function exportLog() {
    let output = "User Activity Log\n\n";
    activities.forEach((a, i) => {
        output += `${i + 1}. [${a.timestamp}] ${a.type} on ${a.target} ${a.details}\n`;
    });
    alert(output);
}

document.addEventListener('focus', (e) => {
    logActivity('FOCUS', e.target.tagName, `(ID: ${e.target.id || 'none'})`);
}, true);

document.addEventListener('click', (e) => {
    logActivity('CLICK', e.target.tagName, `(Text: ${e.target.innerText || 'N/A'})`);
});

document.addEventListener('keydown', (e) => {
    logActivity('KEYPRESS', 'Window', `(Key: ${e.key})`);
});

document.addEventListener('blur', (e) => {
    logActivity('BLUR', e.target.tagName);
}, true);
