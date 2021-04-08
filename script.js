const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".btn-add");
const todoItems = document.querySelector(".todoItems");
const deleteAllBtn = document.querySelector(".btn-del-all");

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
}
               
