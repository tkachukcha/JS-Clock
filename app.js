'use strict';

class Figure {
  constructor(name, x, y, element) {
    this.name = name;
    this.element = element;
    this.x = x;
    this.y = y;
    Figure.addFigures(this);
  }
  static addFigures(item) {
    figures.push(item);
  }
  render() {
    const div = document.createElement('div');
    div.innerHTML = `<div id="${this.name}" class="figure"></div>`;
    mainWindow.append(div);
    this.element = document.querySelector(`#${this.name}`);
    this.element.style.left = `${this.x}px`;
    this.element.style.top = `${this.y}px`;
  }
  chooseAndPlay() {
    document.querySelector(`#${this.name}`).addEventListener('click', () => {
      compChoice = random(0, 5);
      if (!clicked) {
        playerChoice = figures.indexOf(this);
        clicked = true;
        play();
      } 
    });
  }
}

class Arrow {
  constructor(x, y, width, angle, idName) {
    this.idName = idName;
    this.x = x;
    this.y = y;
    this.width = width;
    this.angle = angle;
    Arrow.addArrows(this);
  }
  static addArrows(item) {
    arrows.push(item);
  }
  render() {
    const arrow = document.createElement('div');
    const arrowHead = document.createElement('div');
    const arrowBody = document.createElement('div');
    arrow.classList.add('arrow');
    arrowHead.classList.add('arrow-head');
    arrowBody.classList.add('arrow-body');
    arrow.style.left = `${this.x}px`;
    arrow.style.top = `${this.y}px`;
    arrow.style.transform = `rotate(${this.angle}deg)`;
    arrowBody.style.width = `${this.width}px`;
    mainWindow.append(arrow);
    arrow.append(arrowHead);
    arrow.append(arrowBody);
    arrow.classList.add('hide');
    arrow.id = this.idName;
  }
}

const
  mainWindow = document.querySelector('main'),
  helpBtn = document.querySelector('#help'),
  resetBtn = document.querySelector('#reset'),
  playerText = document.querySelector('#player'),
  compText = document.querySelector('#computer'),
  result = document.querySelector('#result'),
  playerScoreElement = document.querySelector('#playerScore'),
  compScoreElement = document.querySelector('#compScore'),
  imgs = ['assets/img/rock.jpg', 'assets/img/scissors.jpg', 'assets/img/paper.jpg', 'assets/img/lizard.jpg', 'assets/img/spock.jpg', 'assets/img/comp.jpg'],
  winners = [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 2],
    [3, 4],
    [4, 0],
    [4, 1]
  ],
  figures = [],
  rock = new Figure('Rock', 280, 10),
  scissors = new Figure('Scissors', 60, 200),
  paper = new Figure('Paper', 500, 200),
  lizard = new Figure('Lizard', 170, 450),
  spock = new Figure('Spock', 390, 450),
  comp = new Figure('Comp', 280, 250),
  arrows = [],
  rockScissorsArrow = new Arrow(210, 190, 108, -45, 'rockScissors'),
  rockLizardArrow = new Arrow(245, 395, 270, 285, 'rockLizard'),
  paperRockArrow = new Arrow(430, 185, 108, 45, 'paperRock'),
  paperSpockArrow = new Arrow(490, 402, 90, 300, 'paperSpock'),
  scissorsPaperArrow = new Arrow(400, 282, 260, 180, 'scissorsPaper'),
  scissorsLizardArrow = new Arrow(155, 400, 90, 240, 'scissorsLizard'),
  lizardSpock = new Arrow(290, 530, 40, 180, 'lizardSpock'),
  lizardPaper = new Arrow(420, 360, 230, 145, 'lizardPaper'),
  spockRockArrow = new Arrow(350, 232, 270, 75, 'spockRock'),
  spockScissorsArrow = new Arrow(220, 360, 230, 37, 'spockScissors');

let compChoice,
    playerChoice,
    playerScore = 0,
    compScore = 0,
    clicked = false;

// Rendering Figures

figures.forEach(elem => {
  elem.render();
  if (figures.indexOf(elem) < figures.length - 1) {
    elem.chooseAndPlay();
  } else if (figures.indexOf(elem) == figures.length - 1) {
    elem.element.classList.add('hide');
  }
});

// Rendering Arrows

arrows.forEach(item => {
  item.render();
});

// Show Hints

helpBtn.addEventListener('mouseenter', showAllArrows);
helpBtn.addEventListener('mouseleave', showAllArrows);

// Reset scores 

resetBtn.addEventListener('click', () => {
  playerScore = 0;
  compScore = 0;
  compScoreElement.textContent = compScore;
  playerScoreElement.textContent = playerScore;
});

function play() {
  figures[5].element.classList.add('play');
  figures[5].element.classList.remove(`hide`);
  setTimeout(() => {
    figures[5].element.style.backgroundImage = `url(${imgs[compChoice]})`;
    if (playerChoice === compChoice) {
      result.textContent = `It's a tie!`;
    } else {
      let fight = [playerChoice, compChoice];

      winners.forEach(pair => {
        if (fight[0] === pair[0] && fight[1] === pair[1]) {
          result.textContent = `${figures[playerChoice].name} beats ${figures[compChoice].name}: You win!`;
          figures[playerChoice].element.classList.add('green');
          figures[5].element.classList.add('red');
          playerScore++;
          playerScoreElement.textContent = playerScore;
        } else if (fight[1] === pair[0] && fight[0] === pair[1]) {
          result.textContent = `${figures[compChoice].name} beats ${figures[playerChoice].name}: Computer wins!`;
          figures[playerChoice].element.classList.add('red');
          figures[5].element.classList.add('green');
          compScore++;
          compScoreElement.textContent = compScore;
        }
      });
    }
    resetStyles(2000);
  }, 2000);
}

function resetStyles(delay) {
  setTimeout(() => {
    figures[playerChoice].element.classList.remove('red');
    figures[playerChoice].element.classList.remove('green');
    figures[5].element.classList.remove('red');
    figures[5].element.classList.remove('green');
    figures[5].element.classList.toggle(`hide`);
    figures[5].element.style.backgroundImage = `url(${imgs[5]})`;
    result.textContent = ``;
    clicked = false;
  }, delay);
}

function random(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

function showAllArrows() {
  const arrows = document.querySelectorAll('.arrow');
  for (let arrow of arrows) {
    arrow.classList.toggle('hide');
  }
}