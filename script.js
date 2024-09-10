// Add task button
const input = document.getElementById('task_input').textContent;
const addButton = document.getElementById('add_button');
addButton.addEventListener('click', function(event) {
    let taskObject = createTask(input);
    addToStorage(taskObject);
    let newRow = newRowGenerator(taskObject);
});

function createTask(input){
    let taskObject = {}
    taskObject.id = idGenerator();
    taskObject.task = input;
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
    
}