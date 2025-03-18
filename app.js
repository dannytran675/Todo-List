//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos) //checks if everything in our page loads up, if it does run getTodos()
todoButton.addEventListener('click', addTodo); //checks to see if user clicks the "Add" button, then runs the addTodo function if clicked
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault(); //Prevents form from submitting when clicking button
    //Todo DIV
    if (todoInput.value != "") { //only allows adding a todo if the user actually inputs text
        const todoDiv = document.createElement('div'); //creates a new div
        todoDiv.classList.add('todo');
        //Create List
        const newTodo = document.createElement('li'); //creates a list
        newTodo.innerText = todoInput.value; //Uses the user input as the text
        newTodo.classList.add('todo-item'); //used to style css
        todoDiv.appendChild(newTodo); //appends the list to the div
        //ADD todo to local storage
        saveLocalTodos(todoInput.value);
        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; //adds this as HTML instead of text
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton); //appends the completed button to the div
        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //adds this as HTML instead of text
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton); //appends the completed button to the div
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
        //Clear Todo INPUT VALUE
        todoInput.value = "";
    } else {

    }
}

function deleteCheck(e) {
    //console.log(e.target) event checks what event i'm clicking on: this code outputs what I am clicking on.
    const item = e.target;
    //Delete Todo Item
    if (item.classList[0] === 'trash-btn') { //means we clicked trash button
        const todo = item.parentElement; //gets the parent elements of trash-btn which is the entire div itself because of the way we set it up
        //Animation
        todo.classList.add("fall"); //used for css falling animation
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        }); //waits until the fall animation is done then removes the element.
    }

    //Check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed'); //used for css
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex'; //shows all todos
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; //shows completed todos
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //Check if I already have a todo
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //parses back into array
    }
    todos.push(todo); //pushes todo into todos array
    localStorage.setItem('todos', JSON.stringify(todos)); //pushes this back into local storage
}

function getTodos() {
    //Check if I already have a todo
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //parses back into array
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div'); //creates a new div
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li'); //creates a list
        newTodo.innerText = todo; //Uses the todo that's being passed
        newTodo.classList.add('todo-item'); //used to style css
        todoDiv.appendChild(newTodo); //appends the list to the div
        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; //adds this as HTML instead of text
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton); //appends the completed button to the div
        //Trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; //adds this as HTML instead of text
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton); //appends the completed button to the div
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo /*class of todo aka the div*/) {
    //Check if I already have a todo
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); //parses back into array
    }
    const todoItem = todo.children[0].innerText //gets the li of todo (the item)
    todos.splice(todos.indexOf(todoItem), 1); //removes the item from the array
    localStorage.setItem('todos', JSON.stringify(todos)); //sets back the local storage
}