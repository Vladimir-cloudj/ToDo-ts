// select elements
const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLUListElement;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;

// Add form event listener
formTodo.addEventListener('submit', e => {
    e.preventDefault();
    addTodo(e);
} );

function addTodo(e: Event) {
    const newTodo: Todo ={
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    };
    todos.push(newTodo);
    // Todo save to local storage
    saveTodo();
    // append new todo Function
    appendTodo(newTodo);
    // reset input
    inputTodo.value = '';
}
// save todo function
function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
// new todo interface
interface Todo {
    id: number;
    todo: string;
    completed: boolean;

}
// newtodo array
const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
// append todo function
window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
})
// new append todo function
function appendTodo(newTodo: Todo) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = newTodo.completed;
    // add checkbox event listener
    checkbox.addEventListener('change', () => {
        newTodo.completed = checkbox.checked;
        // save change to local starage
        saveTodo();
    })
    li.append(newTodo.todo, checkbox);
    todoList.prepend(li);
}

// deleate all todo tasks
const clearTodos = () => {
    todos.length = 0;
    saveTodo();
    todoList.innerHTML = '';
}
btnDeleteAll.addEventListener('click', clearTodos);
