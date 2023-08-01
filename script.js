const addTodoButton = document.querySelector(".add-todo-button");
const todoInput = document.querySelector(".add-todo");
const todoListContainer = document.querySelector("#todo-container");
let savedTodos = JSON.parse(localStorage.getItem("saved-todos"));

if(savedTodos==undefined){
    savedTodos = {};
    localStorage.setItem("saved-todos",JSON.stringify(savedTodos))
}else{
    loadTodos()
}

addTodoButton.addEventListener("click",(e)=>{
    const todo = todoInput.value;
    if(todo.trim()){
        const id = getRandomId();
        addTodo(todo, false, id);
        cacheTodo(todo,id, false);
        todoInput.value = ""
    }
});

document.addEventListener("keydown",e=>{
    const todo = todoInput.value;
    if(e.key=="Enter" && todo.trim()){
        const id = getRandomId();
        addTodo(todo, false, id);
        cacheTodo(todo,id, false);
        todoInput.value = ""
    }
})

function addTodo(todo, checked, id){
    const todoItem =  document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML=`
        <input type="checkbox" ${checked? "checked":""} name="checkmark" class="checkmark">
        <div class="todo-description">${todo}</div>
        <div class="remove-todo">✕</div>
    `
    todoItem.querySelector(".checkmark").addEventListener("click",(e)=>{
        const checkedState = e.target.checked;
        savedTodos[id].checked = checkedState;
        saveCache();
    });

    todoItem.querySelector(".remove-todo").addEventListener("click",(e)=>{
        todoItem.remove();
        delete savedTodos[id];
        saveCache();
    });
    todoListContainer.appendChild(todoItem);
}

function saveCache(){
    localStorage.setItem("saved-todos",JSON.stringify(savedTodos))
}

function cacheTodo(todo, id, checked){
    savedTodos[id]={
        id:id,
        todo:todo,
        checked:checked
    };
    localStorage.setItem("saved-todos",JSON.stringify(savedTodos))
}

function loadTodos(){
    Object.keys(savedTodos).forEach((id) => {
        const todoObj = savedTodos[id]
        const todo = todoObj.todo;
        const checked = todoObj.checked;
        addTodo(todo,checked, id);
    });
}

function getRandomId(){
    return "ID"+(Math.random() + 1).toString(36).substring(7);
}