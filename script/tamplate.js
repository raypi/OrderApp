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