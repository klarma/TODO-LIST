{
    const tasks = [
        {
            content: "zrób pranie",
            done: false,
        },
        {
            content: "zadzwoń Warzywoda",
            done: true,
        },
    ];

    const addNewTask = newTaskContent => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });

        render();
    };

    const toggleDoneTask = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);

        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleDoneTask(taskIndex);
            });
        });
    };

    const clearForm = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="tasksList__item"
            ${task.done ? "style=\"text-decoration: line-through\"" : ""}
            >
            <button class="tasksList__buttonDone js-done">${task.done ? "<i class='fas fa-check'></i>" : ""}</button>
            ${task.content}
            <span class="tasksList__span"><button class="taskList__buttonRemove js-remove"><i class="fas fa-trash-alt"></i></button></span>
            </li>          
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask")
        const newTaskContent = newTask.value.trim();

        if (newTaskContent === "") {
            return
        };

        addNewTask(newTaskContent);

        clearForm(newTask);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}