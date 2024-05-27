console.log('script running')

const button = document.getElementById("getJokebtn") as HTMLButtonElement;
const jokeText = document.getElementById("joke") as HTMLParagraphElement;
const API = 'https://icanhazdadjoke.com/'

interface Joke {
  joke: string;
  score: number;
  date: string;
}

let currentJoke: Joke | null = null;

document.addEventListener('DOMContentLoaded', getJoke)

if (button) {
  button.addEventListener('click', () => {
    if (currentJoke && currentJoke.score !== 0) {
      reportJokes.push(currentJoke);
      console.log(reportJokes);
      currentJoke = null;
    }
    getJoke();
  })
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
      currentJoke = { joke: jokeObject.joke, score: 0, date: "" };
    }
  } catch (err) {
      console.log('No se ha encontrado ningun chiste', err);
  }
}

const reportJokes: Joke[] = [];

const emoji1 = document.getElementById("score1") as HTMLButtonElement;
const emoji2 = document.getElementById("score2") as HTMLButtonElement;
const emoji3 = document.getElementById("score3") as HTMLButtonElement;

function assignScore(score:number):void{
  const date = new Date().toISOString();
  if (currentJoke) {
    currentJoke.score = score;
    currentJoke.date = date;
  }
}

if (emoji1) {
emoji1.addEventListener("click", () => assignScore(1))
}
if (emoji2) {
emoji2.addEventListener("click", () => assignScore(2))
}
if (emoji3) {
emoji3.addEventListener("click", () => assignScore(3))
}
