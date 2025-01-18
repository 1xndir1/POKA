document.addEventListener('DOMContentLoaded', () => {
    const orderNumberSpan = document.getElementById('order-number');
    const orderDetailsContainer = document.getElementById('order-details');

    /*Get the query string from the URL*/
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const orderDataString = urlParams.get('orderData');

    if (orderDataString) {
        const orderData = JSON.parse(decodeURIComponent(orderDataString));

        /*Display order details*/
        displayOrderDetails(orderData);

        /*Generate and display a random order number*/
        const orderNumber = generateOrderNumber();
        orderNumberSpan.textContent = orderNumber;

        /*Clear the cart from local storage*/
        localStorage.removeItem('cart');
    } else {
        
        orderDetailsContainer.innerHTML = '<p>No order details found.</p>';
    }
});

function generateOrderNumber() {
    return 'POKA-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function displayOrderDetails(orderData) {
    const orderDetailsContainer = document.getElementById('order-details');
    orderDetailsContainer.innerHTML = '';

    
    const customerInfoDiv = document.createElement('div');
    customerInfoDiv.innerHTML = `
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${orderData.fullName}</p>
        <p><strong>Email:</strong> ${orderData.email}</p>
        <p><strong>Address:</strong> ${orderData.address}</p>
    `;
    orderDetailsContainer.appendChild(customerInfoDiv);

    
    const cartItemsDiv = document.createElement('div');
    cartItemsDiv.innerHTML = '<h3>Order Items</h3>';
    orderData.cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="content">
                <h4>${item.name}</h4>
                <span class="item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</span>
            </div>
        `;
        cartItemsDiv.appendChild(cartItem);
    });
    orderDetailsContainer.appendChild(cartItemsDiv);
}
