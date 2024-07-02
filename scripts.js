function loadTodos(){
    // this is the function to load the todos in locsl storage
    const todos=JSON.parse(localStorage.getItem("todos"))||{"todoList":[]}; 

    return todos;
}
function refreshTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addNewTodo(){
    const todoText=todoinput.value;
    if(todoText==''){
        alert("plz enter the todoitems");}
     else{
       const  todos=loadTodos();
        const id = todos.todoList.length; 
        addTodoToLocalStorage({text:todoText,isCompleted:false,id});
        appendTodoInHtml({text:todoText,isCompleted:false,id});
        todoinput.value='';
     }
}







function addTodoToLocalStorage( todo){
   
    const todos=loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify( todos));
}


function executeFilterAction(event){
    const todoList=document.getElementById("todoList");
const element=event.target;
const value=element.getAttribute('data-filter');
todoList.innerHTML='';
const todos=loadTodos();
if(value ==='ALL'){

todos.todoList.forEach( todo=> { 
    appendTodoInHtml(todo);
});
}
else if(value ==='Pending'){
    todos.todoList.forEach( todo=> { 
        if(todo.isCompleted !== true)
        appendTodoInHtml(todo);})}
        else{
            todos.todoList.forEach( todo=> { 
                
            if(todo.isCompleted === true)
                appendTodoInHtml(todo);
            });
        }
    }


function appendTodoInHtml(todo){
const todoList=document.getElementById("todoList")
const todoItem=document.createElement("li");

todoItem.setAttribute("Data-id",todo.id);
const textDiv=document.createElement("div");

if(todo.isCompleted){
    textDiv.classList.add("completed");
}
textDiv.textContent= todo.text;
todoItem.classList.add("todoItem");//making class at the time of making ielement of html.


const wrapper=document.createElement("div");
wrapper.classList.add("todoButtons");

const editbtn = document.createElement("button");
editbtn.textContent ="Edit";
editbtn.classList.add("editbtn");
editbtn.addEventListener("click", editTodo);

const deletebtn= document.createElement("button");
deletebtn.textContent="Deleted";
deletebtn.classList.add("deletebtn");
deletebtn.addEventListener("click",deleteTodo);

const completedbtn=document.createElement("button");
completedbtn.textContent = todo.isCompleted?"Reset":"Completed";
completedbtn.classList.add("completedbtn");
completedbtn.addEventListener("click",toggleTodo);

wrapper.appendChild(editbtn);
wrapper.appendChild(deletebtn);
wrapper.appendChild(completedbtn);

todoItem.appendChild(textDiv);
todoItem.appendChild(wrapper);

todoList.appendChild(todoItem);
}


function resetHtmlTodos(todos){
    const todoList=document.getElementById("todoList");
todoList.innerHTML='';
todos.todoList.forEach(todo =>{
    appendTodoInHtml(todo);
});
}

function toggleTodo(event){
    console.log('toggling');
   
    const todoItem = event.target.parentElement.parentElement;
  
 const todos=loadTodos();
 const todoId=todoItem.getAttribute('data-id');
todos.todoList.forEach(todo =>{
   
    if(todo.id == todoId){
    console.log(todoId);
        todo.isCompleted =! (todo.isCompleted);
        
    }
});

refreshTodos(todos);
resetHtmlTodos(todos);
}

 function editTodo(event){
    const todoItem = event.target.parentElement.parentElement;
  
    let todos=loadTodos();
    const todoId=todoItem.getAttribute('data-id');
    const response =prompt("what is the new todo value you want to set ? ");
    todos.todoList.forEach(todo =>{
   if(todo.id == todoId){
     
            todo.text =response;
 }
});
refreshTodos(todos);
resetHtmlTodos(todos);
}






function deleteTodo(event){
    const todoItem = event.target.parentElement.parentElement;
  
    let todos=loadTodos();
    const todoId=todoItem.getAttribute('data-id');
   todos.todoList=todos.todoList.filter(todo => todo.id!= todoId);
   refreshTodos(todos);
   resetHtmlTodos(todos);
       }





document.addEventListener("DOMContentLoaded",(event)=>{
const todoinput=document.getElementById("todoinput");//this will give the id on which we can ind the valyue,textand etc.
const submitbutton=document.getElementById("addtodo");
  
let todos= loadTodos();

const todoList=document.getElementById("todoList");
  
const filterBtns = document.getElementsByClassName("filterbtn");
for(const btn of filterBtns){
    btn.addEventListener("click",executeFilterAction)
}




submitbutton.addEventListener("click",addNewTodo);

todoinput.addEventListener("change",()=>{
//this call back method is fired everytime there is achange in the input tag.
const todoText=event.target.value;//content inside the id.

event.target.value=todoText.trim();


});

 todos.todoList.forEach( todo=> { 
   appendTodoInHtml(todo);
 });
 //const completedbtns =document.getElementsByClassName("completedbtn");
 //for (const btn of completedbtns){
   // btn.addEventListener("click", toggleTodo);
//}  

document.addEventListener('keypress',(event)=>{
    if(event.code === 'Enter'){
    addNewTodo();}
})
});