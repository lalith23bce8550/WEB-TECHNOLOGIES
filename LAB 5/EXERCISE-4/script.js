let inventory = [];
let editMode = false;

document.addEventListener('DOMContentLoaded', () => {
    loadInventory();

    document.getElementById('searchCategory').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = inventory.filter(item =>
            item.category.toLowerCase().includes(query)
        );
        renderTable(filtered);
    });

    document.getElementById('inventoryForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('prodName').value.trim();
        const category = document.getElementById('prodCategory').value.trim();
        const price = parseFloat(document.getElementById('prodPrice').value);
        const stock = parseInt(document.getElementById('prodStock').value);

        if (price < 0 || stock < 0) {
            showError("Price and Stock cannot be negative.");
            return;
        }

        if (editMode) {
            updateProduct(name, category, price, stock);
        } else {
            addProduct(name, category, price, stock);
        }
    });

    document.getElementById('cancelBtn').addEventListener('click', resetForm);
});

async function loadInventory() {
    try {
        const response = await fetch('inventory.json');
        if (!response.ok) throw new Error("Failed to load inventory.");

        inventory = await response.json();
        renderTable(inventory);
    } catch (error) {
        showError("Error loading data: " + error.message);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    let totalVal = 0;

    data.forEach(item => {
        totalVal += (item.price * item.stock);

        const rowClass = item.stock < 5 ? 'low-stock' : '';
        const stockDisplay = item.stock < 5 ? `${item.stock} ⚠️` : item.stock;

        const row = `
            <tr class="${rowClass}">
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${stockDisplay}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="prepareEdit(${item.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteProduct(${item.id})">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    document.getElementById('totalValue').textContent = `$${totalVal.toFixed(2)}`;
}

function addProduct(name, category, price, stock) {
    const newId = inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
    inventory.push({ id: newId, name, category, price, stock });

    renderTable(inventory);
    resetForm();
    showError("");
}

window.prepareEdit = function(id) {
    const product = inventory.find(p => p.id === id);
    if (!product) return;

    document.getElementById('editId').value = product.id;
    document.getElementById('prodName').value = product.name;
    document.getElementById('prodCategory').value = product.category;
    document.getElementById('prodPrice').value = product.price;
    document.getElementById('prodStock').value = product.stock;

    editMode = true;
    document.getElementById('formTitle').textContent = "Edit Product Details";
    document.getElementById('saveBtn').textContent = "Update Product";
    document.getElementById('cancelBtn').classList.remove('hidden');
    window.scrollTo(0, 0);
};

function updateProduct(name, category, price, stock) {
    const id = parseInt(document.getElementById('editId').value);
    const index = inventory.findIndex(p => p.id === id);

    if (index !== -1) {
        inventory[index] = { id, name, category, price, stock };
        renderTable(inventory);
        resetForm();
    }
}

window.deleteProduct = function(id) {
    if (confirm("Delete this product?")) {
        inventory = inventory.filter(p => p.id !== id);
        renderTable(inventory);
    }
};

function resetForm() {
    document.getElementById('inventoryForm').reset();
    editMode = false;
    document.getElementById('formTitle').textContent = "Add New Product";
    document.getElementById('saveBtn').textContent = "Add Product";
    document.getElementById('cancelBtn').classList.add('hidden');
    showError("");
}

function showError(msg) {
    const errBox = document.getElementById('errorMsg');
    errBox.textContent = msg;
    errBox.classList.remove('hidden');
    if (!msg) errBox.classList.add('hidden');
}