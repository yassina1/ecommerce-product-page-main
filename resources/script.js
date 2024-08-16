
document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const basket = document.getElementById('cart');
    const closeCart = document.getElementById('close-cart');

    // Toggle cart visibility on cart icon click
    cartIcon.addEventListener('click', function () {
        basket.classList.toggle('show');
    });

    // Close cart when close button is clicked
    closeCart.addEventListener('click', function () {
        basket.classList.remove('show');
    });

    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.click-image .thumbnail');

    // Change main image when a thumbnail is clicked
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            mainImage.src = thumbnail.src.replace('-thumbnail', '');
            thumbnails.forEach(thumb => thumb.classList.remove('selected'));
            thumbnail.classList.add('selected');
        });
    });

    const addToCartButton = document.getElementById('add');
    const decreaseButton = document.querySelector('.decrease-quantity');
    const increaseButton = document.querySelector('.increase-quantity');
    const quantityDisplay = document.querySelector('.quantity');
    const cartQuantity = document.getElementById('quant');
    const cartContainer = document.getElementById('cart-items');

    let quantity = 0;
    let cart = [];

    // Function to update quantity display
    const updateQuantityDisplay = () => {
        quantityDisplay.textContent = quantity;
    };

    // Increase quantity
    increaseButton.addEventListener('click', () => {
        quantity++;
        updateQuantityDisplay();
    });

    // Decrease quantity
    decreaseButton.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            updateQuantityDisplay();
        }
    });

    // Add to cart
    addToCartButton.addEventListener('click', () => {
        if (quantity > 0) {
            const product = {
                name: 'Fall Limited sneakers',
                price: 125.00,
                quantity: quantity,
                image: 'images/image-product-1-thumbnail.jpg',
            };

            // Check if the item is already in the cart
            const existingProductIndex = cart.findIndex(item => item.name === product.name);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push(product);
            }

            // Reset quantity
            quantity = 0;
            updateQuantityDisplay();

            // Update cart display
            updateCartDisplay();

            // Update cart icon quantity
            updateCartIconQuantity();
        }
    });

    // Update the cart display
    const updateCartDisplay = () => {
        cartContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="name">${item.name}</div>
                <div class="totalPrice">£${(item.price * item.quantity).toFixed(2)}</div>
                <div class="quantity" data-index="${index}">
                    <button class="minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="plus">+</button>
                </div>
                <div class="checkout">
          <button>Checkout</button>
        </div>
                
            `;

            cartContainer.appendChild(cartItem);
        });
    };

    // Update cart icon quantity
    const updateCartIconQuantity = () => {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartQuantity.textContent = totalQuantity;
    };

    // Handle cart item quantity change
    cartContainer.addEventListener('click', (e) => {
        const target = e.target;
        const cartItemIndex = target.closest('.quantity').dataset.index;

        if (target.classList.contains('plus')) {
            cart[cartItemIndex].quantity++;
        } else if (target.classList.contains('minus')) {
            cart[cartItemIndex].quantity--;
            if (cart[cartItemIndex].quantity <= 0) {
                cart.splice(cartItemIndex, 1);
            }
        }

        updateCartDisplay();
        updateCartIconQuantity();
    });
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
