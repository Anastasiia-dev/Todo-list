// Selectors

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".btn-add");
const todoItems = document.querySelector(".todoItems");
const deleteAllBtn = document.querySelector(".btn-del-all");

const key = "New Todo";


const TagsNames = {
    div: "div",
    li: "li",
    button: "button",
    i: '<i class="fas fa-trash"></i>'
};

const ClassListNames = {
    newDivTag: "newDivTag",
    newLiTag: "newLiTag",
    deleteBtn: "btn-delete"
};

const BtnState = {
    active: "active",
}

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
inputBox.addEventListener('click', isInputEmpty);
addBtn.addEventListener('click', showTask);
todoItems.addEventListener('click', deleteTask);
deleteAllBtn.addEventListener('click', deleteAllTasks)


// Functions

function showTask(){
    const inputValue = inputBox.value;
    createNewTags(inputValue);
    updateTaskNum();
    saveToLocalStorage(inputValue);
    inputBox.value = "";
}

function isInputEmpty(){
    const inputText = inputBox.value;
    if(inputText.length === 0){
        addBtn.classList.remove(BtnState.active);
    }else{
        addBtn.classList.add(BtnState.active);
    }
};

function createNewTags(input){
    
    const newDivTag = document.createElement(TagsNames.div);
    newDivTag.classList.add(ClassListNames.newDivTag);

    const newLiTag = document.createElement(TagsNames.li);
    newLiTag.innerText = input;
    newLiTag.classList.add(ClassListNames.newLiTag);
    newDivTag.appendChild(newLiTag);

    const deleteBtn = document.createElement(TagsNames.button);
    deleteBtn.innerHTML = TagsNames.i;
    deleteBtn.classList.add(ClassListNames.deleteBtn);
    newDivTag.appendChild(deleteBtn);
    
    todoItems.appendChild(newDivTag);
}



function deleteTask(e){
    const item = e.target;
    if (item.classList[0] === ClassListNames.deleteBtn) {
        const todoElement = item.parentElement;
        removeLocalTodos(todoElement);
        todoElement.remove();
    }
    updateTaskNum();
};


function saveToLocalStorage(todoElement){
    let listArray;
    if(localStorage.getItem(key) === null) {
        listArray = [];
    }else {
        listArray = JSON.parse(localStorage.getItem(key));
    }
    listArray.push(todoElement);
    localStorage.setItem(key, JSON.stringify(listArray)); 
};

function isTaskInStorage(){
    let listArray;
    if(localStorage.getItem(key) === null) {
        listArray = [];
    }else {
        listArray = JSON.parse(localStorage.getItem(key));
    }
}

function getTodos(){
    let listArray;
    if (localStorage.getItem(key) === null) {
      listArray = [];
    } else {
      listArray = JSON.parse(localStorage.getItem(key));
    }
    
    listArray.forEach((todoElement) => {
            createNewTags(todoElement);
        });
};

function removeLocalTodos(todoElement){
    let listArray;
    if(localStorage.getItem(key) === null) {
        listArray = [];
    }else {
        listArray = JSON.parse(localStorage.getItem(key));
    }
    const todoIndex = todoElement.children[0].innerText;
    listArray.splice(listArray.indexOf(todoIndex), 1);
    localStorage.setItem(key, JSON.stringify(listArray));
}


function updateTaskNum(){
    let listArray;
    if(localStorage.getItem(key) === null) {
        listArray = [];
    }else {
        listArray = JSON.parse(localStorage.getItem(key));
    }
    const pendingTaskNum = document.querySelector(".taskNumber");
    pendingTaskNum.textContent = listArray.length;
}


function deleteAllTasks(){
    let listArray = [];
    localStorage.setItem(key, JSON.stringify(listArray)); 
    todoItems.remove();
    updateTaskNum();
};





/*
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; 
    if(userEnteredValue.trim() != 0){ 
      addBtn.classList.add("active"); 
    }else{
      addBtn.classList.remove("active"); 
    }
  }


  addBtn.onclick = () => { 
    let userEnteredValue = inputBox.value; 
    let getLocalStorageData = localStorage.getItem("New Todo"); 
    if(getLocalStorageData == null){ 
      listArray = []; 
    }else{
      listArray = JSON.parse(getLocalStorageData);  
    }
    listArray.push(userEnteredValue); 
    localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
    addBtn.classList.remove("active");
  }
  
  function showTasks() {

      let getLocalStorageData = localStorage.getItem("New Todo");
      if(getLocalStorageData == null){
          listArray = [];
        }else{
           listArray = JSON.parse(getLocalStorageData)
          };
    const pendingTasksNumb = document.querySelector(".taskNumber");
    pendingTasksNumb.textContent = listArray.length; 

        if(listArray.length > 0){ 
              deleteAllBtn.classList.add("active"); 
        }else{
          deleteAllBtn.classList.remove("active"); 
        }
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += 
          `<li>${element} 
            <div class="btn">
               <button class="btn-delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            </div>
           </li>`;
    });
    todoItems.innerHTML = newLiTag; 
    inputBox.value = ""; 
}      


function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


deleteAllBtn.onclick = () =>{
  listArray = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}*/


               
