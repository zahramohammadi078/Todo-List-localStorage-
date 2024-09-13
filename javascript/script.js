const inputBox = document.querySelector(".input-box");
const addBtn = document.querySelector(".add-btn");
const card = document.querySelector(".card");
const container = document.querySelector(".container");
const allBtn = document.querySelector(".all-btn");
const completeBtn = document.querySelector(".complete-btn");
const activeBtn = document.querySelector(".active-btn");
let downloadBtn=document.querySelector(".download-btn")
let todoArray = [];

addBtn.addEventListener("click", addBtnFunc);
inputBox.addEventListener("keydown", enterFunc);

/*--------------------------create btn and items----------------------------------*/
function createTodoItem(todoObj) {
  let newDivOne = document.createElement("div");
  newDivOne.classList.add("todo-items");
  let newP = document.createElement("p");
  newP.classList.add("todotext");
  newP.textContent = todoObj.title;

  let newDivTwo = document.createElement("div");
  newDivTwo.classList.add("allbtns");
  //btnOne
  let btnOne = document.createElement("button");
  btnOne.classList.add("btn");
  btnOne.classList.add("Complate");
  btnOne.textContent = todoObj.complete ? "incomplete" : "Complete";

  if (todoObj.complete) {
    newP.style.textDecoration = "line-through";
    newDivOne.style.opacity = "0.5";
  }

  btnOne.addEventListener("click", function () {
    if (todoObj.complete) {
      newP.style.textDecoration = "none";
      btnOne.textContent = "Complete";
      newDivOne.style.opacity = "1";
      todoObj.complete = false;
    } else {
      newP.style.textDecoration = "line-through";
      btnOne.textContent = "incomplete";
      newDivOne.style.opacity = "0.5";
      todoObj.complete = true;
    }
    
    updateTodoInFirebase(todoObj); 
    console.log(todoArray);
    setLocalStorage(todoArray);
  });

  //btnTwo
  let btnTwo = document.createElement("button");
  btnTwo.classList.add("btn");
  btnTwo.classList.add("b1");
  btnTwo.classList.add("Delete");
  btnTwo.textContent = "Delete";

  btnTwo.addEventListener("click", function () {
    newDivOne.remove();
    todoArray = todoArray.filter(function (todo) {
      return todo.id !== todoObj.id;
    });

    
    deleteTodoFromFirebase(todoObj)
    console.log(todoArray);
    setLocalStorage(todoArray);
  });

  //btnThree
  let btnThree = document.createElement("button");
  btnThree.classList.add("btn");
  btnThree.classList.add("b1");
  btnThree.classList.add("Edite");
  btnThree.textContent = "Edit";

  btnThree.addEventListener("click", function () {
    let editText = prompt("Edit the item:", newP.textContent);
    if (editText !== null) {
      newP.textContent = editText;
      todoObj.title = editText;
     
    }
    updateTodoInFirebase(todoObj); 
    console.log(todoArray);
    setLocalStorage(todoArray);
  });
  newDivTwo.append(btnOne, btnTwo, btnThree);

  newDivOne.append(newP, newDivTwo);

  container.append(newDivOne);
}
/*--------------------------enterBtn and keydown-------------------------------*/
function enterFunc(event) {
  if (event.keyCode === 13) {
    addBtnFunc();
  }
}
/*------------------------click add btn--------------------------------*/

function addBtnFunc() {
  if (inputBox.value) {
    let todoValue = inputBox.value.trim();
    let todoObj = {
      id:  Date.now(),
      title: todoValue,
      complete: false,
    };
    todoArray.push(todoObj);
    setLocalStorage(todoArray);
    console.log(todoObj);
    createTodoItem(todoObj);
    updateTodoInFirebase(todoObj);
    inputBox.value = "";
  } else {
    // alert("it is empty");
    Swal.fire({
      title: "Please enter your desired item.",
      width: 500,
      padding: "3em",
      color: "#18335c",
      backdrop: `
        rgba(0,0,123,0.4)
        left top
        no-repeat
      `,
    });
  }
  console.log(todoArray);
}

function setLocalStorage(todoList) {
  localStorage.setItem('todos', JSON.stringify(todoList));
}
/*-------------------------------all - active- complete-----------------------*/

let btnUp = document.querySelector(".buttons");
btnUp.addEventListener("click", btnUpFunc);

function btnUpFunc(event) {
  let todoItems = document.querySelectorAll(".todo-items");

  if (event.target.classList.contains("all-btn")) {
    todoItems.forEach((item) => (item.style.display = "flex"));
    setBackgroundColor(allBtn, "#05224d", "cornsilk", "#05224d");
    setBackgroundColor(completeBtn, "", "", "");
    setBackgroundColor(activeBtn, "", "", "");
  } else if (event.target.classList.contains("complete-btn")) {
    todoItems.forEach((item) => {
      if (item.querySelector(".Complate").textContent === "incomplete") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
    setBackgroundColor(completeBtn, "#05224d", "cornsilk", "#05224d");
    setBackgroundColor(allBtn, "", "", "");
    setBackgroundColor(activeBtn, "", "", "");
  } else if (event.target.classList.contains("active-btn")) {
    todoItems.forEach((item) => {
      if (item.querySelector(".Complate").textContent != "incomplete") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
    setBackgroundColor(activeBtn, "#05224d", "cornsilk", "#05224d");
    setBackgroundColor(allBtn, "", "", "");
    setBackgroundColor(completeBtn, "", "", "");
  }
}

function setBackgroundColor(btn, bgColor, bgtextcolor, bgborder) {
  btn.style.backgroundColor = bgColor;
  btn.style.color = bgtextcolor;
  btn.style.border = bgborder;
}




