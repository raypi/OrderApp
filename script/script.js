// Warenkorb rechts unter dem Header fix
// Warenkorb bekommt Order BTN um Bestellung abzuschliessen, dann Pop Up mit Mitteilung
// mindestens 3 Produkt Kategorien und 3 Produkte je Kategorie [Zusatzaufgabe: Verschiedene Reiter für verschiedene Produkte]
// Jedes Produkt was in den Warenkorb kommt kann mit - oder Plus verändert werden, bei 1 und - verschwindet es aus dem Warenkorb
// es gibt ein Löschen BTN für das Produkt im Warenbkorb
// Bei der Handy APP rutsch der Warenkorb BTN nach Untern, der Angezeigte Warenkorb ist der gleich wie in der Desktop ansicht


// init funktion
function init(){
    renderMeals();
    updateCartDisplay();
}


// Auslesen und Rendern der Gerichte nach Ketegorien
function renderMeals() {
    // Der Container, in dem die Gerichte angezeigt werden sollen
    const mealsContainer = document.getElementById('mealsOverview');
    mealsContainer.innerHTML = ''; // Container leeren

    // HTML-String für alle Gerichte vorbereiten
    let mealsHTML = '';

    // Durch die Kategorien (pizza, noodles, burger) iterieren
    for (const category in meals[0]) {
        const mealCategory = meals[0][category];

        // Jedes Gericht in der aktuellen Kategorie durchlaufen
        mealCategory.forEach((meal, index) => {
            mealsHTML += `
                <div class="maelDiv">
                    <div class="mealNameDiv">
                        <p>${meal.name}</p>
                        <img 
                            class="chartBtn" 
                            id="${category}-${index}" 
                            src="./img/plus.png" 
                            alt="button für mehr gerichte"
                            onclick="addCartItem('${category}', ${index})"
                        >
                    </div>
                    <p>${meal.description}</p>
                    <p>${meal.price.toFixed(2)} €</p>
                </div>
            `;
        });
    }

    // Den vorbereiteten HTML-String in den Container einfügen
    mealsContainer.innerHTML = mealsHTML;
}


// Funktion um aus der Übersicht der Gerichte in den Warenkorb zu verschieben
function addCartItem(category, index) {
    // Zugriff auf das Gericht basierend auf Kategorie und Index
    const meal = meals[0][category][index];

    // Prüfen, ob der Amount 0 ist (nicht im Warenkorb)
    if (meal.amount === 0) {
        meal.amount = 1; // Hinzufügen zum Warenkorb
        console.log(`${meal.name} wurde dem Warenkorb hinzugefügt.`);
    } else {
        // Amount erhöhen, wenn es bereits im Warenkorb ist
        meal.amount += 1;
        console.log(`Die Menge von ${meal.name} wurde auf ${meal.amount} erhöht.`);
    }

    // Details des Gerichts ausgeben
    console.log("Details des ausgewählten Gerichts:");
    console.log(`Gericht: ${meal.name}`);
    console.log(`Beschreibung: ${meal.description}`);
    console.log(`Preis: ${meal.price.toFixed(2)} €`);
    console.log(`Anzahl: ${meal.amount}`);

    // Aufgabe: Rendern des Warenkorbs
    updateCartDisplay();
}


// Ansicht der Gerichte im Warenkorb
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Warenkorb leeren

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
                            class="chartBtn" 
                            src="./img/trash.png" 
                            alt="löschen des gerichtes"
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
}


// Hinzufügen eines Artikels zum Warenkorb
function addCartItem(category, index) {
    const meal = meals[0][category][index];

    meal.amount = (meal.amount || 0) + 1;

    console.log(`${meal.name}: Menge auf ${meal.amount} erhöht.`);

    // Warenkorb aktualisieren
    updateCartDisplay();
}