'use strict'

const inputfunc = function () {
  // "
  if (this.value.length > this.maxLength)
    this.value = this.value.slice(0, this.maxLength)
}

// Elements
const container = document.querySelector('.container')
const circles = document.querySelectorAll('.circle')
const lastCircle = document.querySelector('#circle4')
const inputs = document.querySelectorAll('.input-time')
const btnSubmit = document.querySelector('.btn-submit')
const alertBox = document.querySelector('.alert')
const overlay = document.querySelector('.overlay')
const btnReset = document.querySelector('.btn-reset')
const timerLabels = document.querySelectorAll('.timer-label')

// Variables
let clicked
let clicked2
let clicked3
let id, id2
let timer
let hoursArr = []
let minutesArr = []
let submitBtnEnabled = true
let ukupan = 0

const timer1 = {
  name: 'timer1',
  time: 0, // time in seconds
}

const timer2 = {
  name: 'timer2',
  time: 0, // time in seconds
}

const timer3 = {
  name: 'timer3',
  time: 0, // time in seconds
}

const timer4 = {
  name: 'timer4',
  time: 0, // time in seconds
}

const timers = [timer1, timer2, timer3, timer4]

// Custom Alert box
const showAlert = function (tekst) {
  alertBox.style.transform = 'translateY(0px)'
  alertBox.querySelector('span').textContent = tekst
  submitBtnEnabled = false
}
alertBox.querySelector('button').addEventListener('click', () => {
  alertBox.style.transform = 'translateY(-50px)'
  submitBtnEnabled = true
})

// Resetting app
const resetApp = function () {
  timers.forEach(el => {
    el.time = 0
    el.minutes = 0
    el.hours = 0
  })

  ukupan = 0

  document.querySelectorAll('.sep').forEach(el => {
    el.classList.remove('hidden-2')
  })
  overlay.classList.remove('hidden-2')
  overlay.classList.remove('d-none')
  inputs.forEach(el => {
    el.classList.remove('hidden')
  })

  btnSubmit.classList.remove('hidden-2')
}

const startTimer = function (id, clicked) {
  const tick = () => {
    // Current(clicked) timer
    const current = eval(id)

    current.hours = String(Math.floor(current.time / 3600)).padStart(2, 0)
    current.minutes = String(Math.floor((current.time % 3600) / 60)).padStart(
      2,
      0
    )
    current.seconds = String(Math.floor((current.time % 3600) % 60)).padStart(
      2,
      0
    )

    // When time comes to 0
    if (current.time === 0) {
      clearInterval(timer)
    }

    // Decreasing time
    if (clicked && current.time > 0) {
      current.time--
    }

    // Displaying timer
    document.querySelector(
      `#${id}`
    ).textContent = `${current.hours}:${current.minutes}:${current.seconds}`
  }
  tick()

  const timer = setInterval(tick, 1000)
  return timer
}

// Displaying timer on load
const init = function () {
  timers.forEach(el => {
    el.time = el.hours * 3600 + el.minutes * 60

    ukupan += el.time
  })

  if (ukupan > 86400 || ukupan < 60) {
    showAlert('Ukupno vreme prelazi/ne prelazi 1 dan')
    resetApp()
    return
  }

  timers.forEach(el => {
    const h = String(Math.floor(el.time / 3600)).padStart(2, 0)
    const m = String(Math.floor((el.time % 3600) / 60)).padStart(2, 0)
    const s = String(Math.floor((el.time % 3600) % 60)).padStart(2, 0)
    document.querySelector(`#${el.name}`).textContent = `${h}:${m}:${s}`
  })

  overlay.classList.add('d-none')
}

container.addEventListener('click', e => {
  // Finding clicked button
  if (e.target.classList.contains('circle')) {
    // Making difference between clicked buttons
    if (clicked2)
      id2 = e.target.closest('.routine').querySelector('.timer-label').id
    if (!clicked2)
      id = e.target.closest('.routine').querySelector('.timer-label').id
    clicked2 = !clicked2

    // Adding and removing 'active' class when switching between buttons
    if (id !== id2 && id2) {
      circles.forEach(el => el.classList.remove('active'))
      clicked3 = false
    }
    e.target.classList.add('active')

    // Adding and removing 'active' class when clicking on the same button
    if (id === id2 && id) {
      clicked3 = !clicked3
      if (clicked3) {
        circles.forEach(el => el.classList.remove('active'))
      }
    }

    if (e.target.classList.contains('active')) {
      // Starting timer on clicked circle
      clicked = true

      if (timer) clearInterval(timer)
      timer = startTimer(
        e.target.closest('.routine').querySelector('.timer-label').id,
        clicked
      )

      lastCircle.classList.remove('active')
    } else {
      // Starting timer on last circle
      clicked = true

      if (timer) clearInterval(timer)
      timer = startTimer(document.querySelector('#timer4').id, clicked)

      lastCircle.classList.add('active')
    }
  }
})

btnSubmit.addEventListener('click', e => {
  if (!submitBtnEnabled) return
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      showAlert('Popuni sva polja!')
      return
    }
  }
  for (let k = 1; k < inputs.length; k = k + 2) {
    if (inputs[k].value > 59) {
      showAlert('Broj minuta mora biti manji od 59')
      return
    }
  }

  hoursArr = []
  minutesArr = []

  inputs.forEach(input => {
    if (input.classList.contains('hours')) hoursArr.push(input.value)
    if (input.classList.contains('minutes')) minutesArr.push(input.value)
  })

  timers.forEach((timer, i) => {
    timer.hours = hoursArr[i]
    timer.minutes = minutesArr[i]
  })

  submitBtnEnabled = false
  setTimeout(init, 2400)

  document.querySelectorAll('.sep').forEach(el => {
    el.classList.add('hidden-2')
  })

  overlay.classList.add('hidden-2')
  inputs.forEach(el => {
    el.classList.add('hidden')
  })

  e.target.classList.add('hidden-2')
})

btnReset.addEventListener('click', () => {
  inputs.forEach(el => {
    el.value = ''
  })
  submitBtnEnabled = true
  resetApp()
  circles.forEach(el => el.classList.remove('active'))
  timerLabels.forEach(el => {
    el.textContent = '00:00:00'
  })
  lastCircle.classList.remove('active')
})

document.body.style.zoom = '175%'
