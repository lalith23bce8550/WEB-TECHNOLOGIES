let employees = [];

document.addEventListener('DOMContentLoaded', () => {
    loadXMLData();
});

function loadXMLData() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    
    xhr.responseType = "document";

    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseXML) {
            const xmlDoc = xhr.responseXML;
            parseXML(xmlDoc);
        } else {
            showNotification("Failed to load XML file.", "error");
        }
    };

    xhr.onerror = function() {
        showNotification("Network Error. Please run on a local server.", "error");
    };

    xhr.send();
}

function parseXML(xmlDoc) {
    const empNodes = xmlDoc.getElementsByTagName("employee");
    
    if (empNodes.length === 0) {
        showNotification("XML file is empty.", "error");
        return;
    }

    for (let i = 0; i < empNodes.length; i++) {
        const emp = empNodes[i];
        
        const getValue = (tag) => {
            const el = emp.getElementsByTagName(tag)[0];
            return el ? el.textContent : "";
        };

        const newEmployee = {
            id: getValue("id"),
            name: getValue("name"),
            dept: getValue("department"),
            salary: getValue("salary")
        };
        
        employees.push(newEmployee);
    }
    
    renderTable();
    showNotification("Data loaded from XML successfully!", "success");
}

function renderTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    employees.forEach((emp, index) => {
        const row = `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.dept}</td>
                <td>$${emp.salary}</td>
                <td>
                    <button class="action-btn edit" onclick="prepareEdit(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteEmployee(${index})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function addEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    if (!id || !name || !salary) {
        showNotification("Please fill all fields.", "error");
        return;
    }

    if (employees.some(e => e.id == id)) {
        showNotification("Employee ID already exists!", "error");
        return;
    }

    employees.push({ id, name, dept, salary });
    renderTable();
    clearForm();
    showNotification("Employee added successfully!", "success");
}

window.deleteEmployee = function(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        renderTable();
        showNotification("Employee deleted.", "success");
    }
};

window.prepareEdit = function(index) {
    const emp = employees[index];
    document.getElementById("empId").value = emp.id;
    document.getElementById("empId").disabled = true;
    document.getElementById("empName").value = emp.name;
    document.getElementById("empDept").value = emp.dept;
    document.getElementById("empSalary").value = emp.salary;
    
    document.getElementById("editIndex").value = index;

    document.getElementById("addBtn").classList.add("hidden");
    document.getElementById("updateBtn").classList.remove("hidden");
    document.getElementById("cancelBtn").classList.remove("hidden");
};

function updateEmployee() {
    const index = document.getElementById("editIndex").value;
    const name = document.getElementById("empName").value;
    const dept = document.getElementById("empDept").value;
    const salary = document.getElementById("empSalary").value;

    employees[index].name = name;
    employees[index].dept = dept;
    employees[index].salary = salary;

    renderTable();
    cancelEdit();
    showNotification("Employee details updated!", "success");
}

function cancelEdit() {
    clearForm();
    document.getElementById("empId").disabled = false;
    document.getElementById("addBtn").classList.remove("hidden");
    document.getElementById("updateBtn").classList.add("hidden");
    document.getElementById("cancelBtn").classList.add("hidden");
}

function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empSalary").value = "";
}

function showNotification(msg, type) {
    const notif = document.getElementById("notification");
    notif.textContent = msg;
    notif.className = `notification ${type}`;
    notif.classList.remove("hidden");
    setTimeout(() => notif.classList.add("hidden"), 3000);
}