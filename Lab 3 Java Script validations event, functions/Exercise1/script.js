const validationRules = {
    Student: { 
        domain: "edu.com", 
        minAge: 16, 
        passRegex: /.{6,}/, 
        passHint: "Min 6 characters" 
    },
    Teacher: { 
        domain: "staff.com", 
        minAge: 21, 
        passRegex: /.{8,}/, 
        passHint: "Min 8 characters" 
    },
    Admin: { 
        domain: "admin.com", 
        minAge: 25, 
        passRegex: /^(?=.*[A-Z])(?=.*\d).{10,}$/, 
        passHint: "Min 10 chars, 1 Uppercase, 1 Number" 
    }
};

const form = document.getElementById('registrationForm');
const roleSelect = document.getElementById('role');

roleSelect.addEventListener('change', () => {
    const skillsField = document.getElementById('skills-container');
    skillsField.style.display = (roleSelect.value === 'Admin') ? 'none' : 'block';
    validateForm(); 
});

function setStatus(element, isValid, message = "") {
    const errorDisplay = document.getElementById(`${element.id}Error`) || {};
    if (isValid) {
        element.classList.replace('invalid', 'valid') || element.classList.add('valid');
        if (errorDisplay.style) errorDisplay.style.display = 'none';
    } else {
        element.classList.replace('valid', 'invalid') || element.classList.add('invalid');
        if (errorDisplay.style) {
            errorDisplay.innerText = message;
            errorDisplay.style.display = 'block';
        }
    }
}

function validateForm() {
    const role = roleSelect.value;
    const rules = validationRules[role];

    const email = document.getElementById('email');
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    const age = document.getElementById('age');

    const isEmailValid = email.value.endsWith(`@${rules.domain}`);
    setStatus(email, isEmailValid, `Must be a @${rules.domain} email`);

    const isPassStrong = rules.passRegex.test(pass.value);
    setStatus(pass, isPassStrong, rules.passHint);

    const isMatch = pass.value === confirm.value && confirm.value !== "";
    setStatus(confirm, isMatch, "Passwords do not match");

    const isAgeValid = parseInt(age.value) >= rules.minAge;
    setStatus(age, isAgeValid, `Min age for ${role} is ${rules.minAge}`);

    return isEmailValid && isPassStrong && isMatch && isAgeValid;
}

form.addEventListener('input', validateForm);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
        alert("Registration Successful!");
    } else {
        alert("Please correct the errors in the form.");
    }
});