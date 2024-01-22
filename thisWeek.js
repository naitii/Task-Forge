import {addNewTask} from './addTasks.js';

const mainBody = document.querySelector('.mainTask');
var week = document.getElementById('week');

week.addEventListener('click', function(){
    thisWeek();
});

function thisWeek(){

    var str = localStorage.getItem("myTaskList");
    var alltasks = JSON.parse(str);
    console.log(alltasks);

    if(alltasks)
    {
        for(var i=0;i<alltasks.length;i++)
        {
            if(isInCurrentWeek(alltasks[i].deadline))
                mainBody.appendChild(addNewTask(alltasks[i]));
            // taskId = Math.max(taskId, alltasks[i].taskID);
        }
    }
}

function isInCurrentWeek(dateString) {
    if(dateString!=='')
    {
        const givenDate = new Date(dateString);
        
        const currentDate = new Date();

        const currentWeekStart = new Date(currentDate);
        currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());
        
        
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
        
        return givenDate >= currentWeekStart && givenDate <= currentWeekEnd;
    }
}