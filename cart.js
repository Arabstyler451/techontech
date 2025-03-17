const cartCount = document.getElementById("cart-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Initialize the cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update the cart count on page load
cartCount.textContent = cart.length;

// Event listener for "Add to Cart" buttons
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = event.target.closest(".single-card");
    const productName = productCard.querySelector("h3").innerText;
    const productPrice = productCard.querySelector(".price").innerText;
    const productImage = productCard.querySelector("img").src;

    // Create cart item object
    const cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    // Add item to cart array
    cart.push(cartItem);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart count in the navbar
    cartCount.textContent = cart.length;
  });
});

// Function to display cart items in modal
function displayCartItems() {
  const cartModalBody = document.querySelector("#cartModal .modal-body");
  cartModalBody.innerHTML = ""; // Clear existing content

  if (cart.length === 0) {
    cartModalBody.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  cart.forEach((item, index) => {
    const cartItemHTML = `
      <div class="d-flex align-items-center mb-3">
        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: auto; margin-right: 10px;">
        <div>
          <h5>${item.name}</h5>
          <p>${item.price}</p>
        </div>
        <button class="btn btn-danger btn-sm ms-auto" onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartModalBody.innerHTML += cartItemHTML;
  });
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update cart count
  cartCount.textContent = cart.length;

  // Refresh modal content
  displayCartItems();
}

// Event listener for cart icon click to open modal
const cartIcon = document.getElementById("cart");
cartIcon.addEventListener("click", () => {
  displayCartItems();
  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
});

// Persist cart data across reloads
window.addEventListener("load", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length; // Update count on load
});
