window.addEventListener('load', getLocalStorage);

function getLocalStorage() {
  let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
  if (localStorageTodos) {
    todoArray = localStorageTodos;
    localStorageTodos.forEach(todoObj => {
      createTodoItem(todoObj);
    });
  } else {
    todoArray = [];
  }
  console.log(localStorageTodos);
}
