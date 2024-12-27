function getMealTamplate(category, index, meal) {
    return `
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
}


function getCartDisplayTemplate(category, index, meal) {
    return `
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