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

document.addEventListener("DOMContentLoaded", () => {
    // Sélection de tous les boutons "Éditer"
    const editButtons = document.querySelectorAll(".edit-field-btn");
  
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Récupère la valeur du data-field
        const field = btn.getAttribute("data-field");
  
        // Si c’est "payment", on redirige (exemple vers une page fictive)
        if (field === "payment") {
          window.location.href = "payment.html";
          return;
        }
  
        // Sinon, c’est "email" ou "pseudo"
        if (field === "email") {
          toggleEdit("profileEmailValue", "profileEmailInput");
        } else if (field === "pseudo") {
          toggleEdit("profilePseudoValue", "profilePseudoInput");
        }
      });
    });
  
    /**
     * Bascule l’affichage entre le <span> (valeur) et l’<input> (édition)
     * @param {string} spanId - ID du <span> qui affiche la valeur
     * @param {string} inputId - ID de l’<input> qui permet l’édition
     */
    function toggleEdit(spanId, inputId) {
      const spanEl = document.getElementById(spanId);
      const inputEl = document.getElementById(inputId);
  
      // Si l'un des deux n'existe pas, on arrête
      if (!spanEl || !inputEl) return;
  
      // Si l’input est caché => on passe en "mode édition"
      if (inputEl.style.display === "none" || inputEl.style.display === "") {
        // Remplir l’input avec le texte actuel
        inputEl.value = spanEl.textContent.trim();
        // Masquer le span, afficher l’input
        spanEl.style.display = "none";
        inputEl.style.display = "block";
        inputEl.focus(); // Mettre le focus pour taper
      } else {
        // Sinon, on "valide" et on repasse en mode lecture
        const newValue = inputEl.value.trim();
        if (newValue !== "") {
          spanEl.textContent = newValue;
        }
        // On masque l’input, on réaffiche le span
        inputEl.style.display = "none";
        spanEl.style.display = "inline";
      }
    }
  });
  