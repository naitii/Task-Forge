import {projectID} from './addProject.js';


let defaultProjectList=[];
let projectList = localStorage.getItem("myProjectList");

projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));


const createProject = (Name) => {
    const taskList =[];
    const taskNum = taskList.length;
    return{
        Name,
        projectID,
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
export function removeProjectfromLocal(ID) {
    var storedProjects = localStorage.getItem("myProjectList");

    if (storedProjects) {
        var parsedData = JSON.parse(storedProjects);

        parsedData = parsedData.filter(function (item) {
            return item.projectID !== ID;
        });

        localStorage.setItem("myProjectList", JSON.stringify(parsedData));
    }
}
function saveInLocal(){
    localStorage.setItem("myProjectList", JSON.stringify(projectList));
}

