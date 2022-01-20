const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".post-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//действия
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e){
//поведение
  e.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  saveLocalTodos(todoInput.value);
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
//кнопка зачеркнуть
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
//кнопка удаление
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-times-circle"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
//поле задачи
  todoList.appendChild(todoDiv);
}

function deleteTodo(e){
  const item = e.target;
  if (item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    todo.classList.add("fall");
//задачи переходят на верх
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e =>{
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all-tasks":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "not-completed":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  let todos;
  if (localStorage.getItem("todos") === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
    todos.forEach(function(todo){
//сохранение
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); 
    todoList.appendChild(todoDiv);
//список  
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
//кнопка
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check-circle"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
//delete todos
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-times-circle"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
  
  });
}

jQuery(($) => {
  $('.select').on('click', '.select__head', function () {
      if ($(this).hasClass('open')) {
          $(this).removeClass('open');
          $(this).next().fadeOut();
      } else {
          $('.select__head').removeClass('open');
          $('.select__list').fadeOut();
          $(this).addClass('open');
          $(this).next().fadeIn();
      }
  });

  $('.select').on('click', '.select__item', function () {
      $('.select__head').removeClass('open');
      $(this).parent().fadeOut();
      $(this).parent().prev().text($(this).text());
      $(this).parent().prev().prev().val($(this).text());
  });

  $(document).click(function (e) {
      if (!$(e.target).closest('.select').length) {
          $('.select__head').removeClass('open');
          $('.select__list').fadeOut();
      }
  });
});

