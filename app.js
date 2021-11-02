/*  1. Create div element
    2. add class to div element
    3. create li, create button, append them inside the div and append the div inside the ul 
    4. Create 2 buttons with 2 icons
    5. Add event listeners on the buttons
*/


// Get all selectors
const inputField = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');
// const storedTasks = localStorage.getItem('todo-item');

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', checkButtonClick);
filterTodo.addEventListener('click', filterTasks);
document.addEventListener('DOMContentLoaded', getTodos);

// Functions
function addTodo(e) {

    e.preventDefault();

    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';

    // List
    const eachList = document.createElement('li');
    eachList.innerText = inputField.value;
    eachList.classList.add('todo-item');
    todoDiv.appendChild(eachList);

    // Add todo to localStorage
    // console.log(todoDiv.firstChild.innerText);
    // allValz.push(inputField.value);
    saveValue(inputField.value);


    // 2 Buttons
    // Completed Button
    const compButton = document.createElement('button');
    compButton.innerHTML = `<i class="fa fa-check"></i>`;
    compButton.className = 'completed-btn';
    todoDiv.appendChild(compButton);

    // Delete Button
    const delButton = document.createElement('button');
    delButton.innerHTML = `<i class="fa fa-trash"></i>`;
    delButton.className = 'delete-btn';
    todoDiv.appendChild(delButton);

    console.log(todoDiv);

    // Pushing todoDiv under todoList
    todoList.appendChild(todoDiv);


    inputField.value = "";

}


function checkButtonClick(e) {
    const todoItem = e.target.parentElement;
    console.log(e.target.classList);
    if (e.target.className === "completed-btn") {
        // Add classes when complete btn is clicked
        todoItem.classList.toggle('completed');
    }
    else if (e.target.className === "delete-btn") {
        todoItem.classList.add('fall');
        removeFromLocal(todoItem);
        setTimeout((e) => {
            todoItem.remove();
        }, 2000);
    }
}

// since this function will happen when we click the select statement,
// the e.target is referring to whenever the select stamement is clicked
// or when the options are clicked
function filterTasks(e) {
    const allTodos = todoList.children;
    console.log(allTodos);
    for (let i = 0; i < allTodos.length; i++) {
        console.log(allTodos[i]);
        switch (e.target.value) {
            case "all":
                allTodos[i].style.display = "flex";
                break;
            case "completed":
                if (allTodos[i].classList.contains('completed')) {
                    allTodos[i].style.display = "flex";
                }
                else {
                    allTodos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (allTodos[i].classList.contains('completed')) {
                    allTodos[i].style.display = "none";
                }
                else {
                    allTodos[i].style.display = "flex";
                }
                break;
        }
    }
}

function saveValue(todo) {
    let allTodos;
    if (localStorage.getItem('todo-item') === null) {
        allTodos = [];
    }
    else {
        allTodos = JSON.parse(localStorage.getItem('todo-item'));
    }

    // when either of the statements are true above, continue pusshing stuff into allTodos array and set array to localStorage
    allTodos.push(todo);
    localStorage.setItem('todo-item', JSON.stringify(allTodos));
}

function getTodos() {
    let allTodos;
    if (localStorage.getItem('todo-item') === null) {
        allTodos = [];
    }
    else {
        allTodos = JSON.parse(localStorage.getItem('todo-item'));
    }

    allTodos.forEach((eachVal) => {
        if (eachVal) {
            // Todo Div
            const todoDiv = document.createElement('div');
            todoDiv.className = 'todo';

            // List
            const eachList = document.createElement('li');
            eachList.innerText = eachVal;
            eachList.classList.add('todo-item');
            todoDiv.appendChild(eachList);

            // 2 Buttons
            // Completed Button
            const compButton = document.createElement('button');
            compButton.innerHTML = `<i class="fa fa-check"></i>`;
            compButton.className = 'completed-btn';
            todoDiv.appendChild(compButton);

            // Delete Button
            const delButton = document.createElement('button');
            delButton.innerHTML = `<i class="fa fa-trash"></i>`;
            delButton.className = 'delete-btn';
            todoDiv.appendChild(delButton);

            console.log(todoDiv);

            // Pushing todoDiv under todoList
            todoList.appendChild(todoDiv);


            inputField.value = "";
        }
        else {
            console.log('bruh');
        }
    });
}


function removeFromLocal(todo) {
    let allTodos;
    if (localStorage.getItem('todo-item') === null) {
        allTodos = [];
    }
    else {
        allTodos = JSON.parse(localStorage.getItem('todo-item'));
    }
    // console.log(todo.children[0].innerText);
    console.log(allTodos.indexOf(todo.children[0].innerText));
    allTodos.splice(allTodos.indexOf(todo.children[0].innerText), 1);
    localStorage.setItem('todo-item', JSON.stringify(allTodos));
}
