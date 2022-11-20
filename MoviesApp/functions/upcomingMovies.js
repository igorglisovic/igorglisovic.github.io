'use strict'

import getMovie from './getMovie.js'
import slider from './slider.js'

let upcomingHtml = '',
  translate

const upcomingMovies = async function (container, VERSION_ID) {
  translate = '--translate-upcoming'
  let { upcoming } = await getMovie(
    'https://flixster.p.rapidapi.com/movies/get-upcoming?countryId=usa&limit=20',
    container
  )

  if (VERSION_ID) {
    upcoming = upcoming.filter(movie => movie.emsVersionId !== VERSION_ID)
    translate = '--translate-related'
  }

  upcoming.forEach(movie => {
    upcomingHtml = `
        <div class="card" data-version__id="${movie.emsVersionId}" data-group="upcoming">
            <h2 class="movie-title">${movie.name}</h2>
            <img class="movie" src="${movie.posterImage.url}" alt="${movie.name}" />
            
        </div>
            `
    container.insertAdjacentHTML('beforeend', upcomingHtml)
  })

  const btnRight = container.querySelector('.right-arrow')
  const btnLeft = container.querySelector('.left-arrow')

  slider(btnLeft, btnRight, upcoming, translate, 5, 1175)
}

export default upcomingMovies
