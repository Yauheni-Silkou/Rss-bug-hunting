const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim(); // 2 - Пустая строка (в том числе из одних пробелов) не добавляется; показывается сообщение «Введите текст задачи»

  if (text === "") {
    errorEl.hidden = false; // 2 - Пустая строка (в том числе из одних пробелов) не добавляется; показывается сообщение «Введите текст задачи»
    return;
  }

  errorEl.hidden = true;
  tasks.push({ id: nextId++, text: text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.done = !task.done; // 5 - Повторный клик убирает зачёркивание
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id); // 6 - Клик по кнопке «✕» убирает задачу из списка и из счётчика
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done); // 10 - Удаляются только выполненные задачи, активные остаются
  render();
}

function getVisibleTasks() {
  // 8 - «Активные» показывают только невыполненные, «Выполненные» — только выполненные, «Все» — все задачи
  if (currentFilter === "active") {
    return tasks.filter((t) => !t.done);
  } else if (currentFilter === "done") {
    return tasks.filter((t) => t.done);
  }

  return tasks;
}

function updateCounter() {
  // 7 - Счётчик показывает количество невыполненных задач
  const activeTasks = tasks.filter((t) => !t.done).length;
  counter.textContent = "Активных задач: " + activeTasks;
}

function render() {
  list.innerHTML = ""; // 9 - На странице ровно столько задач, сколько добавлено, без повторов

  const visible = getVisibleTasks();

  // 3 - Можно добавлять любое количество задач подряд, список продолжает работать
  for (let i = 0; i < visible.length; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      li.classList.add("done"); // 4 - Одиночный клик по тексту задачи зачёркивает её
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask); // 1 - По одиночному клику задача добавляется в список
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
