{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  }

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  }

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-removeButton");

    removeButtons.forEach((removeButtons, taskIndex) => {
      removeButtons.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

    toggleDoneButtons.forEach((toggleDoneButtons, taskIndex) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  }

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="taskList__item${task.done ? " list__item--done" : ""}">
        <button class="js-doneButton taskList__button taskList__button--done">${task.done ? "✔" : ""}</button>
    ${task.content}
    <button class="js-removeButton taskList__button taskList__button--remove">\🗑</button>
        </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  }

  const clearInput = (taskContent) => {
    taskContent.value = "";
    taskContent.focus();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const taskContent = document.querySelector(".js-newTask");
    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      clearInput(taskContent);
      return;
    }
    
    addNewTask(newTaskContent);
    clearInput(taskContent);
  };

  const init = () => {

    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);

  };

  init();
}