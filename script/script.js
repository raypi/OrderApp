// Warenkorb rechts unter dem Header fix
// Warenkorb bekommt Order BTN um Bestellung abzuschliessen, dann Pop Up mit Mitteilung
// mindestens 3 Produkt Kategorien und 3 Produkte je Kategorie [Zusatzaufgabe: Verschiedene Reiter für verschiedene Produkte]
// Jedes Produkt was in den Warenkorb kommt kann mit - oder Plus verändert werden, bei 1 und - verschwindet es aus dem Warenkorb
// es gibt ein Löschen BTN für das Produkt im Warenbkorb
// Bei der Handy APP rutsch der Warenkorb BTN nach Untern, der Angezeigte Warenkorb ist der gleich wie in der Desktop ansicht


// init funktion
function init() {
    renderMeals();
    updateCartDisplay();
}

// Auslesen und Rendern der Gerichte nach Ketegorien
function renderMeals() {
    const mealsContainer = document.getElementById('mealsOverview');
    mealsContainer.innerHTML = '';

    let mealsHTML = '';

    for (const category in meals[0]) {
        const mealCategory = meals[0][category];

        mealCategory.forEach((meal, index) => {
            mealsHTML += `
                <div class="mealDiv">
                    <div class="mealNameDiv">
                        <p>${meal.name}</p>
                        <img 
                            class="chartBtn" 
                            id="${category}-${index}" 
                            src="./img/plus.png" 
                            alt="button um dieses Gericht auszuwählen"
                            onclick="addCartItem('${category}', ${index})"
                        >
                    </div>
                    <p>${meal.description}</p>
                    <p>${meal.price.toFixed(2)} €</p>
                </div>
            `;
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
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    let hasItems = false;

    for (const category in meals[0]) {
        const mealCategory = meals[0][category];

        mealCategory.forEach((meal, index) => {
            if (meal.amount > 0) {
                hasItems = true;
                cartContainer.innerHTML += `
                    <div>
                        ${meal.name}
                    </div>
                    <div class="mealInChart">
                        <img id="${category}-${index}-minus" class="chartBtn" src="./img/minus.png" alt="button für weniger gerichte" onclick="reduceMeal('${category}', ${index})">
                        <p>${meal.amount}</p>
                        <img id="${category}-${index}-plus" class="chartBtn" src="./img/plus.png" alt="button für mehr gerichte" onclick="addCartItem('${category}', ${index})">
                        <p>${(meal.price * meal.amount).toFixed(2)} €</p>
                        <img 
                            id="${category}-${index}-del"
                            class="chartBtn" 
                            src="./img/trash.png" 
                            alt="löschen des gerichtes"
                            onclick="removeMeal('${category}', ${index})"
                        >
                    </div>
                    <div class="separator"></div>
                `;
            }
        });
    }

    if (!hasItems) {
        cartContainer.innerHTML = '<p>Der Warenkorb ist leer.</p>';
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

        mealCategory.forEach(meal => {
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

        mealCategory.forEach(meal => {
            if (meal.amount > 0) {
                total += meal.price * meal.amount;
            }
        });
    }

    const shippingCost = total >= 29 ? 0 : 5; // Kostenlose Lieferung ab 29€
    return {
        total: (total + shippingCost).toFixed(2),
        shippingCost: shippingCost.toFixed(2)
    };
}

// Zusammenfassung aktualisieren
function updateInvoiceData(hasItems) {
    const invoiceData = document.getElementById('invoiceData');

    if (!hasItems) {
        invoiceData.innerHTML = '';
        return;
    }

    const netTotal = netInvoice();
    const invoice = sumInvoice();

    invoiceData.innerHTML = `
        <div>
            <p>Netto: ${netTotal} €</p>
            <p>Lieferung: ${invoice.shippingCost === "0.00" ? "gratis" : `${invoice.shippingCost} €`}</p>
            <p><strong>Gesamtpreis: ${invoice.total} €</strong></p>
        </div>
        <div>
        <button id="orderBtn">bestellen</button>
        </div>
    `;
}


// Entfernt das Essen komplett aus dem Warenkorb
function removeMeal(category, index) {
    const meal = meals[0][category][index];
    meal.amount = 0; // Menge auf 0 setzen, um das Gericht zu entfernen
    updateCartDisplay();
}