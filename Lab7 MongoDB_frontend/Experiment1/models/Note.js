const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Ensure collection name is 'notes'
NoteSchema.set('collection', 'notes');

module.exports = mongoose.model('Note', NoteSchema);