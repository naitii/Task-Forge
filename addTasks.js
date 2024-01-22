import { addTrash, projectID } from './addProject.js';
import { addNewTaskToLocal } from './tasks.js';
import { removeTaskfromLocal } from './tasks.js';
import { projectList } from './projects.js';

const mainBody = document.querySelector('.mainTask');
var taskId = 0;
export {taskId};

const createTask = (Name, taskID, ProjectID, importance, deadline, completed) => {
    return{
        Name,
        taskID,
        ProjectID,
        importance,
        deadline,
        completed
    };
}


export function addTaskFunctionality(){

    const validNavs = document.querySelectorAll('.project-sublist');

    validNavs.forEach(function(nav)
    {
        if(nav.classList.contains('selectedNav'))
        {

            const addTask = document.createElement('div');
            addTask.classList.add('addTask');
            const Addspan = document.createElement('span');
            Addspan.innerText='Add Task';


            addTask.appendChild(addPlus());
            addTask.appendChild(Addspan);
            mainBody.append(addTask);


            addTask.addEventListener('click',function(){
                mainBody.removeChild(mainBody.lastChild);
                generateTaskForm(parseInt(nav.id));
            })
            
        }
    })
}

function addPlus(){
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256"><g fill="#f8f8f8" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.12,5.12)"><path d="M25,2c-12.6907,0 -23,10.3093 -23,23c0,12.69071 10.3093,23 23,23c12.69071,0 23,-10.30929 23,-23c0,-12.6907 -10.30929,-23 -23,-23zM25,4c11.60982,0 21,9.39018 21,21c0,11.60982 -9.39018,21 -21,21c-11.60982,0 -21,-9.39018 -21,-21c0,-11.60982 9.39018,-21 21,-21zM24,13v11h-11v2h11v11h2v-11h11v-2h-11v-11z"></path></g></g></svg>';       
    var container = document.createElement('div');
    container.innerHTML = svgString;
    return container.firstChild;  
}






//creating task form
function generateTaskForm(ID){

    const addTaskForm = document.createElement('form');
    addTaskForm.classList.add('addTaskForm');
    

    const title = document.createElement('span');
    title.innerText = `Title: `
    var taskName = document.createElement('input');
    taskName.style.width = "80%";
    taskName.classList.add('taskName');

    const DueDate = document.createElement('span');
    DueDate.innerText=`Due Date: `;
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.classList.add('dateInput');

    const priority = document.createElement('span');
    priority.innerText=`Priority: `;
    const impButton = document.createElement('button');
    impButton.innerText=`Not Important`;
    impButton.classList.add('notImportant')

    impButton.addEventListener('click',function(){
        event.preventDefault();
        if(impButton.innerText===`Not Important`)
        {   
            impButton.style.backgroundColor = 'green';
            impButton.innerText=`IMPORTANT`;
        }
        else{
            impButton.style.backgroundColor = 'rgb(214, 183, 6)';
            impButton.innerText=`Not Important`;
        }
    })

    const addTaskBtn = document.createElement('button');
    addTaskBtn.classList.add('addTaskBtn');
    addTaskBtn.innerText = `Add`;
    
    addTaskBtn.addEventListener('click', function(){
        event.preventDefault();
        if(taskName.value!='')
        {
            addTaskBtn.parentNode.parentNode.removeChild(addTaskBtn.parentNode);
            var highPriority = false;
            if(impButton.innerText===`IMPORTANT`)
                highPriority=true;

            taskId++;

            const newTask = createTask(taskName.value,taskId,ID,highPriority,dateInput.value,false);
            newTask.deadline = dateInput.value;
            console.log(ID);

            mainBody.appendChild(addNewTask(newTask));
            addNewTaskToLocal(newTask);
            addTaskFunctionality();
        }
    })
    

    
    const cancelTaskBtn = document.createElement('button');
    cancelTaskBtn.classList.add('cancelTaskBtn');
    cancelTaskBtn.innerText = `Cancel`;

    cancelTaskBtn.addEventListener('click', function(){
        event.preventDefault();
        mainBody.removeChild(mainBody.lastChild);
        addTaskFunctionality();
    })

    addTaskForm.appendChild(title);
    addTaskForm.appendChild(taskName);

    addTaskForm.appendChild(DueDate);
    addTaskForm.appendChild(dateInput);

    addTaskForm.appendChild(priority);
    addTaskForm.appendChild(impButton);

    addTaskForm.appendChild(addTaskBtn);
    addTaskForm.appendChild(cancelTaskBtn);

    mainBody.appendChild(addTaskForm);
    
}

export function addNewTask(TASK){

    const taskBox = document.createElement('div');
    taskBox.setAttribute('id',`${TASK.taskID}`);
    taskBox.classList.add('taskBox');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    
    checkbox.addEventListener('click', function(){
        if(checkbox.checked)
        {
            TASK.completed = true;
            addtaskName.style.textDecoration = "line-through";
            let storedTasks = JSON.parse(localStorage.getItem("myTaskList"));
            for(var i=0;i<storedTasks.length;i++)
            {
                if(TASK.taskID === storedTasks[i].taskID)
                {
                    storedTasks[i].completed = true;
                }
            }
            localStorage.setItem("myTaskList", JSON.stringify(storedTasks));
        }
        else
        {
            TASK.completed = false;
            addtaskName.style.textDecoration = "none";
            let storedTasks = JSON.parse(localStorage.getItem("myTaskList"));
            for(var i=0;i<storedTasks.length;i++)
            {
                if(TASK.taskID === storedTasks[i].taskID)
                {
                    storedTasks[i].completed = false;
                }
            }
            localStorage.setItem("myTaskList", JSON.stringify(storedTasks));
        }
    })

    
    const addtaskName = document.createElement('span');
    addtaskName.classList.add('addtaskName');
    addtaskName.innerText = `${TASK.Name}`;
    
    if(TASK.completed)
    {
        checkbox.checked = true;
        TASK.completed = true;
        addtaskName.style.textDecoration = "line-through";
    }


    const Duedate = document.createElement('div');
    Duedate.classList.add('Duedate');

    Duedate.innerText = `${TASK.deadline}`;
    if(TASK.deadline==='')
        Duedate.innerText = `No Due Date`;


    taskBox.appendChild(checkbox);
    taskBox.appendChild(addtaskName);
    taskBox.appendChild(Duedate);
    if(TASK.importance)
    {
        taskBox.appendChild(addstarMarked());
    }
    else{
        taskBox.appendChild(addstarUnmarked());
    }
    var trashBin = addTrash();
    trashBin.addEventListener('click', function(){
        trashBin.parentNode.parentNode.removeChild(trashBin.parentNode);
        removeTaskfromLocal(parseInt(trashBin.parentNode.id));
    })
    taskBox.appendChild(trashBin);
    return taskBox;
}


function addstarUnmarked(){
    var svgString = '<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg>';       
    var container = document.createElement('div');
    container.innerHTML = svgString;
    return container.firstChild;  
}

function addstarMarked(){
    var svgString = '<svg class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>';       
    var container = document.createElement('div');
    container.innerHTML = svgString;
    return container.firstChild;  
}


export function addExistingTasks(ID){
    const mainBody = document.querySelector('.mainTask');
    mainBody.innerHTML = '';
    var str = localStorage.getItem("myTaskList");
    var addprevTasks = JSON.parse(str);
    console.log(alltasks);

    if(addprevTasks)
    {
        for(var i=0;i<addprevTasks.length;i++)
        {
            if(addprevTasks[i].ProjectID===ID)
                mainBody.appendChild(addNewTask(addprevTasks[i]));
        }
    }
    addTaskFunctionality();
}