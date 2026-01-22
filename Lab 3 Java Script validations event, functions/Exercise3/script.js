const questions = [
    {
        id: "full_name",
        type: "text",
        label: "Full Name",
        required: true,
        charLimit: 20
    },
    {
        id: "user_role",
        type: "radio",
        label: "Select your Role",
        options: ["Student", "Professional", "Other"],
        required: true
    },
    {
        id: "interests",
        type: "checkbox",
        label: "Areas of Interest (Select at least 2)",
        options: ["Coding", "Design", "Marketing", "Research"],
        minSelect: 2
    }
];

const surveyRoot = document.getElementById('survey-root');
const surveyForm = document.getElementById('surveyForm');

function buildSurvey() {
    questions.forEach(q => {
        const fieldWrapper = document.createElement('div');
        fieldWrapper.style.marginBottom = "20px";
        
        const label = document.createElement('label');
        label.innerHTML = `<strong>${q.label}</strong>`;
        fieldWrapper.appendChild(label);
        
        const inputContainer = document.createElement('div');

        if (q.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = q.id;
            input.placeholder = "Enter text here...";
            inputContainer.appendChild(input);
        } 
        else if (q.type === 'radio' || q.type === 'checkbox') {
            q.options.forEach(opt => {
                const optLabel = document.createElement('label');
                optLabel.style.display = "block";
                
                const optInput = document.createElement('input');
                optInput.type = q.type;
                optInput.name = q.id; 
                optInput.value = opt;
                
                optLabel.appendChild(optInput);
                optLabel.append(` ${opt}`);
                inputContainer.appendChild(optLabel);
            });
        }

        const errorDisplay = document.createElement('div');
        errorDisplay.id = `error-${q.id}`;
        errorDisplay.style.color = "red";
        errorDisplay.style.fontSize = "12px";
        errorDisplay.style.marginTop = "5px";

        fieldWrapper.appendChild(inputContainer);
        fieldWrapper.appendChild(errorDisplay);
        surveyRoot.appendChild(fieldWrapper);
    });
}

function validateForm() {
    let isFormValid = true;

    questions.forEach(q => {
        const errorDisplay = document.getElementById(`error-${q.id}`);
        let errorMessage = "";

        if (q.type === 'text') {
            const val = document.getElementById(q.id).value.trim();
            if (q.required && val === "") {
                errorMessage = "This field is mandatory.";
            } else if (q.charLimit && val.length > q.charLimit) {
                errorMessage = `Exceeds limit of ${q.charLimit} characters.`;
            }
        } 
        else if (q.type === 'radio') {
            const checked = document.querySelector(`input[name="${q.id}"]:checked`);
            if (q.required && !checked) {
                errorMessage = "Please select one option.";
            }
        } 
        else if (q.type === 'checkbox') {
            const checkedCount = document.querySelectorAll(`input[name="${q.id}"]:checked`).length;
            if (q.minSelect && checkedCount < q.minSelect) {
                errorMessage = `Please select at least ${q.minSelect} choices.`;
            }
        }

        if (errorMessage) {
            errorDisplay.innerText = errorMessage;
            isFormValid = false;
        } else {
            errorDisplay.innerText = "";
        }
    });

    return isFormValid;
}

surveyForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const isValid = validateForm();
    const statusMsg = document.getElementById('statusMessage');

    if (isValid) {
        statusMsg.style.color = "green";
        statusMsg.innerHTML = "<strong>Success! Survey submitted.</strong>";
    } else {
        statusMsg.style.color = "red";
        statusMsg.innerHTML = "<strong>Error: Please fix the fields highlighted above.</strong>";
    }
});

buildSurvey();