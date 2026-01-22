let formData = {};
let currentStage = 1;
const totalStages = 4;

const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const errorBox = document.getElementById('errorBox');

function isStageValid(stage) {
    errorBox.innerText = ""; 
    
    if (stage === 1) {
        const fname = document.getElementById('firstName').value;
        const email = document.getElementById('email').value;
        if (fname.length < 2) return "Name is too short.";
        if (!email.includes("@")) return "Invalid email address.";
    } 
    
    if (stage === 2) {
        const pass = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPass').value;
        if (pass.length < 8) return "Password must be at least 8 characters.";
        if (pass !== confirm) return "Passwords do not match.";
    }
    
    if (stage === 3) {
        const terms = document.getElementById('terms').checked;
        const plan = document.getElementById('plan').value;
        if (!terms) return "You must accept the terms.";
        if (!plan) return "Please select a plan.";
    }

    return true; 
}

function updateUI() {
    for (let i = 1; i <= totalStages; i++) {
        document.getElementById(`stage${i}`).hidden = (i !== currentStage);
    }

    const progressPercent = (currentStage / totalStages) * 100;
    document.getElementById('progressBar').style.width = `${progressPercent}%`;
    document.getElementById('stageNumber').innerText = currentStage;

    prevBtn.disabled = (currentStage === 1);
    
    if (currentStage === totalStages) {
        nextBtn.hidden = true;
        submitBtn.hidden = false;
        renderReview(); 
    } else {
        nextBtn.hidden = false;
        submitBtn.hidden = true;
    }
}

function renderReview() {
    const summary = document.getElementById('reviewSummary');
    formData = {
        Name: document.getElementById('firstName').value,
        Email: document.getElementById('email').value,
        Plan: document.getElementById('plan').value
    };
    
    summary.innerHTML = `
        <p><strong>Name:</strong> ${formData.Name}</p>
        <p><strong>Email:</strong> ${formData.Email}</p>
        <p><strong>Plan:</strong> ${formData.Plan}</p>
    `;
}

nextBtn.addEventListener('click', () => {
    const validationResult = isStageValid(currentStage);
    
    if (validationResult === true) {
        currentStage++;
        updateUI();
    } else {
        errorBox.innerText = validationResult; 
    }
});

prevBtn.addEventListener('click', () => {
    currentStage--;
    updateUI();
});

document.getElementById('multiStageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Form Submitted Successfully!");
    console.log("Final Data Collected:", formData);
});

updateUI();