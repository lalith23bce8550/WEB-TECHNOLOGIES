let xmlDoc = null;

document.addEventListener("DOMContentLoaded", loadXML);

function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "books.xml?t=" + new Date().getTime(), true);
    xhr.responseType = "document";

    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseXML) {
            xmlDoc = xhr.responseXML;
            if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                showMessage("Error parsing XML file.", "error");
            } else {
                renderTable();
            }
        } else {
            showMessage("Failed to load XML data.", "error");
        }
    };
    xhr.send();
}

function renderTable() {
    const tableBody = document.getElementById("bookTableBody");
    tableBody.innerHTML = "";

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        
        const id = book.getElementsByTagName("id")[0].textContent;
        const title = book.getElementsByTagName("title")[0].textContent;
        const author = book.getElementsByTagName("author")[0].textContent;
        const status = book.getElementsByTagName("status")[0].textContent;

        const badgeClass = status === "Available" ? "status-available" : "status-checked";

        const row = `
            <tr>
                <td>${id}</td>
                <td><strong>${title}</strong></td>
                <td>${author}</td>
                <td><span class="${badgeClass}">${status}</span></td>
                <td>
                    <button class="btn-toggle" onclick="toggleStatus('${id}')">Change Status</button>
                    <button class="btn-delete" onclick="deleteBook('${id}')">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }
}

function addBook() {
    const title = document.getElementById("newTitle").value.trim();
    const author = document.getElementById("newAuthor").value.trim();
    const status = document.getElementById("newStatus").value;

    if (!title || !author) {
        showMessage("Please enter both Title and Author.", "error");
        return;
    }

    const books = xmlDoc.getElementsByTagName("book");
    let maxId = 0;
    for(let i=0; i<books.length; i++) {
        const currentId = parseInt(books[i].getElementsByTagName("id")[0].textContent);
        if(currentId > maxId) maxId = currentId;
    }
    const newId = maxId + 1;

    const newBook = xmlDoc.createElement("book");

    function createTag(name, value) {
        const tag = xmlDoc.createElement(name);
        const text = xmlDoc.createTextNode(value);
        tag.appendChild(text);
        return tag;
    }

    newBook.appendChild(createTag("id", newId));
    newBook.appendChild(createTag("title", title));
    newBook.appendChild(createTag("author", author));
    newBook.appendChild(createTag("status", status));

    xmlDoc.documentElement.appendChild(newBook);
    

    renderTable();
    clearForm();
    showMessage("Book added successfully!", "success");
}

window.toggleStatus = function(id) {
    const books = xmlDoc.getElementsByTagName("book");
    
    for (let i = 0; i < books.length; i++) {
        const bookId = books[i].getElementsByTagName("id")[0].textContent;
        
        if (bookId == id) {
            const statusNode = books[i].getElementsByTagName("status")[0];
            const currentStatus = statusNode.textContent;
            const newStatus = currentStatus === "Available" ? "Checked Out" : "Available";
            
            statusNode.textContent = newStatus;
            
            renderTable();
            showMessage(`Status updated to: ${newStatus}`, "success");
            return;
        }
    }
};

window.deleteBook = function(id) {
    if (!confirm("Are you sure you want to remove this book?")) return;

    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const bookId = books[i].getElementsByTagName("id")[0].textContent;
        
        if (bookId == id) {
            const nodeToRemove = books[i];
            nodeToRemove.parentNode.removeChild(nodeToRemove);
            
            renderTable();
            showMessage("Book deleted.", "success");
            return;
        }
    }
};

function clearForm() {
    document.getElementById("newTitle").value = "";
    document.getElementById("newAuthor").value = "";
}

function showMessage(msg, type) {
    const box = document.getElementById("message");
    box.textContent = msg;
    box.className = `message ${type}`;
    box.classList.remove("hidden");
    setTimeout(() => box.classList.add("hidden"), 3000);
}