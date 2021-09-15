'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const hoursElem = document.querySelector('#hours'),
    minutesElem = document.querySelector('#minutes'),
    secondsElem = document.querySelector('#seconds'),
    darkBtn = document.querySelector('#dark'),
    cards = document.querySelectorAll('.card'),
    containers = document.querySelectorAll('.container');
  let now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds(),
    isDark = false;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
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
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }

    hoursElem.textContent = `${hours}`;
    minutesElem.textContent = `${minutes}`;
    secondsElem.textContent = `${seconds}`;
  }, 1000);

  darkBtn.addEventListener('click', changeTheme);

  function changeTheme() {
    darkBtn.classList.toggle('dark');
    if (isDark) {
      darkBtn.textContent = 'Dark';
      isDark = false;
    } else {
      darkBtn.textContent = 'Light';
      isDark = true;
    }
    cards.forEach(card => {
      card.classList.toggle('dark');
    });
    containers.forEach(container => {
      container.classList.toggle('dark');
    });
    document.body.classList.toggle('dark');
  }

});