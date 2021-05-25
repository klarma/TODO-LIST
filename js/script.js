{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = newTaskContent => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            done: !tasks[taskIndex].done,
        };

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTask = !hideDoneTask;

        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDoneTask(taskIndex);
            });
        });
    };

    const bindHideTasksEvent = () => {

        const hideDoneTaskButton = document.querySelector(".js-buttonHideDoneTasks");

        if (!hideDoneTaskButton) return;

        hideDoneTaskButton.addEventListener("click", toggleHideDoneTasks);
    };

    const bindFinishTasksEvent = () => {
        const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

        if (!buttonFinishAllTasks) return;

        buttonFinishAllTasks.addEventListener("click", finishAllTasks);
    };

    const clearForm = (newTaskElement) => {
        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const renderTasks = () => {
        let tasksTransformToHTML = tasks.map(task => `
            <li class="tasksList__item${task.done && hideDoneTask ? " taskList__item--hide" : ""}">
                <button class="tasksList__button tasksList__button--done js-done">
                    ${task.done ? "<i class='fas fa-check'></i>" : ""}
                </button>
                <span class="tasksList__spanTask${task.done ? " tasksList__spanTask--done" : ""}">${task.content}
                </span>
                <button class="tasksList__button js-remove">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>          
            `)
            .join("");


        document.querySelector(".js-tasks").innerHTML = tasksTransformToHTML;
    };

    const renderButtons = () => {
        const spanForButtonsElement = document.querySelector(".js-section__span");

        if (!tasks.length) {
            spanForButtonsElement.innerHTML = ""
            return;
        };

        spanForButtonsElement.innerHTML = `
            <button class="section__button js-buttonHideDoneTasks">
                 ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="section__button js-buttonFinishAllTasks"
                 ${tasks.every(({done}) => done) ? "disabled" : ""}>
                  Ukończ wszystkie
            </button>
            `;
}; 

const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindHideTasksEvent();
    bindFinishTasksEvent();
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask")
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
        return
    };

    addNewTask(newTaskContent);

    clearForm(newTaskElement);
};

const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
};

init();
}