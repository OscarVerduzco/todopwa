// Creando la estructura de la BD
const db = new Dexie("Todo APP");
db.version(1).stores({todos:"++id, todo"});

const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list = document.querySelector('#tasks');

//add todo

form.onsubmit = async(e) => {
    e.preventDefault();
    const todo = input.value;
    if(todo){
        await db.todos.add({todo});
        input.value = '';
        await getTodos();
        form.reset();
    }
}

//get todos
const getTodos = async() => {
    const todos = await db.todos.reverse().toArray();
    list.innerHTML = todos
        .map((todo, i) =>
             `<div class="task">
                <div class="content">
                    <input id="edit" class="text" readonly type="text"  value="${todo.todo}">
                </div>
                <div class="actions">
                    <button class="delete" onclick="deletTodo(event, ${todo.id})">Delete</button>
                </div>
            </div>`).join('');
    
};

window.onload = getTodos;

//delete todo
const deletTodo = async(e, id) => {
    await db.todos.delete(id);
    await getTodos();
}

