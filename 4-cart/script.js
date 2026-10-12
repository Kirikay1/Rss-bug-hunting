const products = [
  { id: 1, name: "Кофе", price: 300 },
  { id: 2, name: "Чай", price: 200 },
  { id: 3, name: "Круассан", price: 150 },
  { id: 4, name: "Маффин", price: 180 },
];

let cart = [];
let discount = 0;

const productsEl = document.getElementById("products");
const cartItemsEl = document.getElementById("cart-items");
const badgeEl = document.getElementById("badge");
const totalEl = document.getElementById("total");
const emptyMsg = document.getElementById("empty-msg");
const promoInput = document.getElementById("promo-input");
const promoBtn = document.getElementById("promo-btn");
const clearBtn = document.getElementById("clear-btn");

function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `<h3>${product.name}</h3><p>${product.price} ₽</p>`;

    const button = document.createElement("button");
    button.textContent = "В корзину";
    button.addEventListener("click", () => addToCart(product.id));

    card.append(button);
    productsEl.append(card);
  });
}

function addToCart(id) {
  const cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.qty += 1;
  } else {
    const product = products.find((item) => item.id === id);

    if (!product) {
      return;
    }

    cart.push({ ...product, qty: 1 });
  }

  renderCart();
}

function increaseQty(id) {
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return;
  }

  item.qty += 1;
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return;
  }

  item.qty = Math.max(1, item.qty - 1);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
}

function applyPromo() {
  discount = promoInput.value.trim() === "SALE10" ? 0.1 : 0;
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  cartItemsEl.replaceChildren();
  let total = 0;

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty;
    const listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.innerHTML = `<span>${item.name}</span>
      <button class="qty-btn" data-act="dec">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" data-act="inc">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove">✕</button>`;

    listItem.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    listItem.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    listItem.querySelector(".remove").addEventListener("click", () => removeItem(item.id));

    cartItemsEl.append(listItem);
    total += lineTotal;
  });

  if (discount) {
    total -= total * discount;
  }

  const productsCount = cart.reduce((sum, item) => sum + item.qty, 0);
  badgeEl.textContent = productsCount;
  totalEl.textContent = total;
  emptyMsg.hidden = cart.length > 0;
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();