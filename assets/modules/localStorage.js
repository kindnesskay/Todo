import { Template } from "../main.js";

export function getFromLocalStorage(name) {
  if (localStorage.getItem(name)) {
    let data = localStorage.getItem(name);
    return JSON.parse(data);
  }
}

export function SaveToLocalStorage(newTask = {}) {
  //   save
  try {
    localStorage.setItem("todo", JSON.stringify(newTask));
  } catch (error) {
    console.error(error);
  }
  return newTask;
}

export function updateAdd(content = {}) {
  let oldStorage = getFromLocalStorage("todo");
  for (let [key, value] of Object.entries(content)) {
    oldStorage[key] = sort(value, oldStorage[key]);
  }
  return oldStorage;
}

function sort(content = ["hi"], oldContent = ["hello"]) {
  let newContent;
  switch (typeof content) {
    case "object":
      newContent = [...oldContent, ...content];
      return newContent;
      break;
    case "string":
      newContent = content;
      return newContent;
    case "number":
      newContent = content;
      return newContent;
    default:
      return typeof content;
      break;
  }
}



