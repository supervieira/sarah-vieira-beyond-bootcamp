const APP_ID = '49d151e7';
const APP_KEY = '486f3eee1c89b97dbc72958c49f4fe6a';
let userInput = '';
const form = document.querySelector('form');
const myIngredients = [];

const printIngredients = (array) => {
    document.getElementById('ingredients').innerHTML = array.map((ingredient) => {
        return `<li>${ingredient.text}</li>`
    })
}

const printMyIngredients = (array) => {
    document.getElementById('my-ingredients').innerHTML = array.map((ingredient, index, array) => {
        return `
            <li>${ingredient}</li>
        `
    })
}

const printRecipes = (array) => {
    document.getElementById('recipes').innerHTML = array.map((recipe, index, array) => {
        return `
                <li class="recipe" id="recipe">
                    <img src=${recipe.recipe.image} alt=${recipe.recipe.label}/>

                    <a class="recipe-details wrapper" target="_blank">
                        <h2>${recipe.recipe.label}</h2>
                        <p>Calorie count: ${Math.ceil(recipe.recipe.calories)}</p>
                    </a>
                </li>

                <div class="recipe-popup">
                    <div class="recipe-content-container">
                        <h2>${recipe.recipe.label}</h2>
                        <p>Calorie count: ${Math.ceil(recipe.recipe.calories)}</p>
                    </div>

                    <div class="recipe-image-container">
                        <img src=${recipe.recipe.image} alt=${recipe.recipe.label}/>
                        <a class="recipe-details wrapper" href=${recipe.recipe.url} target="_blank">Click here for recipe</a>
                    </div>
                </div>
                `
    })
}

const printRecipePopup = () => {
    console.log('hello');

    document.getElementsByClassName('recipe-popup').classList.add('show');
}

document.querySelector('button').addEventListener('click', (e) => {
    console.log('clicked');

    document.querySelector('main').scrollIntoView();
})

document.querySelector('input').addEventListener('input', (e) => {
    userInput = e.target.value;
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`https://api.edamam.com/search?q=${userInput}&app_id=${APP_ID}&app_key=${APP_KEY}`)
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

        document.getElementById('recipe').addEventListener('click', (e) => {
            console.log(this);
            console.log(e);
            printRecipePopup();
        })
    })
    
    .catch((error) => {
    // .catch() handles an error
        console.log('Something went wrong.' + error)
    });
});

