const products = [
  { id: 1, name: 'T-Shirt', category: 'clothing', price: 20, image: 'https://via.placeholder.com/200x150?text=T-Shirt', description: 'Comfortable cotton T-Shirt' },
  { id: 2, name: 'Jeans', category: 'clothing', price: 40, image: 'https://via.placeholder.com/200x150?text=Jeans', description: 'Blue denim jeans for all seasons' },
  { id: 3, name: 'Sneakers', category: 'shoes', price: 60, image: 'https://via.placeholder.com/200x150?text=Sneakers', description: 'Sporty sneakers for comfort and style' },
  { id: 4, name: 'Boots', category: 'shoes', price: 80, image: 'https://via.placeholder.com/200x150?text=Boots', description: 'Durable boots for outdoor activities' },
];

let cart = [];

function renderProducts(category = 'all') {
  const productList = document.getElementById('products');
  productList.innerHTML = '';
  const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);

  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product-card');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="showModal(${product.id})">Quick View</button>
    `;
    productList.appendChild(div);
  });
}

function filterCategory(category) {
  renderProducts(category);
}

function showModal(productId) {
  const product = products.find(p => p.id === productId);
  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('modal-price').textContent = product.price;
  document.getElementById('product-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('product-modal').style.display = 'none';
}

function addToCartFromModal() {
  const productName = document.getElementById('modal-title').textContent;
  const product = products.find(p => p.name === productName);
  cart.push(product);
  updateCart();
  closeModal();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalPrice = document.getElementById('total-price');

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  totalPrice.textContent = total;
}

function clearCart() {
  cart = [];
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  alert('Checkout successful!');
  cart = [];
  updateCart();
}

// Initial load
renderProducts();
