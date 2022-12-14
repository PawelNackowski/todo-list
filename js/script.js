{
  let tasks = [];
  let hidenDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      { content: newTaskContent, },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex +1)]
    render();
  }

  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      { ...tasks[taskIndex], done: !tasks[taskIndex].done },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  }

  const bindRemoveEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, taskIndex) => {
      removeButtons.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  }


  const bindToggleDoneEvent = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButtons, taskIndex) => {
      toggleDoneButtons.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  }

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
    <li class="task__item${task.done && hidenDoneTasks ? "task__item--hiden" : ""}">
     <button class="js-done task__button task__button--toggleDone">
      ${task.done ? " ✔" : ""}
      </button>
     <span class="task${task.done ? " task__content--done" : ""}">
       ${task.content}
     </span>
     <button class="js-remove task__button task__button--remove">
       🗑   
     </button>
   </li>
  `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  }

  const renderButtons = () => {
    const managementButtons = document.querySelector(".js-managementButtons");
    if (tasks.length === 0) {
      managementButtons.innerHTML = "";
      return
    }

    managementButtons.innerHTML = `
    <button class="js-toggleHidenDoneTasks buttons__button">
      ${hidenDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button class="js-markAllTaskDone buttons__button" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
      Ukończ wszystkie
    </button>`;
  }

  const bindButtonsEvents = () => {
    const switchTaskDone = document.querySelector(".js-toggleHidenDoneTasks");
    const markAllTaskDone = document.querySelector(".js-markAllTaskDone");

    switchTaskDone?.addEventListener("click", switchDoneTask);
    markAllTaskDone?.addEventListener("click", markAllDoneTask);
  };

  const switchDoneTask = () => {
    hidenDoneTasks = !hidenDoneTasks;
    render();
  }

  const markAllDoneTask = () => {
    tasks = tasks.map((tasks) => ({
      ...tasks,
      done: true,
    }))
    render();
  }

  const render = () => {

  
    renderTasks();
    renderButtons();
    bindRemoveEvent();
    bindToggleDoneEvent();
    bindButtonsEvents();
  };

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