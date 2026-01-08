function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let draggedElement = document.getElementById(data);
    
    let targetList = ev.currentTarget.querySelector('.task-list');
    targetList.appendChild(draggedElement);

    if (ev.currentTarget.id === "completed") {
        draggedElement.classList.add("completed-task");
        alert("Task Completed Successfully");
    } else {
        draggedElement.classList.remove("completed-task");
    }
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (input.value.trim() === "") return;

    let taskId = "task-" + Date.now();
    let date = new Date().toLocaleDateString();

    let card = document.createElement("div");
    card.className = "task-card";
    card.id = taskId;
    card.draggable = true;
    card.ondragstart = drag;

    card.innerHTML = `
        <strong>${input.value}</strong>
        <span class="date-text">Added: ${date}</span>
    `;

    document.querySelector("#todo .task-list").appendChild(card);
    
    input.value = "";
}