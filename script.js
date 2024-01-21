const bars = document.getElementById("bars");
const nav = document.querySelector('.navbar')
const navChildHome = nav.querySelectorAll('nav-subList');
const navChild = nav.querySelectorAll(':scope > *');
const navsubList = document.querySelectorAll('.nav-sublist');
const contentHeader = document.getElementById("content-header")
var navOpen = true;


bars.addEventListener('click', function(){
    if(navOpen)
    {
        bars.style.rotate = `-180deg`;
        for(const child of navChild)
        {
            child.style.visibility = "hidden"
        }
        nav.style.width = "2px";
        navOpen = false;
    }
    else
    {
        bars.style.rotate = `0deg`;
        nav.style.width = "15rem";
        setTimeout(function(){
            for(const child of navChild)
            {
                child.style.visibility = "visible"
            }
        }, 500)
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
        const selected = document.querySelector('.selectedNav')
            selected.classList.remove('selectedNav');
            e.target.classList.add('selectedNav');
            contentHeader.innerHTML=`${e.target.textContent}`;
    }


