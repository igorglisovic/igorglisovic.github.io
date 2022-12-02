'use strict'

let session = new Session()
session = session.getSession()

if (session !== '') {
  window.location.href = 'SocialNetwork/hexa.html'
}

const btnClose = document.getElementById('btn-close')
const modal = document.querySelector('.register-popup')
const btnOpenModal = document.getElementById('btn-open-modal')
const btnRegister = document.getElementById('btn-register')

btnClose.addEventListener('click', () => {
  modal.classList.add('hidden')
})

btnOpenModal.addEventListener('click', () => {
  modal.classList.remove('hidden')
})

// Validator of Registration Form
const config = {
  'register-name': {
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  'register-email': {
    required: true,
    email: true,
    minlength: 5,
    maxlength: 50,
  },
  'register-password': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'ponovi-password',
  },
  'ponovi-password': {
    required: true,
    minlength: 7,
    maxlength: 25,
    matching: 'register-password',
  },
}
const validator = new Validator(config, '#register-form')

btnRegister.addEventListener('click', e => {
  e.preventDefault()

  if (validator.validationPassed()) {
    const user = new User()
    user.username = document.getElementById('register-name').value
    user.email = document.getElementById('register-email').value
    user.password = document.getElementById('register-password').value
    user.createUser()
  }
})

document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  const user = new User()

  user.email = email
  user.password = password
  user.loginUser()
})
