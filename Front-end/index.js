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
const Setting = document.getElementById("setting")
const LogOut = document.getElementById("logout")

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


const game = document.getElementsByClassName("Game")
for(let i = 0;i<game.length;i++){
    game[i].addEventListener('click',function(){
        window.location.href = "gamePage.html"
    })
}

const search = document.getElementById("SearchButton")
search.addEventListener("click",function(){
    window.location.href = 'recherche.html'
})


// Quand la page est chargée, on exécute la fonction init()
document.addEventListener('DOMContentLoaded', init);

function init() {
  // 1) Charger la section Recommended
  loadRecommended();

  // 2) Charger la section Sales
  loadSales();

  // 3) Charger la section New
  loadNew();
}

async function loadRecommended() {
  try {
    // On récupère la liste des jeux recommandés
    const res = await fetch('/api/games/recommended');
    const data = await res.json();

    // data est un tableau d'objets (chaque objet représente un jeu)
    const recommendedSection = document.querySelector('.Recommended');
    // On vide la section d’éventuels anciens éléments
    recommendedSection.innerHTML = '';

    data.forEach(game => {
      // Créer un bloc de jeu
      const gameDiv = createGameDiv(game);
      // L'ajouter à la section
      recommendedSection.appendChild(gameDiv);
    });
  } catch (err) {
    console.error('Erreur loadRecommended:', err);
  }
}

async function loadSales() {
  try {
    const res = await fetch('/api/games/sales');
    const data = await res.json();

    const salesSection = document.querySelector('.Sales');
    salesSection.innerHTML = '';

    data.forEach(game => {
      const gameDiv = createGameDiv(game);
      salesSection.appendChild(gameDiv);
    });
  } catch (err) {
    console.error('Erreur loadSales:', err);
  }
}

async function loadNew() {
  try {
    const res = await fetch('/api/games/new');
    const data = await res.json();

    const newSection = document.querySelector('.New');
    newSection.innerHTML = '';

    data.forEach(game => {
      const gameDiv = createGameDiv(game);
      newSection.appendChild(gameDiv);
    });
  } catch (err) {
    console.error('Erreur loadNew:', err);
  }
}

function addToCart(game) {
  // Charger le panier existant ou initialiser un nouveau panier
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Vérifier si le jeu est déjà dans le panier
  const existingGame = cart.find(item => item.id_jeu === game.id_jeu);
  if (existingGame) {
    alert(`${game.nom} est déjà dans le panier.`);
    return;
  }

  // Ajouter le jeu au panier
  cart.push(game);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${game.nom} a été ajouté au panier.`);
  // Optionnel : Cacher le bouton après l'ajout
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.style.display = 'none';
  });
}


/**
 * Crée un bloc <div> (ou structure) pour représenter un jeu dans le DOM
 * @param {Object} game un objet JSON : { id_jeu, nom, prix, image, ... }
 */
function createGameDiv(game) {
  // Ex: 
  // <div id="Game">
  //   <div id="game"><img src="game.image" /></div>
  //   <p>game.nom</p>
  //   <p>game.prix $</p>
  // </div>

  const divGameContainer = document.createElement('div');
  divGameContainer.id = 'Game'; 

  const divGameImgWrapper = document.createElement('div');
  divGameImgWrapper.id = 'game';

  const img = document.createElement('img');
  // Si game.image est un chemin (ex: "/uploads/monJeu.png")
  // ou une URL absolue (ex: "https://...") :
  img.src = game.image || 'images/no_image.png'; // fallback si pas d'image

  divGameImgWrapper.appendChild(img);

  const pNom = document.createElement('p');
  pNom.style.margin = '0';
  pNom.style.color = 'white';
  pNom.textContent = game.nom || 'Nom du jeu';

  const pPrix = document.createElement('p');
  pPrix.style.margin = '0';
  pPrix.style.color = 'white';
  pPrix.textContent = game.prix ? `${game.prix} $` : '?? $';

    // Ajouter un bouton "Ajouter au panier"
  const addToCartBtn = document.createElement('button');
  addToCartBtn.textContent = 'Ajouter au panier';
  addToCartBtn.classList.add('add-to-cart-btn');
  addToCartBtn.style.display = 'none'; // Caché par défaut
  addToCartBtn.onclick = () => addToCart(game);

    // Afficher le bouton lorsque l'utilisateur clique ou survole
  divGameContainer.addEventListener('click', () => {
    addToCartBtn.style.display = 'block'; // Affiche le bouton
   });

  // Ajouter chaque élément dans le container
  divGameContainer.appendChild(divGameImgWrapper);
  divGameContainer.appendChild(pNom);
  divGameContainer.appendChild(pPrix);
  divGameContainer.appendChild(addToCartBtn);

  return divGameContainer;
}





