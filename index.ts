console.log('script running')

const button = document.getElementById("getJokebtn");
const jokeText = document.getElementById("joke");
const API = 'https://icanhazdadjoke.com/'

document.addEventListener('DOMContentLoaded', getJoke)

if (button) {
  button.addEventListener('click', getJoke);
}

async function getJoke(): Promise<void> {
  try {
    const jokeResponse = await fetch(API, {
      headers: {
        'Accept': 'application/json',
      }
    })
    const jokeObject: {joke:string} = await jokeResponse.json();
    if (jokeText) {
      jokeText.innerText = jokeObject.joke;
    }
  } catch (err) {
      console.log('No se ha encontrado ningun chiste', err);
  }
}
getJoke();
