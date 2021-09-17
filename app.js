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
    seconds = now.getSeconds();

  
    if (localStorage.getItem('isDark') === null) {
      localStorage.setItem('isDark', 'false');
    } else if (localStorage.getItem('isDark') === 'true') {
    darkBtn.classList.toggle('on');

      darkThemeOn();
    }

  if (localStorage.getItem('isPM') === null) {
    localStorage.setItem('isPM', 'false');
  } else if (localStorage.getItem('isPM') === 'true') {
    pmBtn.classList.toggle('on');
    modeTxts[1].textContent = 'AM/PM Mode';
  }

  pmMode();
  addZeroBefore();

  hoursElem.innerHTML = hours;
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;

  setInterval(() => {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();

    pmMode();
    addZeroBefore();

    hoursElem.innerHTML = `${hours}`;
    minutesElem.textContent = `${minutes}`;
    secondsElem.textContent = `${seconds}`;
  }, 1000);

  darkBtn.addEventListener('click', changeTheme);
  pmBtn.addEventListener('click', pmModeChange);

  function pmMode() {
    if (localStorage.getItem('isPM') === 'true') {
      if (hours === 0) {
        hours = '12<span class="ampm">am</span>';
      } else if (hours === 12) {
        hours += '<span class="ampm">pm</span>';
      } else if (hours < 12) {
        hours += '<span class="ampm">am</span>';
      } else if (hours > 12) {
        hours = hours - 12 + '<span class="ampm">pm</span>';
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
    darkBtn.classList.toggle('on');
    
    if (localStorage.getItem('isDark') === 'true') {
      modeTxts[0].textContent = 'Light Mode';
      localStorage.setItem('isDark','false');
      darkThemeOff();
    } else if (localStorage.getItem('isDark') === 'false') {
      modeTxts[0].textContent = 'Dark Mode';
      
      localStorage.setItem('isDark','true');
      darkThemeOn();
    }
    
  }

  function pmModeChange() {
    pmBtn.classList.toggle('on');
    if (localStorage.getItem('isPM') === 'true') {
      modeTxts[1].textContent = '24H Mode';
      localStorage.setItem('isPM', false);
    } else {
      modeTxts[1].textContent = 'AM/PM Mode';
      localStorage.setItem('isPM', true);
    }
  }

  function darkThemeOn() {
    cards.forEach(card => {
      card.classList.add('dark');
    });
    containers.forEach(container => {
      container.classList.add('dark');
    });
    modeTxts.forEach(modeTxt => {
      modeTxt.classList.add('dark');
    });
    switchers.forEach(switcher => {
      switcher.classList.add('dark');
    });
    document.body.classList.add('dark');
  }

  function darkThemeOff() {
    cards.forEach(card => {
      card.classList.remove('dark');
    });
    containers.forEach(container => {
      container.classList.remove('dark');
    });
    modeTxts.forEach(modeTxt => {
      modeTxt.classList.remove('dark');
    });
    switchers.forEach(switcher => {
      switcher.classList.remove('dark');
    });
    document.body.classList.remove('dark');
  }

});