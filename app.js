'use strict';

window.addEventListener('DOMContentLoaded', () => {

  const
    hoursElem = document.querySelector('#hours'),
    minutesElem = document.querySelector('#minutes'),
    secondsElem = document.querySelector('#seconds'),
    amPmElem = document.querySelector('.ampm'),

    themeBtn = document.querySelector('#dark'),
    pmBtn = document.querySelector('#pm'),
    clockTypeBtn = document.querySelector('#clockType'),

    cards = document.querySelectorAll('.card'),
    containers = document.querySelectorAll('.clock-body'),
    optionNames = document.querySelectorAll('.option-name'),
    switchers = document.querySelectorAll('.switch');

  let
    now,
    hours,
    minutes,
    seconds;

  showTime();

  const secondsTick = setInterval(() => {
    showTime();
  }, 1000);

  function showTime() {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    turnOnPMMode();
    addZeroBefore();

    hoursElem.innerHTML = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
  }

  function turnOnPMMode() {
    if (localStorage.getItem('isPM') === 'true') {
      if (hours === 12) {
        amPmElem.textContent = 'pm';
      } else if (hours === 0) {
        hours = 12;
        amPmElem.textContent = 'am';
      } else if (hours < 12) {
        amPmElem.textContent = 'am';
      } else if (hours > 12) {
        hours = hours - 12;
        amPmElem.textContent = 'pm';
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
    if (hours === 0) {
      hours = '00';
    }
  }

  initTheme();
  initPMMode();

  function initTheme() {
    if (localStorage.getItem('isDark') === null) {
      localStorage.setItem('isDark', 'false');
    } else if (localStorage.getItem('isDark') === 'true') {
      optionNames[0].textContent = 'Dark Mode';
      toggleTheme();
    }
  }

  function initPMMode() {
    if (localStorage.getItem('isPM') === null) {
      localStorage.setItem('isPM', 'false');
    } else if (localStorage.getItem('isPM') === 'true') {
      pmBtn.classList.toggle('on');
      optionNames[1].textContent = 'AM/PM Mode';
      amPmElem.classList.toggle('hide');
    }
  }

  // Options buttons

  themeBtn.addEventListener('click', changeTheme);
  pmBtn.addEventListener('click', changePMmode);

  function changePMmode() {
    pmBtn.classList.toggle('on');
    amPmElem.classList.toggle('hide');
    if (localStorage.getItem('isPM') === 'true') {
      optionNames[1].textContent = '24H Mode';
      localStorage.setItem('isPM', false);
    } else {
      optionNames[1].textContent = 'AM/PM Mode';
      localStorage.setItem('isPM', true);
    }
    showTime();
  }

  function changeTheme() {
    if (localStorage.getItem('isDark') === 'true') {
      localStorage.setItem('isDark', 'false');
      optionNames[0].textContent = 'Light Mode';
      toggleTheme();
    } else if (localStorage.getItem('isDark') === 'false') {
      localStorage.setItem('isDark', 'true');
      optionNames[0].textContent = 'Dark Mode';
      toggleTheme();
    }
  }

  function toggleTheme() {
    themeBtn.classList.toggle('on');
    amPmElem.classList.toggle('dark');
    cards.forEach(card => {
      card.classList.toggle('dark');
    });
    containers.forEach(container => {
      container.classList.toggle('dark');
    });
    optionNames.forEach(modeTxt => {
      modeTxt.classList.toggle('dark');
    });
    switchers.forEach(switcher => {
      switcher.classList.toggle('dark');
    });
    document.body.classList.toggle('dark');
  }

});