const inputSearchTodo = document.querySelector(".search input");
const inputAddTodo = document.querySelector(".inputAddTodo");
const todosContainer = document.querySelector("ul");
const form = document.querySelector("form");

const addTodo = (event) => {
  event.preventDefault();
  const todo = inputAddTodo.value.trim();
  event.target.reset();

  if (!todo) {
    return;
  }
  todosContainer.insertAdjacentHTML(
    "afterbegin",
    `
      <li data-todo="${todo}"><span>
            ${todo}
          </span>
          <span>
          <i class="fas fa-check-circle" data-check="${todo}"></i>
          <i class="fas fa-trash" data-trash="${todo}"></i>
          </span>
          </li>`
  );
};

const reorganizeTodos = (checkWasClicked) => {
  const todo = document.querySelector(`[data-todo="${checkWasClicked}"]`);
  const todoWasMarkedAsDone = todo.classList.contains("done");

  todo.classList.toggle("done");

  if (todoWasMarkedAsDone) {
    todosContainer.prepend(todo);
    return;
  }

  todosContainer.append(todo);
};

const handleTodoClick = (event) => {
  const clickedElement = event.target;
  const trashWasClicked = clickedElement.dataset.trash;
  const checkWasClicked = clickedElement.dataset.check;

  if (trashWasClicked) {
    const todo = document.querySelector(`[data-todo="${trashWasClicked}"]`);
    todo.remove();
    return;
  }

  if (checkWasClicked) {
    reorganizeTodos(checkWasClicked);
  }
};

const searchTodo = (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const todos = Array.from(todosContainer.children).map((todo) => ({
    todo,
    shouldBeVisible: todo.textContent.toLowerCase().includes(inputValue),
  }));

  todos.forEach(({todo,shouldBeVisible}) => {
    if(!shouldBeVisible){
      todo.classList.add('hidden')
      return
    }
    todo.classList.remove('hidden')
  });
};

form.addEventListener("submit", addTodo);
todosContainer.addEventListener("click", handleTodoClick);
inputSearchTodo.addEventListener("input", searchTodo);
