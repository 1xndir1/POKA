document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements
    const productContainer = document.querySelector('.product-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const categoryFilter = document.getElementById('category-filter');

    // Initialize the cart with items from local storage or an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Array to store product data
    const productsData = [
        {
            id: 1,
            name: 'Taesan: HOW? Weverse',
            price: 150000,
            image: 'taesan_1_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'album']
        },
        {
            id: 2,
            name: 'Taesan: Membership Sailor',
            price: 65000,
            image: 'taesan_3_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'membership']
        },
        {
            id: 3,
            name: 'Sungho Maung',
            price: 55000,
            image: 'sungho_1_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'event']
        },
        {
            id: 4,
            name: 'Leehan: Baby Photo',
            price: 150000,
            image: 'leehan_1_pc_front.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'album']
        },
        {
            id: 5,
            name: 'Taesan: Birthday Pola',
            price: 30000,
            image: 'taesan_4_pola.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'polaroid', 'event']
        },
        {
            id: 6,
            name: 'Woodz Equal (Earth Ver.): Stiker',
            price: 10000,
            image: 'woodz_1_sticker.png',
            maxQuantity: 1,
            categories: ['woodz', 'sticker', 'album']
        },
        {
            id: 7,
            name: 'Xiaojun NCT UNIVERSE: Sticker',
            price: 10000,
            image: 'xiaojun_1_sticker.png',
            maxQuantity: 1,
            categories: ['wayv', 'sticker', 'album']
        },
        {
            id: 8,
            name: 'Leehan: Membership Sailor',
            price: 65000,
            image: 'leehan_4_pc_full.png',
            maxQuantity: 1,
            categories: ['boynextdoor', 'photocard', 'membership']
        },
        {
            id: 9,
            name: 'Jae Demon Midday Ver: Bookmark',
            price: 50000,
            image: 'jae_1_bookmark.png',
            maxQuantity: 1,
            categories: ['day6', 'bookmark', 'album']
        },
        {
            id: 10,
            name: 'Seunghwan XXI: Circle Card',
            price: 10000,
            image: 'seunghwan_1_circle_full.png',
            maxQuantity: 1,
            categories: ['seunghwan', 'circle card', 'album']
        },
        {
            id: 11,
            name: 'Yejun Asterum: QR (Unscanned)',
            price: 65000,
            image: 'yejun_1_qr_full.png',
            maxQuantity: 1,
            categories: ['plave', 'photocard', 'album']
        },
        {
            id: 12,
            name: 'Eunho Makan',
            price: 50000,
            image: 'trans_2.png',
            maxQuantity: 1,
            categories: ['plave', 'transparent card', 'event']
        },
        {
            id: 13,
            name: 'DK SVT 2022 PB TN17: Postcard',
            price: 40000,
            image: 'dk_1_postcard_full.png',
            maxQuantity: 1,
            categories: ['seventeen', 'postcard']
        },
        {
            id: 14,
            name: 'YOUNGJAE COLORS: Photo ID',
            price: 10000,
            image: 'youngjae_1_id.png',
            maxQuantity: 1,
            categories: ['got7', 'photo id', 'album']
        },
    ];

    // Function to display products on the page
    function displayProducts(productsToDisplay) {
        // Clear the existing products in the container
        productContainer.innerHTML = '';

        // Iterate over the products to display and create HTML for each
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">Rp${product.price.toLocaleString()}</div>
                <input type="number" min="1" max="${product.maxQuantity}" value="1" class="quantity">
                ${product.maxQuantity === 1 ? '<div class="limited-quantity">Only 1 left!</div>' : ''}
                <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                <div class="add-success-message">Added to Cart!</div>
            `;
            // Add the created product element to the product container
            productContainer.appendChild(productElement);
        });

        // Re-attach event listeners to the 'Add to Cart' buttons
        attachAddToCartEventListeners();
    }

    // Load product data from local storage if available, otherwise use default productsData
    const storedProductsData = JSON.parse(localStorage.getItem('productsData'));
    const currentProductsData = storedProductsData || productsData;

    // Call displayProducts to show the products on page load
    displayProducts(currentProductsData);

    // Function to add a product to the cart
    function addToCart(product, quantity) {
        // Find the product in the cart based on its ID
        let existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // If the product already exists in the cart and adding the new quantity doesn't exceed the max quantity
            if (existingProduct.quantity + quantity <= existingProduct.maxQuantity) {
                // Increase the product's quantity
                existingProduct.quantity += quantity;
            } else {
                // Alert the user if adding the new quantity would exceed the max quantity
                alert(`Sorry, we only have ${existingProduct.maxQuantity} of ${existingProduct.name}.`);
                return; // Exit the function to prevent adding the product
            }
        } else {
            // If the product is not in the cart, add it with the specified quantity
            cart.push({ ...product, quantity });
        }

        // Update the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Update the cart display in the header
        updateCartDisplay();

        // Show a success message
        const button = event.target;
        const successMessage = button.nextElementSibling; // Get the next element, which is the success message
        successMessage.style.display = 'block';

        // Hide the success message after 2 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    }

    // Function to attach event listeners to 'Add to Cart' buttons
    function attachAddToCartEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Find the closest parent element with the class 'product'
                const productElement = button.closest('.product');
                // Get the product ID from the button's data attribute
                const productId = parseInt(button.dataset.productId);
                // Find the product in currentProductsData based on the ID
                const product = currentProductsData.find(p => p.id === productId);
                // Get the quantity input field and its value
                const quantityInput = productElement.querySelector('.quantity');
                const quantity = parseInt(quantityInput.value) || 1;

                // If the product is found, add it to the cart
                if (product) {
                    addToCart(product, quantity);
                }
            });
        });
    }

    // Function to update the cart display in the header
    function updateCartDisplay() {
        // Clear the existing cart items in the header
        cartItemsContainer.innerHTML = '';
        // Initialize the total price to 0
        let totalPrice = 0;

        // Iterate over each item in the cart and create HTML to display it
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('box');
            cartItem.innerHTML = `
                <i class="fa fa-trash remove-item" data-product-id="${item.id}"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">Rp${item.price.toLocaleString()}</span>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
            `;
            // Append the newly created cart item to the cart items container
            cartItemsContainer.appendChild(cartItem);
            // Update the total price by adding the price of each item multiplied by its quantity
            totalPrice += item.price * item.quantity;
        });

        // Update the total price element in the header
        cartTotalElement.textContent = `Total: Rp${totalPrice.toLocaleString()}`;

        // Re-attach event listeners to the 'Remove' buttons for the new cart items
        attachRemoveEventListeners();
    }

    // Function to remove an item from the cart based on its ID
    function removeFromCart(productId) {
        // Filter the cart array to exclude the item with the matching ID
        cart = cart.filter(item => item.id !== productId);
        // Update the cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Refresh the cart display in the header
        updateCartDisplay();
    }

    // Function to attach event listeners to 'Remove' buttons in the cart
    function attachRemoveEventListeners() {
        // Select all 'Remove' buttons in the cart
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Extract the product ID from the button's data attribute
                const productId = parseInt(button.dataset.productId);
                // Call the removeFromCart function with the product ID to remove the item
                removeFromCart(productId);
            });
        });
    }

    // Function to create category filter options dynamically
    function createCategoryFilters() {
        // Initialize sets to hold unique categories for groups, materials, and types
        const groupCategories = new Set();
        const materialCategories = new Set();
        const typeCategories = new Set();

        // Iterate over each product and its categories
        currentProductsData.forEach(product => {
            product.categories.forEach(category => {
                // Categorize each category into the appropriate set
                if (['boynextdoor', 'woodz', 'wayv', 'seventeen', 'wei', 'day6', 'got7', 'plave', 'seunghwan'].includes(category)) {
                    groupCategories.add(category);
                } else if (['photocard', 'polaroid', 'sticker', 'postcard', 'circle card', 'bookmark', 'transparent card', 'photo id'].includes(category)) {
                    materialCategories.add(category);
                } else if (['membership', 'album', 'event'].includes(category)) {
                    typeCategories.add(category);
                }
            });
        });

        // Clear any existing filter options
        categoryFilter.innerHTML = '';

        // Sort group categories alphabetically and create filter elements for them
        const sortedGroupCategories = Array.from(groupCategories).sort();
        if (sortedGroupCategories.length > 0) {
            const groupFilterHeader = document.createElement('h3');
            groupFilterHeader.textContent = 'Group';
            categoryFilter.appendChild(groupFilterHeader);

            sortedGroupCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }

        // Sort material categories alphabetically and create filter elements for them
        const sortedMaterialCategories = Array.from(materialCategories).sort();
        if (sortedMaterialCategories.length > 0) {
            const materialFilterHeader = document.createElement('h3');
            materialFilterHeader.textContent = 'Material';
            categoryFilter.appendChild(materialFilterHeader);

            sortedMaterialCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }

        // Sort type categories alphabetically and create filter elements for them
        const sortedTypeCategories = Array.from(typeCategories).sort();
        if (sortedTypeCategories.length > 0) {
            const typeFilterHeader = document.createElement('h3');
            typeFilterHeader.textContent = 'Type';
            categoryFilter.appendChild(typeFilterHeader);

            sortedTypeCategories.forEach(category => {
                const filterElement = document.createElement('div');
                filterElement.classList.add('filter-option');
                filterElement.innerHTML = `
                    <input type="checkbox" id="${category}" name="category" value="${category}">
                    <label for="${category}">${category}</label>
                `;
                categoryFilter.appendChild(filterElement);
            });
        }

        // Attach event listeners to the new filter options
        attachCategoryFilterEventListeners();
    }

    // Function to attach event listeners to category filter options
    function attachCategoryFilterEventListeners() {
        const filterOptions = document.querySelectorAll('.filter-option input');
        filterOptions.forEach(option => {
            option.addEventListener('change', () => {
                // Get the selected categories from the checked filter options
                const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
                    .map(el => el.value);
                // Filter products based on the selected categories
                filterProducts(selectedCategories);
            });
        });
    }

    // Function to filter and display products based on selected categories
    function filterProducts(selectedCategories) {
        const filteredProducts = selectedCategories.length > 0
            ? currentProductsData.filter(product => selectedCategories.every(category => product.categories.includes(category)))
            : currentProductsData;
        displayProducts(filteredProducts);
    }

    // Function to handle search queries
    function handleSearch(query) {
        const filteredProducts = currentProductsData.filter(product => {
            // Convert product name and categories to lowercase for case-insensitive matching
            const productName = product.name.toLowerCase();
            const productCategories = product.categories.join(' ').toLowerCase();
            const searchQuery = query.toLowerCase();
    
            // Check if the product name or categories include the search query
            return productName.includes(searchQuery) || productCategories.includes(searchQuery);
        });
    
        // Display the filtered products
        displayProducts(filteredProducts);
    }

    // Update the displayProducts function to display search results
    function displayProducts(productsToDisplay, isSearchResult = false) {
        productContainer.innerHTML = '';

        // Display the search results message only if it's a search result
        if (isSearchResult) {
            const searchResultsMessage = document.createElement('h3');
            searchResultsMessage.textContent = `Search Results (${productsToDisplay.length})`;
            searchResultsMessage.classList.add('search-results-message');
            productContainer.appendChild(searchResultsMessage);
        }

        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}"
