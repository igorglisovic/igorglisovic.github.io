'use strict'

import getMovie from './getMovie.js'
import slider from './slider.js'

let moviesHtml = '',
  translate

const searchRelatedMovies = async function (container, VERSION_ID, name) {
  const searchInput = localStorage.getItem('INPUT')
    ? localStorage.getItem('INPUT').slice(0, 5)
    : name.slice(0, 5)

  const { search } = await getMovie(
    `https://flixster.p.rapidapi.com/search?query=${searchInput}&zipCode=90002&radius=50`,
    container
  )

  let { movies } = search


  if (VERSION_ID) {
    movies = movies.filter(movie => movie.emsVersionId !== VERSION_ID)
  }

  if (movies.length === 0) moviesHtml = '<p>No related movies found.</p>'

  movies.forEach(movie => {
    const movieImg = movie.posterImage
      ? movie.posterImage.url
      : '../imgs/image-not-found.png'

    moviesHtml += `
              <div class="card" data-version__id="${movie.emsVersionId}" data-group="movies">
                  <h2 class="movie-title">${movie.name}</h2>
                  <img class="movie" src="${movieImg}" alt="${movie.name}" />
              </div>
                  `
  })
  container.insertAdjacentHTML('beforeend', moviesHtml)

  const btnRight = container.querySelector('.right-arrow')
  const btnLeft = container.querySelector('.left-arrow')

  slider(btnLeft, btnRight, movies, '--translate-related', 5, 1175)
}

export default searchRelatedMovies
