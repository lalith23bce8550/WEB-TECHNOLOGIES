const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/student_notes_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- API ROUTES ---

// 1. Add Note (POST)
app.post('/notes', async (req, res) => {
    try {
        const { title, subject, description } = req.body;
        const newNote = new Note({
            title,
            subject,
            description,
            created_date: new Date().toISOString().split('T')[0]
        });
        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Error creating note', error: error.message });
    }
});

// 2. View Notes (GET)
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().sort({ created_date: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes', error: error.message });
    }
});

// 3. Update Note (PUT)
app.put('/notes/:id', async (req, res) => {
    try {
        const { title, subject, description } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, subject, description },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note updated successfully', note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: 'Error updating note', error: error.message });
    }
});

// 4. Delete Note (DELETE)
app.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});