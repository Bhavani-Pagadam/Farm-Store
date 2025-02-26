// Define elements early
let searchForm = document.querySelector('.search-form');
let shoppingCart = document.querySelector('.shopping-cart');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');

// Toggle Search Form
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

// Toggle Shopping Cart
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

// Toggle Login Form
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
};

// Toggle Navbar
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
};

// Close all when scrolling
window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
};

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to the cart
function addToCart(event) {
    let button = event.target;
    let productBox = button.closest(".box");
    let productName = productBox.querySelector("h3").textContent;
    let priceText = productBox.querySelector(".price").textContent;
    let quantity = parseInt(productBox.querySelector(".quantity").value);

    console.log(`Adding to cart: ${productName}, Quantity: ${quantity}`);

    let price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: productName, price: price, quantity: quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);  // Remove item at given index
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    let cartContainer = document.getElementById("cart-items");
    let totalCostElement = document.getElementById("total-cost");

    if (!cartContainer || !totalCostElement) return;

    cartContainer.innerHTML = "";
    let totalCost = 0;

    cart.forEach((item, index) => {
        let itemElement = document.createElement("li");
        itemElement.innerHTML = `
            ${item.name} - ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}
            <i class="fa fa-trash delete-item" data-index="${index}" style="color: red; cursor: pointer; margin-left: 10px;"></i>
        `;
        cartContainer.appendChild(itemElement);
        totalCost += item.quantity * item.price;
    });

    totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;

    // Add event listener to delete items
    document.querySelectorAll(".delete-item").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}

// Ensure cart updates correctly after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-to-cart")) {
            addToCart(event);
        }
    });

    updateCartDisplay();
});
