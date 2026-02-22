const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const template = document.getElementById('task-template');
const total = document.getElementById('total');
const done = document.getElementById('done');

const state = {
  tasks: [],
};

function renderStats() {
  const completed = state.tasks.filter((task) => task.completed).length;
  total.textContent = `Toplam: ${state.tasks.length}`;
  done.textContent = `Tamamlanan: ${completed}`;
}

function renderTasks() {
  taskList.innerHTML = '';

  state.tasks.forEach((task) => {
    const item = template.content.firstElementChild.cloneNode(true);
    const checkbox = item.querySelector('.toggle');
    const title = item.querySelector('.title');
    const deleteBtn = item.querySelector('.delete');

    title.textContent = task.title;
    checkbox.checked = task.completed;
    title.classList.toggle('done', task.completed);

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      title.classList.toggle('done', task.completed);
      renderStats();
    });

    deleteBtn.addEventListener('click', () => {
      state.tasks = state.tasks.filter((entry) => entry.id !== task.id);
      renderTasks();
      renderStats();
    });

    taskList.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = taskInput.value.trim();
  if (!value) {
    return;
  }

  state.tasks.unshift({
    id: crypto.randomUUID(),
    title: value,
    completed: false,
  });

  form.reset();
  taskInput.focus();
  renderTasks();
  renderStats();
});

renderStats();
