'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const hoursElem = document.querySelector('#hours'),
    minutesElem = document.querySelector('#minutes'),
    secondsElem = document.querySelector('#seconds'),
    darkBtn = document.querySelector('#dark'),
    pmBtn = document.querySelector('#pm'),
    cards = document.querySelectorAll('.card'),
    containers = document.querySelectorAll('.container'),
    modeTxts = document.querySelectorAll('span'),
    switchers = document.querySelectorAll('.switch');
  let now = new Date(),
    hours = now.getHours(),
    minutes = now.getMinutes(),
    seconds = now.getSeconds(),
    isDark = false,
    isPM = false;

  addZeroBefore();

  hoursElem.textContent = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;

  setInterval(() => {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    addZeroBefore();

    hoursElem.textContent = `${hours}`;
    minutesElem.textContent = `${minutes}`;
    secondsElem.textContent = `${seconds}`;
  }, 1000);

  darkBtn.addEventListener('click', changeTheme);
  pmBtn.addEventListener('click', pmModeChange);

  function pmMode() {
    if (isPM) {
      if (hours < 10) {
        
      }
    }
  }

  function addZeroBefore() {
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
  }

  function changeTheme() {
    document.body.classList.toggle('dark');
    darkBtn.classList.toggle('on');
    if (isDark) {
      modeTxts[0].textContent = 'Light Mode';
      isDark = false;
    } else {
      modeTxts[0].textContent = 'Dark Mode';
      isDark = true;
    }
    cards.forEach(card => {
      card.classList.toggle('dark');
    });
    containers.forEach(container => {
      container.classList.toggle('dark');
    });
    modeTxts.forEach(modeTxt => {
      modeTxt.classList.toggle('dark');
    });
    switchers.forEach(switcher => {
      switcher.classList.toggle('dark');
    });
  }

  function pmModeChange() {
    pmBtn.classList.toggle('on');
    if (isPM) {
      modeTxts[1].textContent = '24H Mode';
      isPM = false;
    } else {
      modeTxts[1].textContent = 'AM/PM Mode';
      isPM = true;
    }

  }

});