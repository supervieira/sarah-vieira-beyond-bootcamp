// Add display none to recipe popup and add class of 'show' on click
// Add 'x' button to popup window
// Add click event to 'x' button and out of focus area that will close popup
// Figure out side scroll in image container of popup

// Variables 
const APP_ID = '49d151e7';
const APP_KEY = '486f3eee1c89b97dbc72958c49f4fe6a';
let userInput = '';
const form = document.querySelector('form');
const myIngredients = [];
let recipeDetails = [];


// Functions
const printIngredients = (array) => {
    document.getElementById('ingredients').innerHTML = array.map((ingredient) => {
        return `<li>${ingredient.text}</li>`
    })
}

const printRecipes = (array) => {
    const printedArray = array.map((recipe, index, array) => {
        return `
                <li class="recipe" id="recipe">
                    <img src=${recipe.recipe.image} alt=${recipe.recipe.label}/>

                    <a class="recipe-details wrapper" target="_blank" id=${index}>
                        <h2>${recipe.recipe.label}</h2>
                        <p>Calorie count: ${Math.ceil(recipe.recipe.calories)}</p>
                    </a>
                </li>
                `
    })

    const printedContent = printedArray.join(' ');
    document.getElementById('recipes').innerHTML = printedContent;

    createRecipeDetailsArray(array);
}

const createRecipeDetailsArray = (array) => {
    array.forEach((item, index, array) => {
        recipeDetails.push(item);
    });
}

const printRecipePopup = (recipeID) => {
    const recipe = recipeDetails[recipeID];
    console.log(recipe);

    const printedHTML = `
        <div class="recipe-content-container">
            <h2>${recipe.recipe.label}</h2>
            <p>Calorie count: ${Math.ceil(recipe.recipe.calories)}</p>
            <ul id='ingredient-${recipeID}'>
            </ul>
        </div>

        <div class="recipe-image-container">
            <img src=${recipe.recipe.image} alt=${recipe.recipe.label} />
            <a class="recipe-details wrapper" href=${recipe.recipe.url} target="_blank">Click here for recipe</a>
        </div>
    `

    document.getElementById('recipe-popup').innerHTML = printedHTML;
    printIngredientList(recipeID);

}

const printIngredientList = (recipeID) => {
    let recipeIngredients = recipeDetails[recipeID].recipe.ingredients;

    recipeIngredients.forEach((item)=>{
        console.log(item.text);
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.text}`
        document.getElementById('ingredient-'+ recipeID).append(listItem);
    });

}


// Event listeners 
document.querySelector('button').addEventListener('click', (e) => {
    document.querySelector('main').scrollIntoView();
})

document.querySelector('input').addEventListener('input', (e) => {
    userInput = e.target.value;
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`https://api.edamam.com/search?q=${userInput}&app_id=${APP_ID}&app_key=${APP_KEY}&to=12`)
    // .fetch() method returns a promise, which can be handled using .then() and .catch()
    
    .then((response) => {
        return response.json();
    })
    
    .then((data) => {
    // .then() handles a successful API call
        myIngredients.push(userInput);
        console.log(myIngredients);
        
        console.log('Success!', data.hits);
        printRecipes(data.hits);
    })
    
    .catch((error) => {
    // .catch() handles an error
        console.log('Something went wrong.' + error)
    });
});

document.querySelector('.recipes').addEventListener('click', (e) => {
    console.log('clicked recipe');
    console.log(e.target.id);
    
    const selectedRecipeID = e.target.id;
    printRecipePopup(selectedRecipeID);
})
