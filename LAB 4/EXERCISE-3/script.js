const MockServer = {
    db: [
        { id: 101, name: "Mourya", dept: "Computer Science", marks: 85 },
        { id: 102, name: "Bobby", dept: "Arts", marks: 70 },
        { id: 103, name: "chian", dept: "Mathematics", marks: 90 }
    ],

    request(method, data = null) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (method === 'GET') {
                    resolve({ status: 200, ok: true, json: () => Promise.resolve(this.db) });
                } 
                else if (method === 'POST') {
                    const exists = this.db.find(s => s.id == data.id);
                    if (exists) {
                        resolve({ status: 400, ok: false, json: () => Promise.resolve({ error: "ID already exists" }) });
                    } else {
                        this.db.push(data);
                        resolve({ status: 201, ok: true, json: () => Promise.resolve({ message: "Added successfully" }) });
                    }
                } 
                else if (method === 'PUT') {
                    const index = this.db.findIndex(s => s.id == data.id);
                    if (index !== -1) {
                        this.db[index] = data;
                        resolve({ status: 200, ok: true, json: () => Promise.resolve({ message: "Updated successfully" }) });
                    } else {
                        resolve({ status: 404, ok: false, json: () => Promise.resolve({ error: "Student not found" }) });
                    }
                } 
                else if (method === 'DELETE') {
                    const initialLength = this.db.length;
                    this.db = this.db.filter(s => s.id != data.id);
                    if (this.db.length < initialLength) {
                        resolve({ status: 200, ok: true, json: () => Promise.resolve({ message: "Deleted successfully" }) });
                    } else {
                        resolve({ status: 404, ok: false, json: () => Promise.resolve({ error: "Delete failed. ID not found." }) });
                    }
                }
            }, 500); 
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const tableBody = document.getElementById('studentTableBody');
    const msgBox = document.getElementById('messageBox');
    const formTitle = document.getElementById('formTitle');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    fetchStudents();

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const dept = document.getElementById('department').value;
        const marks = document.getElementById('marks').value;
        const isEdit = document.getElementById('editMode').value === "true";

        const studentData = { id, name, dept, marks };

        if (isEdit) {
            updateStudent(studentData);
        } else {
            createStudent(studentData);
        }
    });

 
    function fetchStudents() {
        MockServer.request('GET')
            .then(res => res.json())
            .then(data => renderTable(data))
            .catch(err => showMessage("Failed to fetch data", "error"));
    }

    function createStudent(student) {
        MockServer.request('POST', student)
            .then(res => handleResponse(res, "Student added successfully!"))
            .catch(err => showMessage("Server Error", "error"));
    }

    function updateStudent(student) {
        MockServer.request('PUT', student)
            .then(res => handleResponse(res, "Student updated successfully!"))
            .catch(err => showMessage("Server Error", "error"));
    }

    window.deleteStudent = function(id) {
        if(confirm("Are you sure you want to delete ID: " + id + "?")) {
            MockServer.request('DELETE', { id: id })
                .then(res => handleResponse(res, "Student deleted!"))
                .catch(err => showMessage("Server Error", "error"));
        }
    };


    function handleResponse(response, successText) {
        if (response.ok) {
            showMessage(successText, "success");
            resetForm();
            fetchStudents();
        } else {
            response.json().then(data => showMessage(data.error || "Error occurred", "error"));
        }
    }

    function renderTable(students) {
        tableBody.innerHTML = "";
        students.forEach(s => {
            const row = `
                <tr>
                    <td>${s.id}</td>
                    <td>${s.name}</td>
                    <td>${s.dept}</td>
                    <td>${s.marks}</td>
                    <td>
                        <button class="edit-btn" onclick="prepareEdit('${s.id}', '${s.name}', '${s.dept}', '${s.marks}')">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent('${s.id}')">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    window.prepareEdit = function(id, name, dept, marks) {
        document.getElementById('studentId').value = id;
        document.getElementById('studentId').readOnly = true; 
        document.getElementById('name').value = name;
        document.getElementById('department').value = dept;
        document.getElementById('marks').value = marks;

        document.getElementById('editMode').value = "true";
        formTitle.textContent = "Edit Student";
        saveBtn.textContent = "Update Student";
        saveBtn.className = "btn edit-btn";
        cancelBtn.classList.remove('hidden');
    };

    function resetForm() {
        studentForm.reset();
        document.getElementById('studentId').readOnly = false;
        document.getElementById('editMode').value = "false";
        formTitle.textContent = "Add New Student";
        saveBtn.textContent = "Add Student";
        saveBtn.className = "btn primary";
        cancelBtn.classList.add('hidden');
    }

    cancelBtn.addEventListener('click', resetForm);

    function showMessage(msg, type) {
        msgBox.textContent = msg;
        msgBox.className = `message ${type}`;
        msgBox.classList.remove('hidden');
        setTimeout(() => msgBox.classList.add('hidden'), 3000);
    }
});