'use strict';

window.addEventListener('DOMContentLoaded', () => {

  class Fraction {
    constructor(angle, translate, scale, name, element) {
      this.angle = angle;
      this.translate = translate;
      this.scale = scale;
      this.name = name;
      this.element = element;
    }
    render() {
      const fractionDiv = document.createElement('div');
      fractionDiv.classList.add('fraction');
      analogClock.append(fractionDiv);
      fractionDiv.style.transform = `rotate(${this.angle}deg) translateY(${this.translate}px) scaleY(${this.scale})`;
      if (this.name !== null) {
        fractionDiv.id = this.name;
        this.element = document.querySelector(`#${this.name}`);
      }
    }

  }




  const
    hoursElem = document.querySelector('#hours'),
    minutesElem = document.querySelector('#minutes'),
    secondsElem = document.querySelector('#seconds'),
    amPmElem = document.querySelector('.ampm'),

    themeBtn = document.querySelector('#dark'),
    pmBtn = document.querySelector('#pm'),
    clockTypeBtn = document.querySelector('#clockType'),

    analogClock = document.querySelector('#analogClock'),
    digitalClock = document.querySelector('#digitalClock'),
    cards = document.querySelectorAll('.card'),
    switchers = document.querySelectorAll('.switch'),
    options = document.querySelectorAll('.option'),
    optionNames = document.querySelectorAll('.option-name');

  let
    now,
    hours,
    minutes,
    seconds,
    milliseconds,
    fractions = [];

  const secondsArrow = new Fraction(0, 0, 0.85, 'secondsArrow');
  secondsArrow.render();

  renderFractions();

  function renderFractions() {
    for (let i = 0; i < 120; i += 1) {
      if (i % 2 === 0) {
        fractions.push(new Fraction(i * 3, 137, 0.08));
      } else {
        fractions.push(new Fraction(i * 3, 143, 0.04));
      }
      fractions[i].render();
    }
  }

  showTime();

  const secondsTick = setInterval(() => {
    showTime();
  }, 1000);

  function showTime() {
    getTime();
    turnOnPMMode();
    addZeroBefore();

    hoursElem.innerHTML = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
    secondsArrow.element.style.transform = `rotate(${(seconds*6)+180}deg) translateY(${secondsArrow.translate}px) scaleY(${secondsArrow.scale})`;
  }

  function getTime() {
    now = new Date();
    hours = now.getHours();
    minutes = now.getMinutes();
    seconds = now.getSeconds();
    milliseconds = now.getMilliseconds();
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
  initClockType();

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
      optionNames[2].textContent = 'AM/PM Mode';
      amPmElem.classList.toggle('hide');
    }
  }

  function initClockType() {
    if (localStorage.getItem('isAnalog') === null) {
      localStorage.setItem('isAnalog', 'false');
    } else if (localStorage.getItem('isAnalog') === 'true') {
      clockTypeBtn.classList.toggle('on');
      showAnalogClock();
    }
  }

  // Options buttons

  themeBtn.addEventListener('click', changeTheme);
  pmBtn.addEventListener('click', changePMmode);
  clockTypeBtn.addEventListener('click', changeClockType);

  function changePMmode() {
    pmBtn.classList.toggle('on');
    amPmElem.classList.toggle('hide');
    if (localStorage.getItem('isPM') === 'true') {
      optionNames[2].textContent = '24H Mode';
      localStorage.setItem('isPM', false);
    } else {
      optionNames[2].textContent = 'AM/PM Mode';
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
    document.body.classList.toggle('dark');
    themeBtn.classList.toggle('on');
    amPmElem.classList.toggle('dark');
    digitalClock.classList.toggle('dark');
    cards.forEach(card => {
      card.classList.toggle('dark');
    });
    optionNames.forEach(modeTxt => {
      modeTxt.classList.toggle('dark');
    });
    switchers.forEach(switcher => {
      switcher.classList.toggle('dark');
    });

  }

  function changeClockType() {
    clockTypeBtn.classList.toggle('on');
    if (localStorage.getItem('isAnalog') === 'true') {
      localStorage.setItem('isAnalog', 'false');
      showDigitalClock();
    } else if (localStorage.getItem('isAnalog') === 'false') {
      localStorage.setItem('isAnalog', 'true');
      showAnalogClock();
    }
  }

  function showAnalogClock() {
    optionNames[1].textContent = 'Analog';
    digitalClock.classList.add('hide');
    analogClock.classList.remove('hide');
    options[2].classList.add('hide');

  }

  function showDigitalClock() {
    optionNames[1].textContent = 'Digital';
    digitalClock.classList.remove('hide');
    analogClock.classList.add('hide');
    options[2].classList.remove('hide');
  }

});