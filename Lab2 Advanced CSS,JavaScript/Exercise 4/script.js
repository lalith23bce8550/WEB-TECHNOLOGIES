const form = document.getElementById('registrationForm');
const userList = document.getElementById('userList');
const clearBtn = document.getElementById('clearAll');

document.addEventListener('DOMContentLoaded', displayUsers);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const mobile = document.getElementById('userMobile').value;
    const password = document.getElementById('userPass').value;

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Mobile number must be exactly 10 digits.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    const newUser = { name, email, mobile, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    displayUsers();
});

function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.mobile}</td>
                <td><button class="btn-delete" onclick="deleteUser(${index})">Delete</button></td>
            </tr>
        `;
        userList.innerHTML += row;
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    displayUsers();
}

clearBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all users?")) {
        localStorage.removeItem('users');
        displayUsers();
    }
});