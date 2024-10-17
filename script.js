let tasks = [];

function loadTasks() {
    const data = localStorage.getItem('tasks');
    tasks = data ? JSON.parse(data) : [];
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(description) {
    const task = {
        id: tasks.length + 1,
        description: description,
        completed: "Not completed"
    };
    tasks.push(task);
    saveTasks();
    console.log(`Added task: "${description}"`);
}

function showTasks() {
    if (tasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    console.log('Tasks:');
    tasks.forEach(task => {
        console.log(`${task.id}. ${task.description} [${task.completed}]`);
    });
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {

        task.completed = task.completed === "Not completed" ? "Completed" : "Not completed";
        saveTasks();
        console.log(`Toggled task ${id}`);
    } else {
        console.log('Invalid task ID.');
    }
}

function updateTask(id, newDescription) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.description = newDescription;
        saveTasks();
        console.log(`Updated task ${id}`);
    } else {
        console.log('Invalid task ID.');
    }
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        tasks.forEach((task, i) => task.id = i + 1);
        console.log(`Deleted task ${id}`);
    } else {
        console.log('Invalid task ID.');
    }
}

function searchTasks(search) {
    const lowerCaseQuery = search.toLowerCase();
    const results = tasks.filter(task => task.description && task.description.toLowerCase().includes(lowerCaseQuery));

    if (results.length > 0) {
        console.log('Search results:');
        results.forEach(task => {
            console.log(`${task.id}. ${task.description} [${task.completed}]`);
        });
    } else {
        console.log('No matching tasks found.');
    }
}

function menu() {
    let choice;
    while (choice !== '7') {
        console.log(`
            1. Add task
            2. View tasks
            3. Toggle task
            4. Update task
            5. Delete task
            6. Search task
            7. Exit
        `);

        choice = prompt('Enter number (1-7):');

        switch (choice) {
            case '1':
                const taskDescription = prompt('Enter task description:');
                addTask(taskDescription);
                break;
            case '2':
                showTasks();
                break;
            case '3':
                const taskToToggle = parseInt(prompt('Enter task ID to toggle:'));
                toggleTask(taskToToggle);
                break;
            case '4':
                const taskToUpdate = parseInt(prompt('Enter task ID to update:'));
                const newTaskDescription = prompt('Enter new task description:');
                updateTask(taskToUpdate, newTaskDescription);
                break;
            case '5':
                const taskToDelete = parseInt(prompt('Enter task ID to delete:'));
                deleteTask(taskToDelete);
                break;
            case '6':
                const search = prompt('Enter search tasks:');
                searchTasks(search);
                break;
            case '7':
                console.log('Exiting');
                break;
            default:
                console.log('Invalid input');
        }
    }
}

loadTasks();
menu();