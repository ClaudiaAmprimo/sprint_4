"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const button = document.getElementById("getJokebtn");
const jokeText = document.getElementById("joke");
const time = document.getElementById("tiempo");
const container = document.getElementById('weather-container');
const APIDadJokes = 'https://icanhazdadjoke.com/';
const APIChuckNorris = 'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random';
const API_KEY_GEO = '694ab2bb6e60320e1c3b3933387a66fe';
const API_KEY_WEATHER = '70bd3f29288ad5c6f91e38d5ec52a116';
const country_code = 'ES';
const city_name = 'barcelona';
let lon = 0;
let lat = 0;
let currentJoke = null;
document.addEventListener('DOMContentLoaded', getRandomJoke);
if (button) {
    button.addEventListener('click', () => {
        if (currentJoke && currentJoke.score !== 0) {
            reportJokes.push(currentJoke);
            console.log(reportJokes);
            currentJoke = null;
        }
        getRandomJoke();
    });
}
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jokeResponse = yield fetch(APIDadJokes, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const jokeObject = yield jokeResponse.json();
            if (jokeText) {
                jokeText.innerText = jokeObject.joke;
                currentJoke = { joke: jokeObject.joke, score: 0, date: "" };
            }
        }
        catch (err) {
            console.error('No se ha encontrado ningun chiste', err);
        }
    });
}
function getJokeChuck() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-RapidAPI-Key': '41a9ad82edmshf08c79787bb5b30p12259cjsne13329d1b597',
                'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com'
            }
        };
        try {
            const response = yield fetch(APIChuckNorris, options);
            const result = yield response.json();
            if (jokeText) {
                jokeText.innerText = result.value;
                currentJoke = { joke: result.value, score: 0, date: "" };
            }
        }
        catch (error) {
            console.error('No se ha encontrado ningun chiste', error);
        }
    });
}
const reportJokes = [];
const emoji1 = document.getElementById("score1");
const emoji2 = document.getElementById("score2");
const emoji3 = document.getElementById("score3");
function assignScore(score) {
    const date = new Date().toISOString();
    if (currentJoke) {
        currentJoke.score = score;
        currentJoke.date = date;
    }
}
function getRandomJoke() {
    const random = Math.random();
    if (random < 0.5) {
        getJoke();
    }
    else {
        getJokeChuck();
    }
}
if (emoji1) {
    emoji1.addEventListener("click", () => assignScore(1));
}
if (emoji2) {
    emoji2.addEventListener("click", () => assignScore(2));
}
if (emoji3) {
    emoji3.addEventListener("click", () => assignScore(3));
}
function getCoordinates() {
    return __awaiter(this, void 0, void 0, function* () {
        const coordinatesResponse = yield fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name},${country_code}&limit=1&appid=${API_KEY_GEO}`);
        const coordinatesObject = yield coordinatesResponse.json();
        lon = coordinatesObject[0].lon;
        lat = coordinatesObject[0].lat;
    });
}
function getWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getCoordinates();
        const weatherResponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY_WEATHER}&units=metric`);
        const weatherObject = yield weatherResponse.json();
        let temperatura = parseInt(weatherObject.main.temp.toString());
        let icon = weatherObject.weather[0].icon;
        container.innerHTML = '';
        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconElement.alt = 'icono de tiempo';
        iconElement.classList.add('weather-icon');
        const temperatureElement = document.createElement('span');
        temperatureElement.innerText = `${temperatura} °C`;
        container.appendChild(iconElement);
        container.appendChild(document.createTextNode(' | '));
        container.appendChild(temperatureElement);
    });
}
getWeather();
