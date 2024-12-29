const menu = document.getElementsByClassName("menu")
const menuDiv = document.getElementsByClassName("menuDiv")
var L = ["Home","Profile","Cart","Setting","Log out"]
var showText = false;

menu[0].addEventListener("mouseover",function(){
    if (showText == false){
        for (i = 0;i<5;i++){
            var menuText = document.createElement('p')
            menuText.id = "menuText"
            menuText.innerText = L[i]
            menuDiv[i].append(menuText)
            showText = true
        }
    }
})

menu[0].addEventListener("mouseleave",function(){
    if (showText == true){
        for (i = 0;i<5;i++){
            const menuText = menuDiv[i].querySelector("p");
            menuDiv[i].removeChild(menuText)
            showText = false
        }
    }
})



