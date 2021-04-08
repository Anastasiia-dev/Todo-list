const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".btn-add");
const todoItems = document.querySelector(".todoItems");
const deleteAllBtn = document.querySelector(".btn-del-all");

/** 1. Initialization
  *   - read from localStorage
  *   - apply the items list state
  *   - attach the event listeners on the buttons
 *
 *   2. Create Button class and move the functionality of adding and removing the classes here
 *
 *   3. Implement event delegation and catch the delete event. Do not assign the event to the button itself.
 *
 *   4. Create HtmlGenerator class, which will be responsible to create html
 *   */

// const Storage = {
//   add(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
//   },
//
//   retrieve(key) {
//    localStorage.getItem(ke);
//   }
// };

const buttonState = {
  idle: 'idle',
  active: 'active',
};

const key = 'New Todo';

// TODO: use addEventListener
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; // TODO: use const instead of let
    // TODO: move the if condition to a function isValueEmpty()
    if(userEnteredValue.trim() != 0){  // TODO: use ===
      // addButton.setActive();
      addBtn.classList.add(buttonState.active);
    }else{
      // addButton.setIdle();
      addBtn.classList.remove("active"); // TODO: use the buttonState enum
    }
  }


  // TODO: use addEventListener
  addBtn.onclick = () => {
    let userEnteredValue = inputBox.value; // TODO: use const
    let getLocalStorageData = localStorage.getItem("New Todo"); // TODO: use localStorage key value
    // const isTodoListEmpty = getLocalStorageData === null || JSON.parse(getLocalStorageData).length === 0;

    let listArray;
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

  // TODO: split the function to many micro functions. This way we achieve Single Responsibility
  function showTasks() {

      // TODO: instead of local storage use the wrapper Storage
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
      // TODO: move the html creation to a separate class
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
}
               
