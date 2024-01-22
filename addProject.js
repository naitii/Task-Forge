import { select_list } from "./script.js";
import {addNewProjectToLocal} from "./projects.js";
import { removeProjectfromLocal } from "./projects.js";
import { addTaskFunctionality } from "./addTasks.js";
import { removeProjectChild } from "./tasks.js";
import { addExistingTasks } from "./addTasks.js";

const addProject = document.getElementById('add-project');
const parent  = document.querySelector('.projects');

var formDone = true;
export var projectID = 1;

addProject.addEventListener('click',function(){
    if(formDone === true)
    {
        formDone = false;
        addProject.parentNode.removeChild(addProject);
        const list = document.createElement('li');

        const addProjectForm = document.createElement('form');
        addProject.classList.add('addProjectForm');
            const projectName = document.createElement('input');
            projectName.classList.add('projectName');
            projectName.setAttribute('id',"projectName")

            const addButton = document.createElement('button');
            addButton.classList.add('add');
            addButton.type = "submit";
            addButton.textContent =`Add`;
            const cancelButton = document.createElement('button');
            cancelButton.classList.add('cancel');
            cancelButton.textContent =`Cancel`;

            addProjectForm.appendChild(projectName);
            addProjectForm.appendChild(addButton);
            addProjectForm.appendChild(cancelButton);
            list.appendChild(addProjectForm);
            parent.appendChild(list);

            addButton.addEventListener('click',function(){
                event.preventDefault();
                if(projectName.value.length){

                    formDone = true;

                    projectID=projectID+1;
                    console.log(projectID);

                    const container = document.createElement('div');
                    container.classList.add('projectContainer');
                    container.setAttribute('id',`${projectID}`);

                    container.style.display = 'flex';
                    container.style.gap = '150px';


                    container.classList.add('nav-sublist');
                    container.classList.add('project-sublist');
                    container.addEventListener("click", select_list);
                    
                    container.innerText = `${projectName.value}`;

                    const trash = addTrash();
                    trash.addEventListener('click', function(){
                        trash.parentNode.parentNode.removeChild(trash.parentNode);
                        var ID = parseInt(trash.parentNode.id);
                        console.log(ID);
                        removeProjectfromLocal(ID);
                        removeProjectChild(ID);
                    })
                    
                    container.appendChild(trash);
                    addNewProjectToLocal(`${projectName.value}`);


                    
                    parent.removeChild(list);
                    parent.appendChild(container);
                    parent.appendChild(addProject);
                }
            })
            cancelButton.addEventListener('click',function(){
                event.preventDefault();
                formDone= true;
                parent.removeChild(list);
                parent.appendChild(addProject);
            })
        
    }
    
})

function addExistingProjects(){

    const arr = JSON.parse(`${localStorage.getItem("myProjectList")}`);
    parent.removeChild(addProject);
    projectID=0;
    if(arr!=null)
    {
        for(var i =0;i<arr.length;i++)
        {
            const container = document.createElement('div');
                    container.classList.add('projectContainer');
                    container.style.display = 'flex';
                    container.style.gap = '150px';
                    container.setAttribute('id',`${arr[i].projectID}`);


                    container.classList.add('nav-sublist');
                    container.classList.add('project-sublist');
                    container.addEventListener("click", select_list);


                    container.innerText = `${arr[i].Name}`;

                    const trash = addTrash();
                    trash.addEventListener('click', function(){
                        trash.parentNode.parentNode.removeChild(trash.parentNode);
                        var ID = parseInt(trash.parentNode.id);
                        console.log(ID);
                        removeProjectfromLocal(ID);
                        removeProjectChild(ID);
                    })
                    container.appendChild(trash);

                    
            container.addEventListener('click',function(){
                addExistingTasks(parseInt(container.id));
            })

            parent.appendChild(container);
        }
        projectID=arr.length+1;
    }

    parent.appendChild(addProject);
}

window.addEventListener('load',addExistingProjects());






document.body.addEventListener('click',resetDeleteNodes);
document.body.addEventListener('contextMenu',resetDeleteNodes);

function resetDeleteNodes(){
    const delNodes = document.querySelectorAll('.delete')
    for(const node of delNodes)
    {
        node.parentNode.removeChild(node);
    }
}

export function addTrash(){
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>';       
    var container = document.createElement('div');
    container.innerHTML = svgString;
    return container.firstChild;  
}