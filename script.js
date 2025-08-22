const products = [
  { id: 1, name: 'Foundation', category: 'foundation', price: 35, image: 'https://via.placeholder.com/200x150?text=Foundation', description: 'Long-lasting liquid foundation' },
  { id: 2, name: 'Lipstick', category: 'lipstick', price: 25, image: 'https://via.placeholder.com/200x150?text=Lipstick', description: 'Matte lipstick in bold colors' },
  { id: 3, name: 'Mascara', category: 'mascara', price: 18, image: 'https://via.placeholder.com/200x150?text=Mascara', description: 'Waterproof mascara for fuller lashes' },
  { id: 4, name: 'Lip Gloss', category: 'lipstick', price: 20, image: 'https://via.placeholder.com/200x150?text=Lip+Gloss', description: 'Glossy shine with a soft texture' },
  { id: 5, name: 'Setting Spray', category: 'foundation', price: 22, image: 'https://via.placeholder.com/200x150?text=Setting+Spray', description: 'Setting spray to lock in your makeup' },
  { id: 6, name: 'Eyebrow Pencil', category: 'mascara', price: 15, image: 'https://via.placeholder.com/200x150?text=Eyebrow+Pencil', description: 'Precision eyebrow pencil' }
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
