let currentPage = 1;
let currentFilter = null;
let currentSort = null;
let currentSearch = null;

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

// 1. Search Books by Title
async function searchBooks() {
    const title = document.getElementById('searchInput').value;
    if (!title.trim()) {
        alert('Please enter a search term');
        return;
    }

    currentSearch = title;
    currentFilter = null;
    currentSort = null;
    currentPage = 1;

    try {
        const response = await fetch(`/books/search?title=${encodeURIComponent(title)}`);
        const books = await response.json();
        displayBooks(books, `Search Results for: "${title}"`);
    } catch (error) {
        console.error('Error searching books:', error);
        alert('Error searching books');
    }
}

// 2. Filter Books by Category
async function filterByCategory(category) {
    currentSearch = null;
    currentFilter = category;
    currentSort = null;
    currentPage = 1;

    try {
        const response = await fetch(`/books/category/${encodeURIComponent(category)}`);
        const books = await response.json();
        displayBooks(books, `Books in Category: ${category}`);
    } catch (error) {
        console.error('Error filtering books:', error);
        alert('Error filtering books');
    }
}

// 3. Sort Books
async function sortBooks(field) {
    currentSearch = null;
    currentFilter = null;
    currentSort = field;
    currentPage = 1;

    try {
        const response = await fetch(`/books/sort/${field}`);
        const books = await response.json();
        const sortText = field === 'price' ? 'Price (Low to High)' : 'Rating (High to Low)';
        displayBooks(books, `Sorted by: ${sortText}`);
    } catch (error) {
        console.error('Error sorting books:', error);
        alert('Error sorting books');
    }
}

// 4. Top Rated Books
async function loadTopRated() {
    currentSearch = null;
    currentFilter = null;
    currentSort = null;
    currentPage = 1;

    try {
        const response = await fetch('/books/top');
        const books = await response.json();
        displayBooks(books, '🏆 Top Rated Books (Rating ≥ 4.0)');
    } catch (error) {
        console.error('Error loading top rated books:', error);
        alert('Error loading top rated books');
    }
}

// 5. Pagination - Load Books
async function loadBooks() {
    try {
        const response = await fetch(`/books?page=${currentPage}`);
        const data = await response.json();
        
        displayBooks(data.books, 'All Books');
        updatePagination(data.currentPage, data.totalPages, data.totalBooks);
    } catch (error) {
        console.error('Error loading books:', error);
        document.getElementById('booksList').innerHTML = '<p class="loading">Error loading books...</p>';
    }
}

// Change Page Number
async function changePage(direction) {
    const totalPages = document.getElementById('pageInfo').textContent;
    const maxPage = totalPages.split('of')[1]?.trim() || 1;
    
    const newPage = currentPage + direction;
    
    if (newPage < 1 || newPage > maxPage) return;
    
    currentPage = newPage;
    await loadBooks();
}

// Display Books in UI
function displayBooks(books, title) {
    const booksList = document.getElementById('booksList');
    const booksTitle = document.getElementById('booksTitle');
    
    booksTitle.textContent = title;
    
    if (books.length === 0) {
        booksList.innerHTML = '<p class="no-results">No books found matching your criteria.</p>';
        return;
    }

    booksList.innerHTML = '';
    
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-header">
                <span class="book-title">${book.title}</span>
                <span class="book-rating">⭐ ${book.rating}/5</span>
            </div>
            <div class="book-author">👤 ${book.author}</div>
            <div class="book-details">
                <span class="book-category">📁 ${book.category}</span>
                <span class="book-price">💰 ₹${book.price}</span>
                <span class="book-year">📅 ${book.year}</span>
            </div>
        `;
        booksList.appendChild(card);
    });
}

// Update Pagination Controls
function updatePagination(current, total, totalBooks) {
    document.getElementById('pageInfo').textContent = `Page ${current} of ${total} (Total: ${totalBooks} books)`;
    
    document.getElementById('prevBtn').disabled = current <= 1;
    document.getElementById('nextBtn').disabled = current >= total;
}

// Seed Database (For Testing)
async function seedDatabase() {
    try {
        const response = await fetch('/books/seed', {
            method: 'POST'
        });
        const data = await response.json();
        alert(data.message);
        loadBooks();
    } catch (error) {
        console.error('Error seeding database:', error);
        alert('Error seeding database');
    }
}

// Search on Enter Key
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBooks();
    }
});