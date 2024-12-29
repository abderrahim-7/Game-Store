const register = document.getElementById("registerNow");
const logBlock = document.getElementById("1");


register.addEventListener("click",function(){
    event.preventDefault();
    logBlock.style.transform = "translate(0,400px)"
    logBlock.style.transition = "transform 1s"
    setTimeout(() => {
        window.location.href = "registre.html";
    }, 500);
})

document.addEventListener('DOMContentLoaded',function(){
    logBlock.style.transform = "translate(0,-500px)"
})