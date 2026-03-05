document.addEventListener('DOMContentLoaded', loadNotes);

const form = document.getElementById('noteForm');
const noteIdInput = document.getElementById('noteId');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const formTitle = document.getElementById('formTitle');

// 1. View Notes (GET /notes)
async function loadNotes() {
    try {
        const response = await fetch('/notes');
        const notes = await response.json();
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';

        if (notes.length === 0) {
            notesList.innerHTML = '<p>No notes found. Add one above!</p>';
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card';
            card.innerHTML = `
                <div class="note-header">
                    <span class="note-title">${note.title}</span>
                    <span class="note-subject">${note.subject}</span>
                </div>
                <p>${note.description}</p>
                <small>Created: ${note.created_date}</small>
                <div class="note-actions">
                    <button class="btn-edit" onclick="editNote('${note._id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteNote('${note._id}')">Delete</button>
                </div>
            `;
            notesList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading notes:', error);
        document.getElementById('notesList').innerHTML = '<p>Error loading notes.</p>';
    }
}

// 2. Add/Update Note (POST /notes OR PUT /notes/:id)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = noteIdInput.value;
    const title = document.getElementById('title').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;

    const url = id ? `/notes/${id}` : '/notes';
    const method = id ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, subject, description })
        });

        if (response.ok) {
            resetForm();
            loadNotes();
        } else {
            alert('Error saving note');
        }
    } catch (error) {
        console.error('Error saving note:', error);
        alert('Error saving note');
    }
});

// 3. Edit Note (Populate Form)
async function editNote(id) {
    try {
        const response = await fetch(`/notes/${id}`);
        const note = await response.json();
        
        noteIdInput.value = note._id;
        document.getElementById('title').value = note.title;
        document.getElementById('subject').value = note.subject;
        document.getElementById('description').value = note.description;
        
        submitBtn.textContent = 'Update Note';
        cancelBtn.style.display = 'inline-block';
        formTitle.textContent = 'Edit Note';
        
        // Scroll to form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error fetching note for edit:', error);
    }
}

// 4. Delete Note (DELETE /notes/:id)
async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
        const response = await fetch(`/notes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadNotes();
        } else {
            alert('Error deleting note');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note');
    }
}

// Helper: Reset Form
function resetForm() {
    form.reset();
    noteIdInput.value = '';
    submitBtn.textContent = 'Add Note';
    cancelBtn.style.display = 'none';
    formTitle.textContent = 'Add New Note';
}

// Helper: Cancel Edit
cancelBtn.addEventListener('click', resetForm);