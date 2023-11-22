document.addEventListener('DOMContentLoaded', function () {
    // Load tasks from local storage
    loadTasks();

    // Set up event listeners
    document.getElementById('task-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create task element
        const taskList = document.getElementById('task-list');
        const newTask = document.createElement('li');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">Delete</button>
            <button onclick="toggleImportant(this)">Important</button>
        `;

        // Add task to the top of the list
        taskList.insertBefore(newTask, taskList.firstChild);

        // Clear input field
        taskInput.value = '';

        // Save tasks to local storage
        saveTasks();
    }
}

function deleteTask(button) {
    const task = button.parentElement;
    task.remove();

    // Save tasks to local storage
    saveTasks();
}

function toggleImportant(button) {
    const task = button.parentElement;
    task.classList.toggle('important');

    // Save tasks to local storage
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('task-list');
    taskList.childNodes.forEach(function (task) {
        tasks.push({
            text: task.querySelector('span').innerText,
            important: task.classList.contains('important'),
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        tasks.forEach(function (task) {
            const newTask = document.createElement('li');
            newTask.innerHTML = `
                <span>${task.text}</span>
                <button onclick="deleteTask(this)">Delete</button>
                <button onclick="toggleImportant(this)">Important</button>
            `;

            if (task.important) {
                newTask.classList.add('important');
            }

            taskList.appendChild(newTask);
        });
    }
}
