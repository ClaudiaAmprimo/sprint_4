const button = document.getElementById("getJokebtn") as HTMLButtonElement;
const jokeText = document.getElementById("joke") as HTMLParagraphElement;
const time = document.getElementById("tiempo") as HTMLDivElement;
const container = document.getElementById('weather-container') as HTMLDivElement;
const APIDadJokes = 'https://icanhazdadjoke.com/';
const API_KEY_GEO='694ab2bb6e60320e1c3b3933387a66fe'
const API_KEY_WEATHER='70bd3f29288ad5c6f91e38d5ec52a116'
const country_code = 'ES';
const city_name = 'barcelona';
let lon = 0;
let lat = 0;

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
    const jokeResponse = await fetch(APIDadJokes, {
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

async function getCoordinates() {
  const coordinatesResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=1&appid=${API_KEY_GEO}`)
  const coordinatesObject = await coordinatesResponse.json();
  lon = coordinatesObject[0].lon
  lat = coordinatesObject[0].lat
}
async function getWeather() {
  await getCoordinates()
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)
  const weatherObject = await weatherResponse.json();
  let temperatura = weatherObject.main.temp
  let icon = weatherObject.weather[0].icon

  const iconElement = document.createElement('img');
  iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
  iconElement.alt = 'icono de tiempo';
  iconElement.classList.add('weather-icon');

  const temperatureElement = document.createElement('span');
  temperatureElement.innerText = `${temperatura} °C`;
  container.innerHTML = '';
  container.appendChild(iconElement);
  container.appendChild(document.createTextNode(' | '));
  container.appendChild(temperatureElement);
}
getWeather()
