{
  const tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButtons, taskIndex) => {
      removeButtons.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  }


    const render = () => {
      let htmlString = "";

      for (const task of tasks) {
        htmlString += `
        <li>
        <button class="js-done">done?</button>
    ${task.content}
    <button class="js-remove">remove</button>
        </li>
        `;
      }

      document.querySelector(".js-tasks").innerHTML = htmlString;

      bindEvents();
    }

    const removeTask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      render();


    }
    const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();
      if (newTaskContent === "") {
        return;
      }
      addNewTask(newTaskContent);
    };

    const init = () => {

      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);

    };

    init();
  }