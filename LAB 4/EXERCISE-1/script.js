document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const feedback = document.getElementById('feedback');
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');

    let timeout = null;

    usernameInput.addEventListener('input', function() {
        const username = this.value.trim();

        clearFeedback();
        submitBtn.disabled = true;

        if (username === "") return;

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            checkAvailability(username);
        }, 500);
    });

    function checkAvailability(username) {
        loading.classList.remove('hidden');

        fetch('users.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                setTimeout(() => {
                    validateUsername(users, username);
                    loading.classList.add('hidden'); 
                }, 500); 
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                feedback.textContent = "Error checking availability.";
                feedback.className = "message error";
                loading.classList.add('hidden');
            });
    }

    function validateUsername(existingUsers, currentInput) {
        const isTaken = existingUsers.some(u => u.toLowerCase() === currentInput.toLowerCase());

        if (isTaken) {
            feedback.textContent = "Username already taken";
            feedback.className = "message error";
            submitBtn.disabled = true;
        } else {
            feedback.textContent = "Username available";
            feedback.className = "message success";
            submitBtn.disabled = false;
        }
    }

    function clearFeedback() {
        feedback.textContent = "";
        feedback.className = "message";
        loading.classList.add('hidden');
    }
    
    document.getElementById('regForm').addEventListener('submit', (e) => {
        if(submitBtn.disabled) {
            e.preventDefault();
        } else {
            alert("Form submitted successfully!");
        }
    });
});