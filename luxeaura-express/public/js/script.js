// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// PRODUCT DETAILS PAGE
// ===========================
if (document.getElementById('quantityInput')) {
    const quantityInput = document.getElementById('quantityInput');
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const giftBoxCheckbox = document.getElementById('giftBoxCheckbox');
    const subtotalPrice = document.getElementById('subtotalPrice');
    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartMessage = document.getElementById('cartMessage');

    const basePrice = 105000;
    const giftBoxPrice = 250;

    // Update subtotal
    function updateSubtotal() {
        let quantity = parseInt(quantityInput.value);
        let subtotal = basePrice * quantity;

        if (giftBoxCheckbox.checked) {
            subtotal += giftBoxPrice;
        }

        subtotalPrice.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    // Decrease quantity
    decreaseBtn.addEventListener('click', () => {
        let currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
            quantityInput.value = currentQty - 1;
            updateSubtotal();
        }
    });

    // Increase quantity
    increaseBtn.addEventListener('click', () => {
        let currentQty = parseInt(quantityInput.value);
        quantityInput.value = currentQty + 1;
        updateSubtotal();
    });

    // Gift box change
    giftBoxCheckbox.addEventListener('change', updateSubtotal);

    // Color selection
    const colorBoxes = document.querySelectorAll('.color-box');
    colorBoxes.forEach(box => {
        box.addEventListener('click', () => {
            colorBoxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');
        });
    });

    // Add to cart
    addToCartBtn.addEventListener('click', () => {
        const productName = document.querySelector('.product-name').textContent;
        const quantity = parseInt(quantityInput.value);
        const subtotal = subtotalPrice.textContent;
        const giftBox = giftBoxCheckbox.checked;
        const variant = document.getElementById('variantSelect').value;
        const selectedColor = document.querySelector('.color-box.active').getAttribute('data-color');

        // Prepare data
        const productData = {
            name: productName,
            quantity: quantity,
            subtotal: subtotal,
            giftBox: giftBox,
            variant: variant,
            color: selectedColor
        };

        // Send to cart.php via AJAX
        fetch('php/cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                cartMessage.textContent = 'Product added to cart successfully!';
                cartMessage.className = 'cart-message success';
                cartMessage.style.display = 'block';

                setTimeout(() => {
                    cartMessage.style.display = 'none';
                }, 3000);
            } else {
                cartMessage.textContent = 'Error adding product to cart.';
                cartMessage.className = 'cart-message error';
                cartMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            cartMessage.textContent = 'Error adding product to cart.';
            cartMessage.className = 'cart-message error';
            cartMessage.style.display = 'block';
        });
    });
}

// ===========================
// CONTACT FORM
// ===========================
if (document.getElementById('contactForm')) {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        fetch('php/contact.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                formMessage.textContent = data.message;
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                contactForm.reset();

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.textContent = data.message;
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            formMessage.textContent = 'An error occurred. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
        });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .collection-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

