'use strict'

import getMovie from './getMovie.js'
import slider from './slider.js'

let popularHtml = '',
  translate

const popularMovies = async function (container, VERSION_ID) {
  translate = '--translate-popular'
  let { popularity: popular } = await getMovie(
    'https://flixster.p.rapidapi.com/movies/get-popularity?zipCode=90002&radius=50',
    container
  )

  popular = popular.filter((_, idx) => idx < 15)

  if (VERSION_ID) {
    popular = popular.filter(movie => movie.emsVersionId !== VERSION_ID)
    translate = '--translate-related'
  }

  popular.forEach(movie => {
    popularHtml += `
            <div class="card" data-version__id="${movie.emsVersionId}" data-group="popular">
                <h2 class="movie-title">${movie.name}</h2>
                <img class="movie" src="${movie.posterImage.url}" alt="${movie.name}" />
            </div>
                `
  })
  container.insertAdjacentHTML('beforeend', popularHtml)

  const btnRight = container.querySelector('.right-arrow')
  const btnLeft = container.querySelector('.left-arrow')

  slider(btnLeft, btnRight, popular, translate, 5, 1175)
}

export default popularMovies
