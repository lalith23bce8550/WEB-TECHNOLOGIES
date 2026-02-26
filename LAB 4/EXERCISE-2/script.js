document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
    
    let debounceTimer; 
    const DEBOUNCE_DELAY = 300; 

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();

        clearTimeout(debounceTimer);

        if (query === '') {
            resultsContainer.innerHTML = '';
            return;
        }

        debounceTimer = setTimeout(() => {
            fetchProducts(query);
        }, DEBOUNCE_DELAY);
    });

    function fetchProducts(query) {
        resultsContainer.innerHTML = '<div class="loading">Searching...</div>';

        fetch('products.json')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load data");
                return response.json();
            })
            .then(products => {
                const filtered = products.filter(product => 
                    product.name.toLowerCase().includes(query) || 
                    product.category.toLowerCase().includes(query)
                );
                
                displayResults(filtered);
            })
            .catch(error => {
                console.error("Error:", error);
                resultsContainer.innerHTML = `<div class="error">Error loading products. Check console.</div>`;
            });
    }

    function displayResults(products) {
        resultsContainer.innerHTML = ''; 

        if (products.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No results found.</div>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            card.innerHTML = `
                <div class="product-name">${product.name}</div>
                <span class="product-category">${product.category}</span>
                <span class="product-price">$${product.price.toFixed(2)}</span>
            `;
            
            resultsContainer.appendChild(card);
        });
    }
});