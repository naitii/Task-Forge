const mainBody = document.querySelector('.mainTask');


const createTask = (Name, ProjectID, importance, deadline, completed) => {
    return{
        Name,
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
            var highPriority = false;
            if(impButton.innerText===`IMPORTANT`)
                highPriority=true;

            const newTask = createTask(taskName.value,ID,highPriority,dateInput.value,false);
            console.log(newTask);


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

function addNewTask(){
    const taskBox = document.createElement('div');
    taskBox.classList.add('taskBox');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    
    const addtaskName = document.createElement('span');
    addtaskName.innerText = ` addtaskName`;

    taskBox.appendChild(checkbox);
    taskBox.appendChild(addtaskName);
    mainBody.appendChild(taskBox);
}
addNewTask();