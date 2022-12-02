'use strict'

import getMovie from '../functions/getMovie.js'
import upcomingMovies from '../functions/upcomingMovies.js'
import popularMovies from '../functions/popularMovies.js'
import events from '../functions/events.js'
import searchRelatedMovies from '../functions/searchRelatedMovies.js'

// Elements
const movieWrapper = document.querySelector('.movie-wrapper')
const moviesRelated = document.querySelector('.movies-related')
const overlay = document.querySelector('.overlay')
const btnBack = document.querySelector('.btn-back')
const video = document.querySelector('.trailer-video')

localStorage.removeItem('PERSON_ID')

const displayMovieDescription = async () => {
  const VERSION_ID = localStorage.getItem('VERSION_ID')

  const url = `https://flixster.p.rapidapi.com/movies/detail?emsVersionId=${VERSION_ID}`

  movieWrapper.innerHTML = `
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>`

  const { movie } = await getMovie(url, movieWrapper)

  if (movie.crew[0].id) {
    localStorage.setItem('PERSON_ID', movie.crew[0].id)
  }

  if (movie.trailer) {
    const source = document.createElement('source')

    source.setAttribute('src', movie.trailer.url)
    source.setAttribute('type', 'video/mp4')
    video.appendChild(source)
  } else {
    video.closest('div').removeChild(video)
    const message = '<h3>There is no trailer for this movie.</h3>'
    document
      .querySelector('.trailer-container')
      .insertAdjacentHTML('afterbegin', message)
  }

  movieWrapper.addEventListener('click', e => {
    const el = e.target

    if (
      el.classList.contains('btn-trailer') ||
      el.classList.contains('fa-play')
    ) {
      overlay.classList.remove('hidden')
      if (movie.trailer) video.play()
      setTimeout(() => {
        btnBack.style.transform = 'translateY(0)'
      }, 2000)
    }
  })

  overlay.addEventListener('click', e => {
    const el = e.target

    if (el.classList.contains('overlay') || el.classList.contains('fa-times')) {
      overlay.classList.add('hidden')
      btnBack.style.transform = 'translateY(-130px)'
      if (movie.trailer) video.pause()
    }
  })

  let movieRelease
  if (movie.releaseDate) {
    movieRelease = `${movie.releaseDate.slice(0, 4)}, ${Math.trunc(
      movie.durationMinutes / 60
    )}h ${movie.durationMinutes % 60}m`
  }

  const html = `
  <div class="movie-info">
    <div class="movie-img">
      <img id="movie-img" src="${movie.backgroundImage.url}" />
      <button class="btn-trailer">
        <i class="fa fa-play"></i>
      </button>
    </div>
    <div class="movie-desc">
      <h1 id="movie-title">${movie.name}</h1>
      <div class="movie-release__wrapper">
        <span id="movie-release">${
          movieRelease ? movieRelease : 'No release date found.'
        }</span>
        <span>Directed by:
        <a href="${
          movie.crew[0].id ? '/MoviesApp/person/' : '#'
        }" id="movie-director"> ${movie.directedBy}</a>
        </span>
      </div>
      <span id="movie-full__description">${movie.synopsis}</span>
      <div class="movie-crew"></div>
    </div>
  </div>`

  movieWrapper.insertAdjacentHTML('beforeend', html)

  let crewHtml = ''
  const crew = movie.crew.filter(person => person.name !== movie.directedBy)

  crew.forEach(person => {
    crewHtml += `
          <span class="crew-person">${person.role}: <a class="crew-btn" data-person__id="${person.id}">${person.name}</a></span>
      `
  })

  document
    .querySelector('.movie-crew')
    .insertAdjacentHTML('beforeend', crewHtml)
  return movie
}

const displayRelatedMovies = async () => {
  const { name } = await displayMovieDescription()

  const GROUP = localStorage.getItem('GROUP')
  const VERSION_ID = localStorage.getItem('VERSION_ID')

  if (GROUP === 'upcoming') {
    upcomingMovies(moviesRelated, VERSION_ID)
  }

  if (GROUP === 'popular') {
    popularMovies(moviesRelated, VERSION_ID)
  }

  if (GROUP === 'search') {
    searchRelatedMovies(moviesRelated, VERSION_ID)
  }

  if (GROUP === 'person-films') {
    searchRelatedMovies(moviesRelated, VERSION_ID, name)
  }
}
displayRelatedMovies()
events()
