import { addTaskFunctionality } from "./addTasks.js";

const bars = document.getElementById("bars");
const nav = document.querySelector('.navbar')
const navChildHome = nav.querySelectorAll('nav-subList');
const navChild = nav.querySelectorAll(':scope > *');
const navsubList = document.querySelectorAll('.nav-sublist');
const mainBody = document.querySelector('.mainTask');
const contentHeader = document.getElementById("content-header");
var navOpen = true;


bars.addEventListener('click', function(){
    
    nav.style.transition = `all 0.8s ease`;
    if (navOpen && window.innerWidth > 1045) {
      bars.style.rotate = `-180deg`;
      for (const child of navChild) {
        child.style.visibility = "hidden";
      }
      nav.style.width = "2px";
      navOpen = false;
    }
    else if (navOpen && window.innerWidth <= 1045) {
      bars.style.rotate = `-90deg`;
      for (const child of navChild) {
        child.style.visibility = "hidden";
      }
      nav.style.height = "2px";
      navOpen = false;
    } else if (window.innerWidth <= 1045 && !navOpen) {
      bars.style.rotate = `0deg`;
      nav.style.height = "fit-content";
      setTimeout(function () {
        for (const child of navChild) {
          child.style.visibility = "visible";
        }
      }, 500);
      navOpen = true;
    } else {
      bars.style.rotate = `0deg`;
      nav.style.width = "15rem";
      setTimeout(function () {
        for (const child of navChild) {
          child.style.visibility = "visible";
        }
      }, 500);
      navOpen = true;
    }
    
})

    for(const sublist of navsubList)
    {
        sublist.addEventListener('mouseover', function(){
            sublist.style.opacity = "0.6";
        })
        sublist.addEventListener('mouseleave', function(){
            sublist.style.opacity = "1";
        })
        sublist.addEventListener('click', select_list);
    }
    export function select_list(e){
        mainBody.innerHTML='';
        if(e.target.tagName!='svg'&&e.target.tagName!='path'){
            const selected = document.querySelector('.selectedNav')
            if(selected)
                selected.classList.remove('selectedNav');
            e.target.classList.add('selectedNav');
            contentHeader.innerHTML=`${e.target.textContent}`;
            addTaskFunctionality();
        }
    }

    if(window.innerWidth>1045)
    {
        nav.style.height='100vh';
    }