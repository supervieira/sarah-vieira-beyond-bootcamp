const APP_ID = '49d151e7';
const APP_KEY = '486f3eee1c89b97dbc72958c49f4fe6a';
let userInput = '';
const form = document.querySelector('form');
let recipes = [];

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
    })
    
    .catch((error) => {
    // .catch() handles an error
        console.log('Something went wrong.' + error)
    });
})

