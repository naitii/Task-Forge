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
        for(const child of navChild)
        {
            child.style.visibility = "hidden"
        }
        nav.style.width = "2px";
        navOpen = false;
    }
    else
    {
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
        sublist.style.opacity = "0.5";
    })
    sublist.addEventListener('mouseleave', function(){
        sublist.style.opacity = "1";
    })
    sublist.addEventListener('click', function(){

        const selected = document.querySelector('.selectedNav')
        selected.classList.remove('selectedNav');
        sublist.classList.add('selectedNav');
        contentHeader.innerHTML=`${sublist.textContent}`;
        
    })
}

