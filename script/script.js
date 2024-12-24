// Warenkorb rechts unter dem Header fix
// Warenkorb bekommt Order BTN um Bestellung abzuschliessen, dann Pop Up mit Mitteilung
// mindestens 3 Produkt Kategorien und 3 Produkte je Kategorie [Zusatzaufgabe: Verschiedene Reiter für verschiedene Produkte]
// Jedes Produkt was in den Warenkorb kommt kann mit - oder Plus verändert werden, bei 1 und - verschwindet es aus dem Warenkorb
// es gibt ein Löschen BTN für das Produkt im Warenbkorb
// Bei der Handy APP rutsch der Warenkorb BTN nach Untern, der Angezeigte Warenkorb ist der gleich wie in der Desktop ansicht


// init funktion
function init(){
    renderMeals();
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
