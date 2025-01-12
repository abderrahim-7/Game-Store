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

Home.addEventListener("click",function(){ 
    window.location.href = "index.html"
})
Profile.addEventListener("click",function(){
    window.location.href = "profil.html"
})
Cart.addEventListener("click",function(){
    window.location.href = "cart.html"
})

const search = document.getElementById("SearchButton")
search.addEventListener("click",function(){
    window.location.href = 'recherche.html'
})



function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

const txt = document.getElementsByTagName('h2')
const input = document.getElementsByTagName('input')
const size = document.getElementsByClassName('fontsize')
size[0].addEventListener("change",function(){
    for (let i = 0; i<txt.length;i++){
        txt[i].style.fontSize = size[0].value
    }
    for (let i = 0; i<input.length;i++){
        input[i].style.fontSize = size[0].value
    }
})

function changeLanguage(lang) {
    alert("Language changed to " + lang);
}
