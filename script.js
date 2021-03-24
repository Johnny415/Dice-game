'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

let scoresFinal, currentScore, activePlayer, playing;

const init = function () {
  scoresFinal = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  player0El.classList.add('player--active');

  current0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;
  score0El.textContent = 0;
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate a random dice roll
    const diceNr = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNr}.png`;

    //3.Check for rolled 1

    if (diceNr !== 1) {
      currentScore += diceNr;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    }
    // Switching player
    else {
      switchPlayer();
    }
  }
});

//Hold the current score
btnHold.addEventListener('click', function () {
  if (playing) {
    scoresFinal[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scoresFinal[activePlayer];
    if (scoresFinal[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

//Game reset
btnNew.addEventListener('click', init);

//---- Modal --------

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnRules = document.querySelector('.btn--rules');
const btnClose = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnRules.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
