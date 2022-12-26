let addButton = document.querySelector("#add");
let taskList = document.querySelector(".items");
let field = document.querySelector("#todo");
let counter = document.getElementById("counter");
let con = 0;
let id, date, time;
function handle(){
  // let info=document.querySelector('#info')
  this.children.info.className== 'info hide_info'?
    this.children.info.className='info':
    this.children.info.className='info hide_info'

}

function createTask(content) {
  con++; //counter increase

  //added item
  let div = document.createElement("div");
  div.className = "dbox";
  div.id = content.id;

  // info
  let info = document.createElement("div");
  info.innerHTML = content.time;
  info.className = "info hide_info";
  info.id = "info";
 
  //the text
  let item = document.createElement("div");
  item.className = "item";
  item.addEventListener("click", handle);
  let p = document.createElement("p");
  let itemText = document.createTextNode(content.value);
  p.appendChild(itemText);
  item.appendChild(p);
  item.appendChild(info);

  //add delete button to each element
  let deleteButton = document.createElement("img");
  deleteButton.src = "./assets/trash.svg";
  deleteButton.className = "del";

  //display all elements
  div.appendChild(item);
  div.appendChild(deleteButton);
  taskList.appendChild(div);

  counter.innerHTML = con;
  deleteButton.addEventListener("click", removeTask);

  if (!field.value) {
    return;
  }
  storeTask(content.value);
  field.value = "";
}

addButton.addEventListener("click", () => {
  if (!field.value) {
    return;
  }
  id = `${Math.random() * 100}${field.value}`;
  date = new Date().toDateString();
  time = new Date().toLocaleTimeString();
  createTask({
    value: field.value,
    id: id,
    time: time,
  });
});

//delete
function removeTask() {
  let todoString = localStorage.getItem("todo");

  if (todoString) {
    let todo = JSON.parse(todoString);

    if (todo && Array.isArray(todo)) {
      let presentTask = todo.filter((element) => {
        console.log(element.id, this.parentNode.id);
        return element.id && element.id !== this.parentNode.id;
      });

      localStorage.setItem("todo", JSON.stringify(presentTask));
    }
  }

  // reduce counter by one
  this.parentNode.classList.add("dele");
  let clear = () => {
    this.parentNode.remove();
  };
  const myTimeout = setTimeout(clear, 280);
  con--;
  counter.innerHTML = con;
}

function storeTask(newTask) {
  let taskList = [];
  if (localStorage.getItem("todo")) {
    //the old item
    const oldStorage = JSON.parse(localStorage.getItem("todo"));
    oldStorage.map((oldObject) => {
      taskList.push(oldObject);
    });
  }

  // new item
  taskList.push({
    value: newTask,
    date: date,
    time: time,
    id: id,
  });

  localStorage.setItem("todo", JSON.stringify(taskList));
}
// local
JSON.parse(localStorage.getItem("todo")).map((todo) => {
  createTask(todo);
});


// Add new task when the enter key is pressed
field.addEventListener('keydown', function(event) {
  if (event.code === 'Enter') {
    if (!field.value) {
      return;
    }
    id = `${Math.random() * 100}${field.value}`;
    date = new Date().toDateString();
    time = new Date().toLocaleTimeString();
    createTask({
      value: field.value,
      id: id,
      time: time,
    })

  }
});
