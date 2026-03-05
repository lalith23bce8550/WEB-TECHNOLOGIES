const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Book = require('./models/Book');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/book_finder_db';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- API ROUTES ---

// 1. Search Books by Title (GET /books/search?title=javascript)
app.get('/books/search', async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: 'Title parameter is required' });
        }
        const books = await Book.find({
            title: { $regex: title, $options: 'i' }
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error searching books', error: error.message });
    }
});

// 2. Filter Books by Category (GET /books/category/programming)
app.get('/books/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const books = await Book.find({ category });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error filtering books', error: error.message });
    }
});

// 3. Sort Books (GET /books/sort/price OR /books/sort/rating)
app.get('/books/sort/:field', async (req, res) => {
    try {
        const { field } = req.params;
        let sortField = field;
        let sortOrder = 1;

        if (field === 'price') {
            sortField = 'price';
            sortOrder = 1; // Ascending
        } else if (field === 'rating') {
            sortField = 'rating';
            sortOrder = -1; // Descending
        } else {
            return res.status(400).json({ message: 'Invalid sort field' });
        }

        const books = await Book.find().sort({ [sortField]: sortOrder });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error sorting books', error: error.message });
    }
});

// 4. Top Rated Books (GET /books/top)
app.get('/books/top', async (req, res) => {
    try {
        const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top rated books', error: error.message });
    }
});

// 5. Pagination (GET /books?page=2)
app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
        const total = await Book.countDocuments();

        res.json({
            books: books,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBooks: total
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
});

// Seed Database (Optional - for testing)
app.post('/books/seed', async (req, res) => {
    try {
        const sampleBooks = [
            { title: "JavaScript Essentials", author: "John Smith", category: "Programming", price: 450, rating: 4.5, year: 2023 },
            { title: "Python for Beginners", author: "Jane Doe", category: "Programming", price: 350, rating: 4.7, year: 2023 },
            { title: "Data Science Handbook", author: "Mike Johnson", category: "Data Science", price: 550, rating: 4.8, year: 2024 },
            { title: "Web Development", author: "Sarah Wilson", category: "Programming", price: 400, rating: 4.3, year: 2023 },
            { title: "Machine Learning", author: "David Brown", category: "Data Science", price: 600, rating: 4.9, year: 2024 },
            { title: "Database Systems", author: "Emily Davis", category: "Database", price: 500, rating: 4.6, year: 2023 },
            { title: "Cloud Computing", author: "Chris Lee", category: "Cloud", price: 550, rating: 4.4, year: 2024 },
            { title: "Cybersecurity", author: "Anna Taylor", category: "Security", price: 480, rating: 4.5, year: 2023 },
            { title: "Mobile Development", author: "Tom Anderson", category: "Programming", price: 420, rating: 4.2, year: 2023 },
            { title: "AI Fundamentals", author: "Lisa White", category: "Data Science", price: 650, rating: 4.8, year: 2024 }
        ];

        await Book.insertMany(sampleBooks);
        res.json({ message: 'Sample books seeded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});