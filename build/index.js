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
console.log('script running');
const button = document.getElementById("getJokebtn");
const jokeText = document.getElementById("joke");
const API = 'https://icanhazdadjoke.com/';
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
            const jokeResponse = yield fetch(API, {
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
