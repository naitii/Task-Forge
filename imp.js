import {addNewTask} from './addTasks.js';

const mainBody = document.querySelector('.mainTask');
var imp = document.getElementById('imp');

imp.addEventListener('click', function(){
    impTASKS();
});

function impTASKS(){

    var str = localStorage.getItem("myTaskList");
    var alltasks = JSON.parse(str);
    console.log(alltasks);

    if(alltasks)
    {
        for(var i=0;i<alltasks.length;i++)
        {
            if(alltasks[i].importance)
                mainBody.appendChild(addNewTask(alltasks[i]));
            // taskId = Math.max(taskId, alltasks[i].taskID);
        }
    }
}



