document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('checkout-cart-items');
    const cartTotalElement = document.getElementById('checkout-cart-total');
    const checkoutForm = document.getElementById('checkout-form');

    function updateCheckoutCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h4>${item.name}</h4>
                    <span class="item-price">Rp${item.price.toLocaleString()} x ${item.quantity}</span>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: Rp${totalPrice.toLocaleString()}`;
    }

    updateCheckoutCartDisplay();

    checkoutForm.addEventListener('submit', (event) => {
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
