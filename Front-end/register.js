const logButton = document.getElementById("loginNow");
const logBlock = document.getElementById("1");

logButton.addEventListener("click",function(){
    event.preventDefault();
    logBlock.style.transform = "translate(0,400px)"
    logBlock.style.transition = "transform 1s"
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
})

document.addEventListener('DOMContentLoaded',function(){
    logBlock.style.transform = 'translate(0,-500px)'
})