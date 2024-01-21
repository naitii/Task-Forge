import {projectID} from './addProject.js';


let defaultProjectList=[];
let projectList = localStorage.getItem("myProjectList");

projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));


const createProject = (Name) => {
    const taskList =[];
    const taskNum = taskList.length;
    return{
        Name,
        taskList,
        taskNum,
    };
}

export function addNewProjectToLocal(projectName){   
        //to local storage
        const newProject = createProject(projectName);
        projectList.push(newProject);
        saveInLocal(); 
}

function saveInLocal(){
    localStorage.setItem("myProjectList", JSON.stringify(projectList));
    localStorage.setItem("current", (projectID).toString());

}

