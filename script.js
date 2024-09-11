// Add task button
let input = document.getElementById('task_input');

const addButton = document.getElementById('add_button');
addButton.addEventListener('click', function(event) {
    let taskObject = createTask(input);
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
    let actions = createActions(task.id);
    id.textContent = task.id;
    taskName.textContent = task.task;
    completed.textContent = task.completed;
    row.appendChild(id);
    row.appendChild(taskName);
    row.appendChild(completed);
    row.appendChild(actions);
    return row;
}

function createActions(taskId){
    let actions = document.createElement('td');
    let editButton = document.createElement('button');
    let completeButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    editButton.textContent = 'Edit';
    completeButton.textContent = 'Complete';
    deleteButton.textContent = 'Delete';
    completeButton.addEventListener('click', () => completeFunc(taskId));
    deleteButton.addEventListener('click', () => deleteTask(taskId));
    editButton.addEventListener('click', () => editTask(taskId));
    actions.appendChild(editButton);
    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    return actions;
}

function completeFunc(taskId){
    let tasks = getTasks();
    let task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
}

function deleteTask(taskId){
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
}

function editTask(taskId){
    let tasks = getTasks();
    let task = tasks.find(task => task.id === taskId);
    document.getElementById('edit_input').value = task.task;
    document.getElementById('edit_container').style.display = 'block';
    let editButton = document.getElementById('edit_button');
    editButton.addEventListener('click', () => {
        task.task = document.getElementById('edit_input').value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(tasks);
        document.getElementById('edit_container').style.display = 'none';
    })

    let cancelButton = document.getElementById('cancel_button');
    cancelButton.addEventListener('click', () => {
        document.getElementById('edit_container').style.display = 'none';
    })
}


function displayTasks(tasks){
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



const filterButton = document.getElementById('filter');
filterButton.addEventListener('click', filterTasks);
function filterTasks(){
    let tasks = getTasks();
    console.log(tasks);
    let completedTasks = tasks.filter(task => task.completed === true);
    console.log(completedTasks);
    displayTasks(completedTasks);
}


