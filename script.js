const APP_ID = '49d151e7';
const APP_KEY = '486f3eee1c89b97dbc72958c49f4fe6a';
let userInput = '';
const form = document.querySelector('form');

const printRecipes = (array) => {
    document.getElementById('recipes').innerHTML = array.map((recipe, index, array) => {
        return `
                <div class="recipe">
                    <h2>${recipe.recipe.label}</h2>
                    <img src=${recipe.recipe.image} alt=${recipe.recipe.label}/>
                    <p>Calorie count: ${Math.ceil(recipe.recipe.calories)}</p>
                    <a href=${recipe.recipe.url} target="_blank">Recipe here</a>
                </div>
                `
    })
}

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
        console.log('Success!', data.hits);
        printRecipes(data.hits);
    })
    
    .catch((error) => {
    // .catch() handles an error
        console.log('Something went wrong.' + error)
    });

})

