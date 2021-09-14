'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const hoursElem = document.querySelector('#hours'),
        minutesElem = document.querySelector('#minutes'),
        secondsElem = document.querySelector('#seconds');
  let now = new Date(),
      hours = now.getHours(),
      minutes = now.getMinutes(),
      seconds = now.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  } else if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  hoursElem.textContent = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;

  setInterval(() => {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    if (seconds < 10) {
      seconds = `0${seconds}`;
    } else if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    
    hoursElem.textContent = `${hours}`;
    minutesElem.textContent = `${minutes}`;
    secondsElem.textContent = `${seconds}`;
  }, 1000);

});