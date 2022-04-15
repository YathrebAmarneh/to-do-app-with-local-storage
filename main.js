let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty Arrayto store the tasks
let arrayOfTasks = [];

// check if there are tasks in the local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//Trigger of getDataFromLocalStorage function
getDataFromLocalStorage();
//Add task

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

//click on task element

tasksDiv.addEventListener("click", (e) => {
  //Remove Element from page
  if (e.target.classList.contains("del")) {
    //Remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    //Remove Element from page
    e.target.parentElement.remove();
  }
  //task element
  if (e.target.classList.contains("task")) {
    //toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    //toggle done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  addElementsToPagFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPagFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    //Check if task is done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id); //custom attribute
    div.appendChild(document.createTextNode(task.title));
    //Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    //Append Button To Main Div
    div.appendChild(span);
    //Add task div to tasks container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPagFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
