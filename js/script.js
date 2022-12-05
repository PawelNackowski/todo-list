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
    tasks[taskIndex].done = !tasks[taskIndex].done;
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
    <li class="${task.done && hidenDoneTasks
          ? "taskList__item--hiden"
          : "taskList__item"}">
     <button class="js-done taskList__button taskList__button--toggleDone">
      ${task.done ? " ✔" : ""}
      </button>
     <span class="taskList${task.done ? " taskList__item--done" : ""}">
       ${task.content}
     </span>
     <button class="js-remove taskList__button taskList__button--remove">
       🗑   
     </button>
   </li>
  `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
  }

  const renderButtons = () => {
    const bindButton = document.querySelector(".js-buttonsEvents")
    if (tasks.length === 0) {
      bindButton.innerHTML = "";
      return
    }

    bindButton.innerHTML = `
    <button class="js-switchDoneTasks buttonSection">
      ${hidenDoneTasks ? "Pokaż" : "Ukryj"} ukończone
    </button>
    <button class="js-markAllTaskDone buttonSection" 
    ${tasks.every(({ done }) => done) ? "disabled" : ""}>
      Ukończ wszystkie
    </button>`;
  }

  const bindButtonsEvents = () => {
    const switchTaskDone = document.querySelector(".js-switchDoneTasks");
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