const add = document.getElementById("addToDo");
const input = document.getElementById("inputField");
const toDoContainer = document.getElementById("toDoContainer");

add.addEventListener("click", addItem);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addItem();
});

document.addEventListener("DOMContentLoaded", loadItems);

function saveToLocalStorage() {
  const items = [...document.querySelectorAll(".item .text")].map(item => item.value);
  localStorage.setItem("toDoItems", JSON.stringify(items));
}

function createToDoItem(itemValue) {
  const item = document.createElement("div");
  item.classList.add("item");

  const itemContent = document.createElement("div");
  itemContent.classList.add("content");

  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  itemContent.appendChild(checkbox);

  const inputItem = document.createElement("input");
  inputItem.classList.add("text");
  inputItem.type = "text";
  inputItem.value = itemValue || "";
  inputItem.setAttribute("readonly", "readonly");
  itemContent.appendChild(inputItem);

  
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      inputItem.style.textDecoration = "line-through";
    } else {
      inputItem.style.textDecoration = "none";
    }
  });


  const item_action = document.createElement("div");
  item_action.classList.add("actions");

  const editItem = document.createElement("button");
  editItem.classList.add("edit", "btn", "btn-primary");
  editItem.type = "button";
  editItem.innerText = "Edit";

  const deleteItem = document.createElement("button");
  deleteItem.classList.add("delete", "btn", "btn-danger", "fa", "fa-trash");

  item_action.appendChild(editItem);
  item_action.appendChild(deleteItem);

  item.appendChild(itemContent);
  item.appendChild(item_action);

  toDoContainer.appendChild(item);

  editItem.addEventListener("click", toggleEdit);


  //   // inputItem.addEventListener("keypress", (e) => {
  //   //   if (e.key === "Enter") toggleEdit();
  //   //   saveToLocalStorage();
  //   // });
  // });




  deleteItem.addEventListener("click", () => {
    toDoContainer.removeChild(item);
    saveToLocalStorage();
  });
}


function toggleEdit() {
  const editItem = this;
  const inputItem = editItem.closest(".item").querySelector(".text");

  if (editItem.innerText.toLowerCase() === "edit") {
    editItem.innerText = "Save";
    inputItem.removeAttribute("readonly");
    inputItem.focus();

    // Add event listener for "Enter" key press
    inputItem.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        inputItem.setAttribute("readonly", "readonly");
        editItem.innerText = "Edit";
        saveToLocalStorage();
      }
    });
  } else {
    editItem.innerText = "Edit";
    inputItem.setAttribute("readonly", "readonly");
    saveToLocalStorage();
  }
}



function loadItems() {
  const savedItems = JSON.parse(localStorage.getItem("toDoItems")) || [];
  savedItems.forEach(createToDoItem);
}

function addItem() {
  const itemValue = input.value.trim();
  if (itemValue) {
    createToDoItem(itemValue);
    input.value = "";
    saveToLocalStorage();
  } else {
    alert("Please enter text to add an item.");
  }
}
