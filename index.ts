const button = document.getElementById("getJokebtn") as HTMLButtonElement;
const jokeText = document.getElementById("joke") as HTMLParagraphElement;
const time = document.getElementById("tiempo") as HTMLDivElement;
const container = document.getElementById('weather-container') as HTMLDivElement;
const blob = document.getElementById("blob") as HTMLImageElement;

const APIDadJokes = 'https://icanhazdadjoke.com/';
const APIChuckNorris = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
const API_KEY_GEO:string ='694ab2bb6e60320e1c3b3933387a66fe';
const API_KEY_WEATHER:string ='70bd3f29288ad5c6f91e38d5ec52a116';
const country_code:string = 'ES';
const city_name:string = 'barcelona';
let lon:number = 0;
let lat:number = 0;

interface Joke {
  joke: string;
  score: number;
  date: string;
}

let currentJoke: Joke | null = null;

document.addEventListener('DOMContentLoaded', getRandomJoke)

if (button) {
  button.addEventListener('click', () => {
    if (currentJoke && currentJoke.score !== 0) {
      reportJokes.push(currentJoke);
      console.log(reportJokes);
      currentJoke = null;
    }
    getRandomJoke();
    let num = Math.floor(Math.random() * 7) + 1;
    blob.src = `./images/blob_${num}.svg`
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
      console.error('No se ha encontrado ningun chiste', err);
  }
}
async function getJokeChuck(): Promise<void> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Key': '41a9ad82edmshf08c79787bb5b30p12259cjsne13329d1b597',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(APIChuckNorris, options);
    const result: { value: string } = await response.json();
    if (jokeText) {
      jokeText.innerText = result.value;
      currentJoke = { joke: result.value, score: 0, date: "" };
    }
  } catch (error) {
    console.error('No se ha encontrado ningun chiste', error);
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

function getRandomJoke():void{
  const random = Math.random();
  if (random < 0.5) {
    getJoke();
  } else {
    getJokeChuck();
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

async function getCoordinates(): Promise<void>  {
  const coordinatesResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=1&appid=${API_KEY_GEO}`)
  const coordinatesObject: { lon: number, lat: number }[] = await coordinatesResponse.json();
  lon = coordinatesObject[0].lon
  lat = coordinatesObject[0].lat
}
async function getWeather(): Promise<void>  {
  await getCoordinates()
  const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`)
  const weatherObject: { main: { temp: number }, weather: { icon: string }[] } = await weatherResponse.json();
  let temperatura:number = parseInt(weatherObject.main.temp.toString());
  let icon = weatherObject.weather[0].icon
  container.innerHTML = '';

  const iconElement = document.createElement('img');
  iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
  iconElement.alt = 'icono de tiempo';
  iconElement.classList.add('weather-icon');

  const temperatureElement = document.createElement('span');
  temperatureElement.innerText = `${temperatura} °C`;
  container.appendChild(iconElement);
  container.appendChild(document.createTextNode(' | '));
  container.appendChild(temperatureElement);
}
getWeather()
