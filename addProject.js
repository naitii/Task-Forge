import { select_list } from "./script.js";
import {addNewProjectToLocal} from "./projects.js";

const addProject = document.getElementById('add-project');
const parent  = document.querySelector('.projects');

var formDone = true;
export var projectID = 0;

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
                    projectID++;                    
                    const doneProject = document.createElement('li');
                    doneProject.textContent = `${projectName.value}`;
                    doneProject.classList.add('nav-sublist');
                    doneProject.addEventListener("click", select_list);

                    addNewProjectToLocal(`${projectName.value}`);
                    
                    parent.removeChild(list);
                    parent.appendChild(doneProject);
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
    const arr = localStorage.getItem("myProjectList");
    for(const p of arr)
    {
        const doneProject = document.createElement('li');
        doneProject.textContent = `${p}`;
        doneProject.classList.add('nav-sublist');
        parent.appendChild(doneProject);



    }
}