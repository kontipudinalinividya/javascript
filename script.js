let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function displayTasks(filter="all"){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

if(filter==="active" && task.completed) return;
if(filter==="completed" && !task.completed) return;

const li=document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`
<span>${task.text}</span>

<div>

<button onclick="toggleTask(${index})">Done</button>

<button onclick="editTask(${index})">Edit</button>

<button onclick="deleteTask(${index})">Delete</button>

</div>
`;

taskList.appendChild(li);

});

}

addBtn.addEventListener("click",()=>{

if(taskInput.value==="") return;

tasks.push({
text:taskInput.value,
completed:false
});

saveTasks();
displayTasks();

taskInput.value="";

});

function toggleTask(index){

tasks[index].completed=!tasks[index].completed;

saveTasks();
displayTasks();

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
displayTasks();

}

function editTask(index){

let newTask=prompt("Edit Task",tasks[index].text);

if(newTask){
tasks[index].text=newTask;
saveTasks();
displayTasks();
}

}

document.querySelectorAll(".filters button").forEach(btn=>{

btn.addEventListener("click",()=>{

displayTasks(btn.dataset.filter);

});

});

displayTasks();
