document.addEventListener('DOMContentLoaded', () => {
    // Get cart data from local storage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Select the container where cart items will be displayed
    const cartItemsContainer = document.getElementById('checkout-cart-items');
    
    // Select the element that displays the total cart price
    const cartTotalElement = document.getElementById('checkout-cart-total');
    
    // Select the checkout form
    const checkoutForm = document.getElementById('checkout-form');

    // Function to update and display cart items and total price on the checkout page
    function updateCheckoutCartDisplay() {
        // Clear any existing items in the cart display
        cartItemsContainer.innerHTML = '';

        // Initialize total price to zero
        let totalPrice = 0;

        // Loop through each item in the cart
        cart.forEach(item => {
            // Create a div element for each cart item
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            // Set the inner HTML of the cart item to display its details
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h4>${item.name}</h4>
                    <span class="item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</span>
                </div>
            `;
            
            // Add the created cart item to the cart items container
            cartItemsContainer.appendChild(cartItem);
            
            // Update the total price
            totalPrice += item.price * item.quantity;
        });

        // Display the total cart price
        cartTotalElement.textContent = `Total: Rp${totalPrice.toLocaleString()}`;
    }

    // display cart items when the page loads
    updateCheckoutCartDisplay();

    // Attach an event listener to the checkout form for submission
    checkoutForm.addEventListener('submit', (event) => {
        // Prevent the default form submission action
        event.preventDefault();

        
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        
        const orderData = {
            fullName,
            email,
            address,
            cart
        };

        // Store orderData in sessionStorage
        sessionStorage.setItem('orderData', JSON.stringify(orderData));

        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    });
});
