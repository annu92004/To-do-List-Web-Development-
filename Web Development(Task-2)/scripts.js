let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
    displayTasks();
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: new Date().getTime(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();

    taskInput.value = '';
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(id) {
    const newTaskText = prompt('Edit task:');
    if (newTaskText === null || newTaskText.trim() === '') {
        return;
    }

    tasks = tasks.map(task => {
        if (task.id === id) {
            task.text = newTaskText.trim();
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}