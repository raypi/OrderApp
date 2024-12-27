// warenkorb scrollbar machen
// ggf. Disign schön machen

// init funktion
function init() {
  renderMeals();
  updateCartDisplay();
}

// Auslesen und Rendern der Gerichte nach Ketegorien
function renderMeals() {
  const mealsContainer = document.getElementById("mealsOverview");
  mealsContainer.innerHTML = "";

  let mealsHTML = "";

  for (const category in meals[0]) {
    const mealCategory = meals[0][category];

    mealCategory.forEach((meal, index) => {
      mealsHTML += getMealTamplate(category, index, meal);
    });
  }

  mealsContainer.innerHTML = mealsHTML;
}

// Funktion um aus der Übersicht der Gerichte in den Warenkorb zu verschieben
function addCartItem(category, index) {
  const meal = meals[0][category][index];

  meal.amount = (meal.amount || 0) + 1;

  console.log(`${meal.name}: Menge auf ${meal.amount} erhöht.`);

  updateCartDisplay();
}

// Ansicht der Gerichte im Warenkorb
function updateCartDisplay() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  let hasItems = false;

  for (const category in meals[0]) {
    const mealCategory = meals[0][category];

    mealCategory.forEach((meal, index) => {
      if (meal.amount > 0) {
        hasItems = true;
        cartContainer.innerHTML += getCartDisplayTemplate(category, index, meal);
      }
    });
  }

  if (!hasItems) {
    cartContainer.innerHTML = "<p>Der Warenkorb ist leer.</p>";
  }

  updateInvoiceData(hasItems);
}

// Abziehen eines Artikels im Warenkorb
function reduceMeal(category, index) {
  const meal = meals[0][category][index];

  if (meal.amount > 0) {
    meal.amount -= 1;

    if (meal.amount === 0) {
    }
  }

  updateCartDisplay();
}

// Nettopreis berechnen
function netInvoice() {
  let netTotal = 0;

  for (const category in meals[0]) {
    const mealCategory = meals[0][category];

    mealCategory.forEach((meal) => {
      if (meal.amount > 0) {
        netTotal += meal.price * meal.amount;
      }
    });
  }

  const netValue = (netTotal / 1.19).toFixed(2);
  console.log(`Netto: ${netValue} €`);
  return netValue;
}

// Gesamtrechnung und Lieferkosten ermitteln
function sumInvoice() {
  let total = 0;

  for (const category in meals[0]) {
    const mealCategory = meals[0][category];

    mealCategory.forEach((meal) => {
      if (meal.amount > 0) {
        total += meal.price * meal.amount;
      }
    });
  }

  const shippingCost = total >= 39 ? 0 : 7; // Kostenlose Lieferung ab 39€
  return {
    total: (total + shippingCost).toFixed(2),
    shippingCost: shippingCost.toFixed(2),
  };
}

// Zusammenfassung aktualisieren
function updateInvoiceData(hasItems) {
  const invoiceData = document.getElementById("invoiceData");

  if (!hasItems) {
    invoiceData.innerHTML = "";
    return;
  }

  const netTotal = netInvoice();
  const invoice = sumInvoice();

  invoiceData.innerHTML = `
        <div>
            <p>Netto: ${netTotal} €</p>
            <p>Lieferung: ${
              invoice.shippingCost === "0.00"
                ? "gratis"
                : `${invoice.shippingCost} €`
            }</p>
            <p><strong>Gesamtpreis: ${invoice.total} €</strong></p>
        </div>
        <div>
        <button id="orderBtn" onclick="orderNow()" >bestellen</button>
        </div>
    `;
}

// Entfernt das Essen komplett aus dem Warenkorb
function removeMeal(category, index) {
  const meal = meals[0][category][index];
  meal.amount = 0; // Menge auf 0 setzen, um das Gericht zu entfernen
  updateCartDisplay();
}

// Button bestellen
function orderNow() {
  for (const category in meals[0]) {
    const mealCategory = meals[0][category];
    mealCategory.forEach((meal) => {
      meal.amount = 0;
    });
  }
  updateCartDisplay();
  const orderMessage = document.getElementById("orderMessage");
  orderMessage.innerHTML = `
        <div class="orderMessageDiv">
            <p>Sie haben soeben eine TESTBESTELLUNG aufgegeben.</p>
            <button onclick="clearOrderMessage()">OK</button>
        </div>
        `;
}

// Löscht Bestellbestätigung im Cart
function clearOrderMessage() {
  const orderMessage = document.getElementById("orderMessage");
  orderMessage.innerHTML = "";
}

// anzeigen des Warenkorbes in der verkleinerten Ansicht ab 600px
// soll gerichte ausblenden und Cart an die stelle rücken
// ggf. "Warenkorb anzeigen BTN mit aktuellem Wert als ausgabe erweitern"
function showResponisveCart() {
    const maelWrapper = document.getElementById("maelsGalery");
    const cartWrapper = document.getElementById("cartWrapper");
    const button = document.getElementById("toggleCartButton");


    maelWrapper.classList.toggle("maelsGalerySec");
    maelWrapper.classList.toggle("maelsGalerySecDnone");
    cartWrapper.classList.toggle("chartWrapper");
    cartWrapper.classList.toggle("chartWrapperSmal");

    if (maelWrapper.classList.contains("maelsGalerySec")) {
        button.innerText = "Warenkorb anzeigen";
    } else {
        button.innerText = "Menüauswahl anzeigen";
    }
}
