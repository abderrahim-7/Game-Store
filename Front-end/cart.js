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


document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Charger les jeux dans le panier
    setupBuyAll(); // Configurer le bouton "Buy All"
  });
  
  function loadCart() {
    const cartContainer = document.querySelector('.Listegames'); // Conteneur des jeux
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupérer le panier depuis localStorage
  
    // Supprimer tous les anciens éléments, mais conserver le bouton "Buy All"
    cartContainer.innerHTML = `
      <div style="display: flex; justify-content: center;">
        <button id="buyAll">Buy All</button>
      </div>
    `;
  
    if (cart.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Votre panier est vide.';
      emptyMessage.style.color = 'white';
      emptyMessage.style.textAlign = 'center';
      cartContainer.appendChild(emptyMessage);
      return;
    }
  
    cart.forEach(game => {
      const gameDiv = createGameDiv(game);
      cartContainer.appendChild(gameDiv);
    });
  }
  
  function createGameDiv(game) {
    const divGameContainer = document.createElement('div');
    divGameContainer.id = 'Game'; 
  
    const divGameImgWrapper = document.createElement('div');
    divGameImgWrapper.id = 'game';
  
    const img = document.createElement('img');
    img.src = game.image || 'images/no_image.png'; // Image par défaut si absente
    img.alt = game.nom || 'Jeu';
  
    divGameImgWrapper.appendChild(img);
  
    const pNom = document.createElement('p');
    pNom.style.margin = '0';
    pNom.style.color = 'white';
    pNom.textContent = game.nom || 'Nom du jeu';
  
    const pPrix = document.createElement('p');
    pPrix.style.margin = '0';
    pPrix.style.color = 'white';
    pPrix.textContent = game.prix ? `${game.prix} $` : 'Prix inconnu';
  
    // Ajouter un bouton pour retirer le jeu du panier
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn'); // Utilisez une classe pour personnaliser dans cart.css
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => removeFromCart(game.id_jeu);
  
    // Ajouter les éléments au container
    divGameContainer.appendChild(divGameImgWrapper);
    divGameContainer.appendChild(pNom);
    divGameContainer.appendChild(pPrix);
    divGameContainer.appendChild(removeBtn);
  
    return divGameContainer;
  }
  
  function removeFromCart(id_jeu) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(game => game.id_jeu !== id_jeu); // Retirer le jeu
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Mettre à jour le stockage
    loadCart(); // Recharger l'affichage
  }
  
  function setupBuyAll() {
    const buyAllButton = document.getElementById('buyAll');
    buyAllButton.addEventListener('click',function(){

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }
        window.location.href = "buy.html"
    })

     }
  


