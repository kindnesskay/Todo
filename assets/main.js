import { getFromLocalStorage, updateAdd } from "./modules/localStorage.js";
import { SaveToLocalStorage } from "./modules/localStorage.js";
import { TextField } from "./modules/textField.js";

const storage = getFromLocalStorage("todo");
let taskList = document.querySelector(".items");
let counter = document.getElementById("counter");
const add_new_form = document.querySelector("#add_new");
const plus_sign = document.querySelector("#plus_sign");
// /
function handle() {
  this.children.task_info.classList.toggle("task_info");
  this.children.task_info.classList.toggle("hide");
}

function updatecounter(array = []) {
  let storage = getFromLocalStorage("todo");
  array = storage ? storage.data : array;
  return Number(array.length);
}

function createTask(content) {
  //added item
  let div = document.createElement("div");
  div.className = "task_element";
  // task info
  let date_created = new Date(content.date);
  date_created = date_created.toLocaleTimeString("en-US");
  let task_info = document.createElement("div");
  task_info.innerHTML = date_created;
  task_info.className = "hide";
  task_info.id = "task_info";
  //task text
  let task_element_text = document.createElement("div");
  task_element_text.className = "task_element_text";
  task_element_text.addEventListener("click", handle);
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
  // deleteButton.addEventListener("click", removeTask);
}

// template for the local storage
export function Template(text = "demo", count = 1) {
  return {
    totalItems: Number(count),
    data: [
      {
        text: String(text),
        id: Number(count),
        date: new Date(),
      },
    ],
  };
}

//delete task from storage and remove from screen
function removeTask() {
  let id = this.id;
  let items = storage.data;
  let result = items.filter((item) => {
    return item.id != id;
  });
  storage.data = result;
  storage.totalItems -= 1;
  if (!storage.totalItems) {
    storage.totalItems = 0;
  }
  SaveToLocalStorage(storage);
  // reduce counter by one
  this.parentNode.classList.add("dele");
  let clear = () => {
    this.parentNode.remove();
  };
  const myTimeout = setTimeout(clear, 280);
  counter.innerText = updatecounter();
}

// local
function add(text) {
  if (!text) {
    return false;
  }
  let count = updatecounter() ? updatecounter() + 1 : 1;
  let content = Template(text, count);
  if (getFromLocalStorage("todo")) {
    SaveToLocalStorage(updateAdd(content));
  } else {
    SaveToLocalStorage(content);
  }
  counter.innerText = count;
  return createTask(content.data[0]);
}



function toggle(element, parent = "") {
  let element_id = element.id;
  if (document.getElementById(element_id)) {
    document.getElementById(element_id).remove();
    return false;
  }
  return parent.appendChild(element);
}

// end of functions

if (storage) {
  storage.data.map((task) => {
    createTask(task);
    counter.innerText=updatecounter()
  });

}
// text field
let text_field = new TextField();
text_field.setCallback(() => {
  let text = text_field.fieldValue();
  add(text);
});
plus_sign.addEventListener("click", () => {
  toggle(text_field.createForm(), add_new_form);
});
