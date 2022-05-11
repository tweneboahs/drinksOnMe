const start = document.getElementById("start-btn");
const drinkSearch = document.getElementById("drink-input");

start.addEventListener("click", getDrink);

function getIngredients(ingredients, measurements){

    list = "";

    for (let i=0; i<ingredients.length; i++){
       if (measurements[i] === null && ingredients[i]){
           list += `
                <li>${ingredients[i]}</li>
           `
       } else if (measurements[i] !== null && ingredients[i] !== ""){
             list += `
                 <li>${measurements[i] +" "+ ingredients[i]}</li>
            `
        }
    }

    return list
}


function getDrink(e) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkSearch.value}`;

    fetch(url)
        .then(response => response.json())
        .then(function(data){
            const drinksArray = data.drinks;
            console.log(data.drinks)

            //if there is a drink in the API
            const drinksDiv = document.getElementById("drinks");
            let drinkHTML = "";

            //if there is not a drink in the API
            const errorDiv = document.getElementById("error");
            let errorHTML = "";

            if(data.drinks){
                drinksArray.forEach((drinkInfo) =>{

                    //there may be a better way to do this but in the API the ingredients and the instruction 
                    const ingredientArray = [drinkInfo.strIngredient1, drinkInfo.strIngredient2, drinkInfo.strIngredient3, drinkInfo.strIngredient4, drinkInfo.strIngredient5, drinkInfo.strIngredient6, drinkInfo.strIngredient7, drinkInfo.strIngredient8, drinkInfo.strIngredient9, drinkInfo.strIngredient10, drinkInfo.strIngredient11, drinkInfo.strIngredient12, drinkInfo.strIngredient13, drinkInfo.strIngredient14, drinkInfo.strIngredient15];
    
    
                    const measurementArray = [drinkInfo.strMeasure1, drinkInfo.strMeasure2, drinkInfo.strMeasure3, drinkInfo.strMeasure4, drinkInfo.strMeasure5, drinkInfo.strMeasure6, drinkInfo.strMeasure7, drinkInfo.strMeasure8, drinkInfo.strMeasure9, drinkInfo.strMeasure10, drinkInfo.strMeasure11, drinkInfo.strMeasure12, drinkInfo.strMeasure13, drinkInfo.strMeasure14, drinkInfo.strMeasure15]
    
    
                    drinkHTML += `
                        <div class="drink-card">
                            <div class="drink-info-basic">
                                <img class="drink-info-basic-img" src="${drinkInfo.strDrinkThumb}">
                                <h2 class="drink-info-basic-name">${drinkInfo.strDrink}</h2>
                                <div class="drink-info-basic-alcoholic">${drinkInfo.strAlcoholic}</div>
                            </div>
                            <div class="drink-info-howto">
                                <h2 class="drink-info-howto-name">${drinkInfo.strDrink}</h2>
                                <hr/>
                                <h3>Ingredients</h3>
                                <div class="drink-info-howto-ingredients">
                                    ${getIngredients(ingredientArray, measurementArray)}</div>
                                <div class="drink-info-howto-instructions">
                                    <h3>Instructions</h3>
                                    ${drinkInfo.strInstructions}
                                </div>
                             </div>
                        </div>
                    
                    `
                    drinksDiv.innerHTML = drinkHTML;
                    errorHTML = "";
                    errorDiv.innerHTML = errorHTML;
                    drinkSearch.value="";
                })
            } else {
                errorHTML += `
                    <div class="error-message">Sorry, there is no drink named <em>${drinkSearch.value}</em> in this API.</div>
                `
                errorDiv.innerHTML = errorHTML;
                drinkHTML = "";
                drinksDiv.innerHTML = drinkHTML;
                drinkSearch.value="";
            }

            
        })
        .catch(error => console.log(error))

            
}