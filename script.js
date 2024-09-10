// Add task button
let input = document.getElementById('task_input');
console.log(input);
const addButton = document.getElementById('add_button');
addButton.addEventListener('click', function(event) {
    let taskObject = createTask(input);
    console.log(taskObject);
    addToStorage(taskObject);
    let tasks = getTasks();
    displayTasks(tasks);
});

function createTask(input){
    let taskObject = {}
    taskObject.id = idGenerator();
    taskObject.task = input.value;
    taskObject.completed = false;
    return taskObject;
}

function idGenerator(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 9) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function addToStorage(taskObject){
    let tasks = getTasks();
    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if(!tasks){
        tasks = [];
    }
    return tasks;
}

function newRowGenerator(task){
    let row = document.createElement('tr');
    let id = document.createElement('td');
    let taskName = document.createElement('td');
    let completed = document.createElement('td');
    let actions = createActions();
    id.textContent = task.id;
    taskName.textContent = task.task;
    completed.textContent = task.completed;
    row.appendChild(id);
    row.appendChild(taskName);
    row.appendChild(completed);
    row.appendChild(actions);
    return row;
}

function createActions(){
    let actions = document.createElement('td');
    let editButton = document.createElement('button');
    let completeButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    editButton.textContent = 'Edit';
    completeButton.textContent = 'Complete';
    deleteButton.textContent = 'Delete';
    actions.appendChild(editButton);
    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    return actions;
}

function displayTasks(tasks){
    let table = document.getElementById('task_table');
    let tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){
        let row = newRowGenerator(tasks[i]);
        tbody.appendChild(row);
    }
}

function deleteLocalStorage(){
    localStorage.clear();
}
deleteLocalStorage();