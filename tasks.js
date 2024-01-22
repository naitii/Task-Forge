let defaultTaskList=[];
let taskList = localStorage.getItem("myTaskList");

taskList = JSON.parse(taskList || JSON.stringify(defaultTaskList));


export function addNewTaskToLocal(task){   
    taskList.push(task);
    saveTaskInLocal();
}

function saveTaskInLocal(){
    localStorage.setItem("myTaskList", JSON.stringify(taskList));
}

export function removeTaskfromLocal(ID) {
    
    var storedTasks = localStorage.getItem("myTaskList");
    if (storedTasks) {
        var parsedData = JSON.parse(storedTasks);

        parsedData = parsedData.filter(function (item) {
            return item.taskID !== ID;
        });

        localStorage.setItem("myTaskList", JSON.stringify(parsedData));
    }
}

export function removeProjectChild(ID)
{
    var tasks = localStorage.getItem("myTaskList");
    if(tasks)
    {
        var parsedData2 = JSON.parse(tasks);

        parsedData2 = parsedData2.filter(function(item) {
            return item.ProjectID !== ID;
        });

        localStorage.setItem("myTaskList", JSON.stringify(parsedData2));
    }
}