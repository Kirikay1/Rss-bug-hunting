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
  const text = input.value.trim();

  if (!text) {
    errorEl.hidden = false;
    return;
  }

  errorEl.hidden = true;
  tasks.push({ id: nextId++, text, done: false });
  input.value = "";
  render();
}

function toggleTask(id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return;
  }

  task.done = !task.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id !== id);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.done);
  render();
}

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.done);
  }

  if (currentFilter === "done") {
    return tasks.filter((task) => task.done);
  }

  return tasks;
}

function updateCounter() {
  const activeTasksCount = tasks.filter((task) => !task.done).length;
  counter.textContent = `Активных задач: ${activeTasksCount}`;
}

function render() {
  const visibleTasks = getVisibleTasks();
  list.replaceChildren();

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";

    if (task.done) {
      li.classList.add("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "task__del";
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.append(span, deleteButton);
    list.append(li);
  });

  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    render();
  });
});

render();