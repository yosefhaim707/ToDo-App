// Get the input element to add a new task
const input = document.getElementById('task_input');

// Add event listener to the add button
const addButton = document.getElementById('add_button');
addButton.addEventListener('click', function(event) {
    // Create a new task object
    const taskObject = createTask(input);
    // Add the task object to the tasks array in local storage
    addToStorage(taskObject);
    // Get the tasks array from local storage
    const tasks = getTasks();
    // Display the tasks in the table
    displayTasks(tasks);
});

// Create a new task object
function createTask(input) {
    const taskObject = {};
    // Generate a unique id for the task
    taskObject.id = idGenerator();
    // Get the task name from the input element
    taskObject.task = input.value;
    // Set the task as not completed
    taskObject.completed = false;
    return taskObject;
};

// Generate a unique id for the task
function idGenerator() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 9) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
};

// Add the task object to the tasks array in local storage
function addToStorage(taskObject) {
    const tasks = getTasks();
    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Get the tasks array from local storage
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
};

// Create a new row in the table for the task
function newRowGenerator(task) {
    const row = document.createElement('tr');
    const id = document.createElement('td');
    const taskName = document.createElement('td');
    const completed = document.createElement('td');
    const actions = createActions(task.id);
    id.textContent = task.id;
    taskName.textContent = task.task;
    completed.textContent = task.completed;
    row.appendChild(id);
    row.appendChild(taskName);
    row.appendChild(completed);
    row.appendChild(actions);
    return row;
};

// Create the actions for the task
function createActions(taskId) {
    const actions = document.createElement('td');
    const editButton = document.createElement('button');
    const completeButton = document.createElement('button');
    const deleteButton = document.createElement('button');
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
};

// Complete the task
function completeFunc(taskId) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
};

// Delete the task
function deleteTask(taskId) {
    const tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
};

// Edit the task
function editTask(taskId) {
    const tasks = getTasks();
    const task = tasks.find(task => task.id === taskId);
    document.getElementById('edit_input').value = task.task;
    document.getElementById('edit_container').style.display = 'block';
    const editButton = document.getElementById('edit_button');
    editButton.addEventListener('click', () => {
        task.task = document.getElementById('edit_input').value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(tasks);
        document.getElementById('edit_container').style.display = 'none';
    })

    const cancelButton = document.getElementById('cancel_button');
    cancelButton.addEventListener('click', () => {
        document.getElementById('edit_container').style.display = 'none';
    })
};

// Display the tasks in the table
function displayTasks(tasks) {
    const tbody = document.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const row = newRowGenerator(tasks[i]);
        tbody.appendChild(row);
    }
};

// Delete all tasks from local storage
function deleteLocalStorage() {
    localStorage.clear();
};
deleteLocalStorage();

// Add event listener to the filter button
const filterButton = document.getElementById('filter');
filterButton.addEventListener('click', filterTasks);

// Filter the tasks by completed
function filterTasks() {
    const tasks = getTasks();
    console.log(tasks);
    const completedTasks = tasks.filter(task => task.completed === true);
    console.log(completedTasks);
    displayTasks(completedTasks);
};

