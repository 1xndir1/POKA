document.addEventListener('DOMContentLoaded', () => {
    // Select the span element where the order number will be displayed
    const orderNumberSpan = document.getElementById('order-number');

    // Select the container where order details will be displayed
    const orderDetailsContainer = document.getElementById('order-details');

    // Retrieve the order data string from sessionStorage
    const orderDataString = sessionStorage.getItem('orderData');

    // Check if orderDataString exists
    if (orderDataString) {
        // Parse the order data string into a JavaScript object
        const orderData = JSON.parse(orderDataString);

        // Display the order details using the parsed order data
        displayOrderDetails(orderData);

        // Generate and display a random order number
        const orderNumber = generateOrderNumber();
        orderNumberSpan.textContent = orderNumber;

        // Clear orderData from sessionStorage
        sessionStorage.removeItem('orderData');

        // Clear the cart from localStorage */
        localStorage.removeItem('cart');
    } else {
        // Display a message if no order details are found
        orderDetailsContainer.innerHTML = '<p>No order details found.</p>';
    }
});

// Function to generate a random order number
function generateOrderNumber() {
    return 'POKA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Function to display order details on the page
function displayOrderDetails(orderData) {
    // Select the container where order details will be displayed
    const orderDetailsContainer = document.getElementById('order-details');

    // Clear any existing content in the order details container
    orderDetailsContainer.innerHTML = '';

    // Create a div element for customer information
    const customerInfoDiv = document.createElement('div');
    customerInfoDiv.innerHTML = `
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${orderData.fullName}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Address:</strong> ${orderData.address}</p>
    `;

    // Append the customer information to the order details container
    orderDetailsContainer.appendChild(customerInfoDiv);

    // Create a div element for cart items
    const cartItemsDiv = document.createElement('div');
    cartItemsDiv.innerHTML = '<h3>Order Items</h3>';
    
    // Loop through each item in the order data cart
    orderData.cart.forEach(item => {
        // Create a div element for each cart item
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // Set the inner HTML of the cart item to display its details
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="content">
                <h4>${item.name}</h4>
                <span class="item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</span>
            </div>
        `;

        // Append the cart item to the cart items div
        cartItemsDiv.appendChild(cartItem);
    });

    // Append the cart items div to the order details container
    orderDetailsContainer.appendChild(cartItemsDiv);
}
