'use strict'

// Creating elements
const diceEl = document.querySelector('.dice')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnNew = document.querySelector('.btn--new')

// Creating variables
let currentScore
let activePlayer
let scores
let playing

const init = function () {
  currentScore = 0
  activePlayer = 0
  scores = [0, 0]
  playing = true

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
  diceEl.classList.add('hidden')
}
init()

const switchPlayer = function () {
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  current0El.textContent = currentScore
  current1El.textContent = currentScore
}

btnRoll.addEventListener('click', () => {
  if (playing) {
    // Creating random number
    let randomDice = Math.trunc(Math.random() * 6) + 1
    diceEl.classList.remove('hidden')
    diceEl.src = `img/dice-${randomDice}.png`

    currentScore += randomDice

    // if dice value is 1
    if (randomDice === 1) {
      switchPlayer()
    }

    // Giving current score to current player
    activePlayer
      ? (current1El.textContent = currentScore)
      : (current0El.textContent = currentScore)
  }
})

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[`${activePlayer}`] += currentScore
    console.log(scores)

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    // Winner
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      diceEl.classList.add('hidden')
      playing = false
    } else {
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
