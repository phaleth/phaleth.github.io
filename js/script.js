const scratchTodo = e => {
    e.target.style.textDecoration = 'line-through';
    e.target.removeEventListener('click', scratchTodo, false);
}

document.querySelectorAll('li span').forEach(todoText => {
    todoText.addEventListener('click', scratchTodo, false);
});

const completeTodo = e => {
    e.target.src = './assets/complete.svg';
    const todoText = e.target.parentElement.querySelector('span');
    todoText.style.color = 'lightgray';
    todoText.removeEventListener('click', scratchTodo, false);
    e.target.removeEventListener('click', completeTodo, false);
}

document.querySelectorAll('li img.status').forEach(todoStatus => {
    todoStatus.addEventListener('click', completeTodo, false);
});

const deleteTodo = e => {
    e.target.parentElement.querySelector('span').removeEventListener('click', scratchTodo, false);
    e.target.parentElement.querySelector('img.status').removeEventListener('click', completeTodo, false);
    e.target.removeEventListener('click', deleteTodo, false);
    e.target.parentElement.remove();
}

document.querySelectorAll('li img.delete').forEach(todoDelete => {
    todoDelete.addEventListener('click', deleteTodo, false);
});

const todoInput = document.querySelector('input');

const createNewTodo = () => {
    const newTodoItem = document.createElement('li');
    newTodoItem.innerHTML = `
        <span>${todoInput.value}</span>
        <img class="delete" src="./assets/delete.svg">
        <img class="status" src="./assets/assigned.svg">
    `;
    document.querySelector('ul').insertAdjacentElement('beforeend', newTodoItem);
    todoInput.value = '';
    newTodoItem.querySelector('span').addEventListener('click', scratchTodo, false);
    newTodoItem.querySelector('img.status').addEventListener('click', completeTodo, false);
    newTodoItem.querySelector('img.delete').addEventListener('click', deleteTodo, false);
}

todoInput.addEventListener('keypress', e => {
    if (todoInput.value && e.key === 'Enter') {
        createNewTodo();
    }
}, false);

document.querySelector('button').addEventListener('click', () => {
    if (todoInput.value) createNewTodo();
}, false);
