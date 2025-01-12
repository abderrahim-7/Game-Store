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

const Home = document.getElementById("home")
const Profile = document.getElementById("profile")
const Cart = document.getElementById("cart")
const settings = document.getElementById("settings")

settings.addEventListener("click",function(){
    window.location.href = "settings.html"
})

Home.addEventListener("click",function(){ 
    window.location.href = "index.html"
})
Profile.addEventListener("click",function(){
    window.location.href = "profil.html"
})
Cart.addEventListener("click",function(){
    window.location.href = "cart.html"
})
const removeButton = document.getElementsByClassName("remove")
for (let i = 0;i<removeButton.length;i++){
    removeButton[i].addEventListener("click",function(){
        this.parentElement.remove()
    })
}

const buyButton = document.getElementById("buyAll")
buyButton.addEventListener('click',function(){
    window.location.href = "buy.html"
})

const search = document.getElementById("SearchButton")
search.addEventListener("click",function(){
    window.location.href = 'recherche.html'
})


