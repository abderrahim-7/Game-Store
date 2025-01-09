/********************************
 * payment.js (Extrait modifié)
 ********************************/

let paymentMethods = {};

function loadPaymentMethods() {
  const dataStr = localStorage.getItem("paymentMethods");
  paymentMethods = dataStr ? JSON.parse(dataStr) : {};
}

function savePaymentMethods() {
  localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
}

function renderPaymentList() {
  const paymentListEl = document.querySelector(".payment-list");
  if (!paymentListEl) return;
  
  paymentListEl.innerHTML = "";

  for (const type in paymentMethods) {
    const data = paymentMethods[type];
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("payment-item");

    // Icône
    const iconImg = document.createElement("img");
    iconImg.classList.add("payment-icon");
    if (type === "visa") {
      iconImg.src = "images/visa.png";
    } else if (type === "mastercard") {
      iconImg.src = "images/mastercard img.png";
    } else if (type === "paypal") {
      iconImg.src = "images/pay-pal.png";
    }

    // Infos
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("payment-info");
    if (type === "paypal") {
      infoDiv.innerHTML = `<p>PayPal (compte : ${data.number})</p>`;
    } else {
      const lastDigits = data.number.slice(-4);
      infoDiv.innerHTML = `
        <p>${type} se terminant par ${lastDigits}</p>
        <p>Date d'expiration : ${data.expiry}</p>
      `;
    }

    // Bouton “Supprimer”
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-payment-btn");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
      delete paymentMethods[type];
      savePaymentMethods();
      renderPaymentList();
    });

    itemDiv.appendChild(iconImg);
    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(deleteBtn);
    paymentListEl.appendChild(itemDiv);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPaymentMethods();

  const showPaymentFormBtn = document.getElementById("showPaymentFormBtn");
  const paymentFormSection = document.getElementById("paymentFormSection");
  const cancelPaymentBtn = document.getElementById("cancelPaymentBtn");
  const paymentForm = document.getElementById("paymentForm");

  // Récupération des champs
  const paymentTypeSelect = document.getElementById("paymentType");
  const cardNumberInput   = document.getElementById("cardNumber");
  const cardExpiryInput   = document.getElementById("cardExpiry");
  const cardCVVInput      = document.getElementById("cardCVV");



  renderPaymentList();

  // ----- 1) Affichage conditionnel selon le type -----
  function onPaymentTypeChange() {
    const type = paymentTypeSelect.value;
    if (type === "paypal") {
      // Masquer champs “expiry” et “cvv”
      cardCVVInput.style.display   = "none";
      cvvLabel.style.display       = "none";
      cardExpiryInput.style.display = "none";
      expiryLabel.style.display     = "none";


    } else {
      // Visa ou MasterCard => on affiche
      cardCVVInput.style.display    = "block";
      cvvLabel.style.display        = "block";
      cardExpiryInput.style.display = "block";
      expiryLabel.style.display     = "block";

      
    }
  }
  // On appelle cette fonction à chaque changement de type
  paymentTypeSelect.addEventListener("change", onPaymentTypeChange);

  // ----- 2) Bouton “Ajouter un moyen de paiement” -----
  showPaymentFormBtn?.addEventListener("click", () => {
    paymentFormSection.style.display = "block";
  });

  // ----- 3) Bouton “Annuler” -----
  cancelPaymentBtn?.addEventListener("click", () => {
    paymentFormSection.style.display = "none";
  });

  // ----- 4) Validation et soumission -----
  paymentForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const type   = paymentTypeSelect.value;
    const number = cardNumberInput.value.trim();
    const expiry = cardExpiryInput.value.trim();
    const cvv    = cardCVVInput.value.trim();

    // *** 4.A => Empêcher champs vides ***
    if (!type) {
      alert("Veuillez choisir un type de paiement.");
      return;
    }
    if (type === "paypal") {
      // PayPal => Seule la case “number” compte (on attend un email)
      if (!number) {
        alert("Veuillez saisir l'e-mail du compte PayPal.");
        return;
      }
      // On peut vérifier que “number” ressemble à un email : /.+@.+\..+/
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(number)) {
        alert("Adresse PayPal invalide.");
        return;
      }
    } else {
      // Visa ou MasterCard
      // a) Number => 16 chiffres
      const cardRegex = /^\d{16}$/;
      if (!cardRegex.test(number)) {
        alert("Le numéro de carte doit contenir exactement 16 chiffres.");
        return;
      }
      // b) Expiry => Format MM/AA
      const expiryRegex = /^\d{2}\/\d{2}$/;
      if (!expiryRegex.test(expiry)) {
        alert("La date d'expiration doit être au format MM/AA.");
        return;
      }
      // c) CVV => 3 chiffres
      const cvvRegex = /^\d{3}$/;
      if (!cvvRegex.test(cvv)) {
        alert("Le CVV doit contenir exactement 3 chiffres.");
        return;
      }
    }

    // *** 4.B => Si OK, on enregistre / remplace ***
    paymentMethods[type] = {
      number: number,
      expiry: expiry || "N/A",
      cvv: cvv || "N/A",
    };

    savePaymentMethods();
    renderPaymentList();

    // Reset + hide
    paymentForm.reset();
    paymentFormSection.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("backToProfileBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Redirection via JS
      window.location.href = "profil.html"; 
    });
  }
});




  