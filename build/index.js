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
const API_KEY_GEO = '694ab2bb6e60320e1c3b3933387a66fe';
const API_KEY_WEATHER = '70bd3f29288ad5c6f91e38d5ec52a116';
const country_code = 'ES';
const city_name = 'barcelona';
let lon = 0;
let lat = 0;
let currentJoke = null;
document.addEventListener('DOMContentLoaded', getJoke);
if (button) {
    button.addEventListener('click', () => {
        if (currentJoke && currentJoke.score !== 0) {
            reportJokes.push(currentJoke);
            console.log(reportJokes);
            currentJoke = null;
        }
        getJoke();
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
            console.log('No se ha encontrado ningun chiste', err);
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
        let temperatura = weatherObject.main.temp;
        let icon = weatherObject.weather[0].icon;
        const iconElement = document.createElement('img');
        iconElement.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconElement.alt = 'icono de tiempo';
        iconElement.classList.add('weather-icon');
        const temperatureElement = document.createElement('span');
        temperatureElement.innerText = `${temperatura} °C`;
        container.innerHTML = '';
        container.appendChild(iconElement);
        container.appendChild(document.createTextNode(' | '));
        container.appendChild(temperatureElement);
    });
}
getWeather();
