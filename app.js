const form = document.querySelector("form");
const inputTodo = document.querySelector("form input");
const todosContainer = document.querySelector("ul");
const inputSearch = document.querySelector(".search input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (inputTodo.value) {
    todosContainer.innerHTML += `
      <li><span>${inputTodo.value.trim()}</span><span><i class="fas fa-check"></i><i class="fas fa-trash"></i></span></li>
      `;
  }

  form.reset();
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const classesTodo = Array.from(clickedElement.classList);
  if (classesTodo.includes("fa-trash")) {
    clickedElement.parentElement.parentElement.remove();
  }
  if (classesTodo.includes("fa-check-circle")) {
    clickedElement.parentElement.parentElement.classList.toggle("done");
    clickedElement.classList.toggle("done");
  }
});

inputSearch.addEventListener("input", (event) => {
  const searchTodo = event.target.value.trim().toLowerCase();
  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(searchTodo))
    .forEach((todo) => {
      todo.classList.add("hidden");
    });
  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(searchTodo))
    .forEach((todo) => {
      todo.classList.remove("hidden");
    });
});
