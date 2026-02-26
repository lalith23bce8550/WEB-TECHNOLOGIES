let students = [];
let isEditing = false;

document.addEventListener('DOMContentLoaded', () => {
    fetchData();

    document.getElementById('studentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEditing) {
            updateStudent();
        } else {
            addStudent();
        }
    });

    document.getElementById('cancelBtn').addEventListener('click', resetForm);
});

function fetchData() {
    fetch('students.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON file");
            return response.json();
        })
        .then(data => {
            students = data;
            renderTable();
        })
        .catch(error => {
            console.error(error);
            showMessage("Error parsing JSON data. Check console.", "error");
        });
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.marks}</td>
                <td>
                    <button class="btn-edit" onclick="prepareEdit(${student.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function addStudent() {
    const name = document.getElementById('name').value.trim();
    const course = document.getElementById('course').value.trim();
    const marks = document.getElementById('marks').value;

    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 101;

    const newStudent = { id: newId, name, course, marks: parseInt(marks) };
    
    students.push(newStudent);
    renderTable();
    resetForm();
    showMessage("Student added successfully!", "success");
}

window.prepareEdit = function(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;

    document.getElementById('editId').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('course').value = student.course;
    document.getElementById('marks').value = student.marks;

    isEditing = true;
    document.getElementById('formTitle').textContent = "Edit Student Details";
    document.getElementById('submitBtn').textContent = "Update";
    document.getElementById('submitBtn').classList.remove('btn-primary');
    document.getElementById('submitBtn').classList.add('btn-edit');
    document.getElementById('cancelBtn').classList.remove('hidden');
};

function updateStudent() {
    const id = parseInt(document.getElementById('editId').value);
    const name = document.getElementById('name').value.trim();
    const course = document.getElementById('course').value.trim();
    const marks = document.getElementById('marks').value;

    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { id, name, course, marks: parseInt(marks) };
        renderTable();
        resetForm();
        showMessage("Student details updated!", "success");
    }
}

window.deleteStudent = function(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        students = students.filter(s => s.id !== id);
        renderTable();
        showMessage("Student deleted.", "success");
    }
};

function resetForm() {
    document.getElementById('studentForm').reset();
    isEditing = false;
    document.getElementById('editId').value = '';
    document.getElementById('formTitle').textContent = "Add New Student";
    document.getElementById('submitBtn').textContent = "Add Student";
    document.getElementById('submitBtn').classList.remove('btn-edit');
    document.getElementById('submitBtn').classList.add('btn-primary');
    document.getElementById('cancelBtn').classList.add('hidden');
}

function showMessage(msg, type) {
    const box = document.getElementById('msgBox');
    box.textContent = msg;
    box.className = `message ${type}`;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 3000);
}