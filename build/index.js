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
document.addEventListener('DOMContentLoaded', getJoke);
if (button) {
    button.addEventListener('click', getJoke);
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
            }
        }
        catch (err) {
            console.log('No se ha encontrado ningun chiste', err);
        }
    });
}
getJoke();
