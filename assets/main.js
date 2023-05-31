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
  this.children.info.classList.toggle("info");
  this.children.info.classList.toggle("hide");
}

function updatecounter(array = []) {
  let storage = getFromLocalStorage("todo");
  array = storage ? storage.data : array;
  return Number(array.length);
}

function createTask(content) {
  //added item
  let div = document.createElement("div");
  div.className = "dbox";
  // info
  let time = new Date(content.date);
  time = time.toLocaleTimeString("en-US");
  let info = document.createElement("div");
  info.innerHTML = time;
  info.className = "hide";
  info.id = "info";
  //the text
  let item = document.createElement("div");
  item.className = "item";
  item.addEventListener("click", handle);
  let p = document.createElement("p");
  let itemText = document.createTextNode(content.text);
  p.appendChild(itemText);
  item.appendChild(p);
  item.appendChild(info);

  //add delete button to each element
  let deleteButton = document.createElement("img");
  deleteButton.src = "./assets/trash.svg";
  deleteButton.className = "del";
  deleteButton.id = content.id;
  deleteButton.addEventListener("click", removeTask);
  //display all elements
  div.appendChild(item);
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
