import { Task } from "./modules/localStorage.js";
import { TextField } from "./modules/textField.js";
let taskList = document.querySelector(".items");
let counter = document.getElementById("counter");
const add_new_form = document.querySelector("#add_new");
const plus_sign = document.querySelector("#plus_sign");
// controlls task add and delete
let task = new Task("todo");
task.update();
/*

support for storage method migrating all items stored
*/
// error text
let error = document.getElementById("err");
error.remove();
function handle() {
  this.children.task_info.classList.toggle("task_info");
  this.children.task_info.classList.toggle("hide");
}
// update the number of tasks stored
function updatecounter() {
  counter.innerHTML = task.items.length;
}
// cretate the task element
function createTask(content) {
  //added item
  let div = document.createElement("div");
  div.className = "task_element";
  // task info
  let date_created = new Date(content.date);
  date_created = date_created.toLocaleTimeString("en-US");
  let task_info = document.createElement("div");
  task_info.innerHTML = date_created;
  task_info.className = "task_info";
  task_info.id = "task_info";
  //task text
  let task_element_text = document.createElement("div");
  task_element_text.className = "task_element_text";
  // task_element_text.addEventListener("click", handle);
  let p = document.createElement("p");
  let task_element_textText = document.createTextNode(content.text);
  p.appendChild(task_element_textText);
  task_element_text.appendChild(p);
  task_element_text.appendChild(task_info);

  //add delete button to each element
  let deleteButton = document.createElement("img");
  deleteButton.src = "./assets/trash.svg";
  deleteButton.className = "del";
  deleteButton.id = content.id;
  deleteButton.addEventListener("click", removeTask);
  //display all elements
  div.appendChild(task_element_text);
  div.appendChild(deleteButton);
  taskList.appendChild(div);
}
//delete task from storage and remove from screen
function removeTask() {
  let id = this.id;
  task.update();
  task.remove(id);
  // reduce counter by one
  this.parentNode.classList.add("dele");
  let clear = () => {
    this.parentNode.remove();
  };
  const myTimeout = setTimeout(clear, 200);
  updatecounter();
}

// local
function add(text) {
  if (!text) {
    return false;
  }
  try {
    task.create(text);
    createTask(task.item);
    updatecounter();
    return true;
  } catch (error) {
    console.error(error);
  }
}

// add and remove element the dom
function toggle(element, parent = "") {
  let element_id = element.id;
  if (document.getElementById(element_id)) {
    document.getElementById(element_id).remove();
    return false;
  }
  return parent.appendChild(element);
}
// end of functions all code below ru on app load

try {
  task.items.map((task) => {
    createTask(task);
  });
  updatecounter();
} catch (error) {
  console.error(error);
}
// text field
let text_field = new TextField();
text_field.setCallback(() => {
  let text = text_field.fieldValue();
  add(text);
});
// show input field
plus_sign.addEventListener("click", () => {
  toggle(text_field.createForm(), add_new_form);
  if (document.getElementById(text_field.id)) {
    plus_sign.innerHTML = "-";
    text_field.text_field.focus();
    return null;
  }
  plus_sign.innerHTML = "+";
});
