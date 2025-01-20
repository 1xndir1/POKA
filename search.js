function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-results-container');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">Rp${product.price.toLocaleString()}</div>
            <input type="number" min="1" max="${product.maxQuantity}" value="1" class="quantity">
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        `;
        searchResultsContainer.appendChild(productElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        document.getElementById('search-input').value = searchQuery;
        const searchResults = filterProductsBySearchQuery(searchQuery);
        displaySearchResults(searchResults);
    }
});


