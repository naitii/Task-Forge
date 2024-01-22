import {addNewTask} from './addTasks.js';


const mainBody = document.querySelector('.mainTask');
var allT = document.getElementById('alltasks');

allT.addEventListener('click', function(){
    ALLTASKS();
});

function ALLTASKS(){

    var str = localStorage.getItem("myTaskList");
    var alltasks = JSON.parse(str);
    console.log(alltasks);

    if(alltasks)
    {
        for(var i=0;i<alltasks.length;i++)
        {
            mainBody.appendChild(addNewTask(alltasks[i]));
            // taskId = Math.max(taskId, alltasks[i].taskID);
        }
    }
}
ALLTASKS();


