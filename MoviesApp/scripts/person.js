'use strict'

import getPerson from '../functions/getPerson.js'
import events from '../functions/events.js'
import slider from '../functions/slider.js'

const personWrapper = document.querySelector('.person-wrapper')

const id = localStorage.getItem('PERSON_ID')

let html2 = ''
const displayPerson = async () => {
  const { person } = await getPerson(id, personWrapper)
  console.log(person)

  const { filmography: movies } = person

  const personImg = person.headShotImage
    ? person.headShotImage.url
    : './imgs/image-not-found.png'

  const html = ` 
  <div class="person-info">
    <div class="person-img">
      <img id="person-img" src="${personImg}" />
    </div>
    <div class="person-desc">
        <h1 id="person-title">${person.name}</h1>
        <div class="person-release__wrapper">
        <span id="person-release">${
          person.birthDate ? person.birthDate : "No person's birth date found."
        }</span>
        <span href="/person.html" id="person-director">${
          person.birthPlace
            ? person.birthPlace
            : "No person's birth place found."
        }</span>
        </div>
        <span id="person-full__description">${
          person.biography ? person.biography : "No person's bio found."
        }</span>
        <div class="movies-person__films">
            <button class="right-arrow">></button>
            <button class="left-arrow"><</button>
        </div>
    </div>
  </div>`
  personWrapper.insertAdjacentHTML('afterbegin', html)

  if (movies) {
    movies.forEach(movie => {
      const movieImg = movie.posterImage
        ? movie.posterImage.url
        : './imgs/image-not-found.png'
      html2 += `
    <div class="card" data-version__id="${movie.emsVersionId}" data-group="person-films">
        <h2 class="movie-title">${movie.name}</h2>
        <img class="movie" src="${movieImg}" alt="${movie.name}" />
    </div>`
    })

    document
      .querySelector('.movies-person__films')
      .insertAdjacentHTML('beforeend', html2)

    const btnRight = personWrapper.querySelector('.right-arrow')
    const btnLeft = personWrapper.querySelector('.left-arrow')

    slider(btnLeft, btnRight, movies, '--translate-person', 4, 775)
  }
}
displayPerson()

events()
