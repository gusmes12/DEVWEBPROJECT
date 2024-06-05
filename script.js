let slideIndex = 0;
const slides = document.querySelectorAll('.slick-carousel img');
const totalSlides = slides.length;

document.getElementById('nextBtn').addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % totalSlides;
    updateCarousel();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
});

function updateCarousel() {
    const carouselContainer = document.querySelector('.slick-carousel');
    const slideWidth = slides[0].clientWidth;
    carouselContainer.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

function addToCart(productId) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=add&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        alert('Product added to cart!');
    });
}

function removeFromCart(productId) {
    fetch('update_cart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=remove&product_id=${productId}`
    })
    .then(response => response.json())
    .then(data => {
        alert('Product removed from cart!');
        location.reload();
    });
}

window.onload = function() {
    if (document.getElementById('product-list')) {
        fetch('get_products.php')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'producto-item';
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productElement);
            });
        });
    }

    if (document.getElementById('cart-list')) {
        fetch('cart.php')
        .then(response => response.json())
        .then(data => {
            const cartList = document.getElementById('cart-list');
            if (data.length > 0) {
                data.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    `;
                    cartList.appendChild(cartItem);
                });
            } else {
                cartList.innerHTML = '<p>Your cart is empty.</p>';
            }
        });
    }
}
