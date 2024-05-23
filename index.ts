console.log('script running')

const button = document.getElementById("getJokebtn");
const jokeText = document.getElementById("joke");
const API = 'https://icanhazdadjoke.com/'

document.addEventListener('DOMContentLoaded', getJoke)

if (button) {
  button.addEventListener('click', getJoke);
}

async function getJoke() {
  try {
    const jokeResponse = await fetch(API, {
      headers: {
        'Accept': 'application/json',
      }
    })
    const jokeObject = await jokeResponse.json();
    if (jokeText) {
      jokeText.innerText = jokeObject.joke;
    }
  } catch (err) {
      console.log(err);
  }
}
getJoke();
