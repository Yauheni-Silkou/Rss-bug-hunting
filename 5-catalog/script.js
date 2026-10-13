const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");

function getFiltered() {
  // 1 - По умолчанию, без выбранных фильтров, показаны все товары
  let result = [...products];
  const search = searchInput.value.trim();
  const category = categorySelect.value;
  const sort = sortSelect.value; // 7 - «По умолчанию» показывает товары в исходном порядке, как при загрузке страницы (делаем копию массива)

  // 8 - Поиск, категория и сортировка действуют одновременно (комбинируются)
  if (search) {
    // 3 - Поиск не зависит от регистра букв
    // 4 - Поиск находит товар по части названия
    result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // 8 - Поиск, категория и сортировка действуют одновременно (комбинируются)
  if (category !== "all") {
    // 5 - Фильтр показывает только товары выбранной категории; «Все категории» — все товары
    result = result.filter((p) => p.category === category);
  }

  // 8 - Поиск, категория и сортировка действуют одновременно (комбинируются)
  if (sort === "asc") {
    // 6 - «Цена ↑» сортирует по возрастанию цены
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    // 6 - «Цена ↓» — по убыванию
    result.sort((a, b) => b.price - a.price);
  }

  return result;
}

function render() {
  grid.innerHTML = ""; // 2 - После смены фильтра на странице только подходящие карточки, старые не остаются
  const items = getFiltered();
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  countEl.textContent = items.length; // 9 - «Найдено: N» показывает количество товаров после фильтрации
}

searchInput.addEventListener("input", render);
categorySelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

// 10 - «Сбросить фильтры» очищает поиск, сбрасывает категорию и сортировку и показывает все товары
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";
  render();
});

render();