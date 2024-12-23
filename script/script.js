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
    mealsContainer.innerHTML = ''; // Container leeren, falls bereits Inhalte vorhanden sind

    // Durch die Kategorien (pizza, noodles, burger) iterieren
    for (const category in meals[0]) {
        const mealCategory = meals[0][category];

        // Jedes Gericht in der aktuellen Kategorie durchlaufen
        mealCategory.forEach((meal, index) => {
            // Neues Div für das gesamte Gericht erstellen
            const maelDiv = document.createElement('div');
            maelDiv.classList.add('maelDiv');

            // Name und Button in ein Div mit der Klasse "mealNameDiv" packen
            const mealNameDiv = document.createElement('div');
            mealNameDiv.classList.add('mealNameDiv');

            const mealName = document.createElement('p');
            mealName.textContent = meal.name;

            const mealButton = document.createElement('img');
            mealButton.classList.add('chartBtn');
            mealButton.id = `${category}-${index}`; // Einzigartige ID basierend auf Kategorie und Index
            mealButton.src = './img/plus.png';
            mealButton.alt = 'button für mehr gerichte';

            // Beschreibung und Preis erstellen
            const descriptionP = document.createElement('p');
            descriptionP.textContent = meal.description;

            const priceP = document.createElement('p');
            priceP.textContent = `${meal.price.toFixed(2)} €`; // Preis mit zwei Nachkommastellen

            // Name und Button in das Div "mealNameDiv" hinzufügen
            mealNameDiv.appendChild(mealName);
            mealNameDiv.appendChild(mealButton);

            // Alle Elemente in das Haupt-Gericht-Div "maelDiv" hinzufügen
            maelDiv.appendChild(mealNameDiv);
            maelDiv.appendChild(descriptionP);
            maelDiv.appendChild(priceP);

            // Gericht-Div in den Hauptcontainer hinzufügen
            mealsContainer.appendChild(maelDiv);
        });
    }
}