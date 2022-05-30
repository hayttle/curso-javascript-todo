const inputSearchTodo = document.querySelector(".search input");
const inputAddTodo = document.querySelector(".inputAddTodo");
const todosContainer = document.querySelector("ul");
const form = document.querySelector("form");
const btnAddTodo = document.querySelector(".btnAddTodo");

const addTodo = (inputAddTodo) => {
  if (inputAddTodo) {
    todosContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <li><span>
            ${inputAddTodo}
          </span>
          <span>
            <i class="fas fa-check-circle"></i>
            <i class="fas fa-trash"></i>
          </span>
      </li>
      `
    );
  }
};

const removeTodo = (li) => {
  li.remove();
};

const doneTodo = (li) => {
  li.classList.toggle("done");
};

const insertTodoIntoDOM = (todos) => {
  let HTMLTemplate = "";
  todos.forEach((todo) => {
    HTMLTemplate += `
          <li class="${todo.className}">
           <span>${todo.innerText}</span>
            <span>
              <i class="fas fa-check-circle"></i>
              <i class="fas fa-trash"></i>
            </span>
          </li>`;
  });
  todosContainer.innerHTML = HTMLTemplate;
};

const changePositionTodoToEnd = (li, todos) => {
  doneTodo(li);
  todos.push(todos.splice(todos.indexOf(li), 1)[0]);
  insertTodoIntoDOM(todos);
};

const changePositionTodoToBegin = (li, todos) => {
  doneTodo(li);
  todos.unshift(todos.splice(todos.indexOf(li), 1)[0]);
  insertTodoIntoDOM(todos);
};

const hideTodo = (searchTodo, todos) => {
  todos
    .filter((todo) => !todo.textContent.toLowerCase().includes(searchTodo))
    .forEach((todo) => {
      todo.classList.add("hidden");
    });
};

const showTodo = (searchTodo, todos) => {
  todos
    .filter((todo) => todo.textContent.toLowerCase().includes(searchTodo))
    .forEach((todo) => {
      todo.classList.remove("hidden");
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addTodo(inputAddTodo.value.trim());
  event.target.reset();
});

inputSearchTodo.addEventListener("input", (event) => {
  const searchTodo = event.target.value.trim().toLowerCase();
  const todos = Array.from(todosContainer.children);

  hideTodo(searchTodo, todos);
  showTodo(searchTodo, todos);
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const li = clickedElement.parentElement.parentElement;
  const classesTodo = Array.from(clickedElement.classList);

  if (classesTodo.includes("fa-trash")) {
    removeTodo(li);
    return
  }
  
  if (classesTodo.includes("fa-check-circle")) {
    const todos = Array.from(todosContainer.children);
    li.className !== "done" ? changePositionTodoToEnd(li, todos) : changePositionTodoToBegin(li, todos);
  }
});
