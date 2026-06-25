//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(Number(button.dataset.id));
    });
  });
}

function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function clearCart() {
  cart = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();