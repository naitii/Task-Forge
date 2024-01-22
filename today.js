import {addNewTask} from './addTasks.js';
import { taskId } from "./addTasks.js";

const mainBody = document.querySelector('.mainTask');
var tod = document.getElementById('today');

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
let day = currentDate.getDate().toString().padStart(2, '0');

let today = `${year}-${month}-${day}`;
console.log(today);
tod.addEventListener('click', function(){
    mainBody.innerHTML = '';
    todayTASKS();
});

function todayTASKS(){

    var str = localStorage.getItem("myTaskList");
    var alltasks = JSON.parse(str);


    if(alltasks)
    {
        for(var i=0;i<alltasks.length;i++)
        {
            if(alltasks[i].deadline===today)
                mainBody.appendChild(addNewTask(alltasks[i]));
        }
    }
}
// todayTASKS();

