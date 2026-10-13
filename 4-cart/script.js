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
  products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `<h3>${p.name}</h3><p>${p.price} ₽</p>`;
    const btn = document.createElement("button");
    btn.textContent = "В корзину";
    btn.addEventListener("click", () => addToCart(p.id)); // 1 - Клик по «В корзину» добавляет товар в корзину
    card.appendChild(btn);
    productsEl.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return;
  }

  // 2 - Повторное добавление того же товара увеличивает его количество, а не создаёт вторую строку
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  renderCart();
}

function increaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.qty++; // 3 - Кнопка «+» увеличивает количество товара на 1
  }
  renderCart();
}

function decreaseQty(id) {
  const item = cart.find((i) => i.id === id);
  if (item) {
    if (item.qty > 1) {
      item.qty--; // 4 - Кнопка «−» уменьшает количество на 1, но не ниже 1
    }
  }
  renderCart();
}

function removeItem(id) {
  cart = cart.filter((i) => i.id !== id);
  renderCart();
}

function applyPromo() {
  if (promoInput.value === "SALE10") {
    discount = 0.1; // 8 - Промокод SALE10 даёт скидку 10% на итог
  } else {
    discount = 0;// 8 - При других или пустом коде скидки нет
  }
  renderCart();
}

function clearCart() {
  cart = []; // 9 - «Очистить корзину» удаляет из корзины все товары
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0; // 6 - Итог равен сумме всех строк корзины
  let grossCount = 0; // 7 - Бейдж показывает суммарное количество товаров (сумму количеств во всех строках)

  cart.forEach((item) => {
    const lineTotal = item.price * item.qty; // 5 - Сумма строки равна цене товара, умноженной на его количество
    grossCount += item.qty; // 7 - Бейдж показывает суммарное количество товаров (сумму количеств во всех строках)
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `<span>${item.name}</span>
      <button class="qty-btn" data-act="dec">−</button>
      <span class="qty">${item.qty}</span>
      <button class="qty-btn" data-act="inc">+</button>
      <span class="line">${lineTotal} ₽</span>
      <button class="remove">✕</button>`;
    li.querySelector('[data-act="inc"]').addEventListener("click", () => increaseQty(item.id));
    li.querySelector('[data-act="dec"]').addEventListener("click", () => decreaseQty(item.id));
    li.querySelector(".remove").addEventListener("click", () => removeItem(item.id));
    cartItemsEl.appendChild(li);
    total += lineTotal; // 6 - Итог равен сумме всех строк корзины
  });

  if (discount) {
    total = total - total * discount;
  }

  badgeEl.textContent = grossCount; // 7 - Бейдж показывает суммарное количество товаров (сумму количеств во всех строках)
  totalEl.textContent = total;

  // 10 - При пустой корзине показывается «Корзина пуста», итог равен 0
  if (cart.length === 0) {
    emptyMsg.hidden = false;
  } else {
    emptyMsg.hidden = true;
  }
}

promoBtn.addEventListener("click", applyPromo);
clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
