'use strict'

import getMovie from './getMovie.js'

const moviesWrapper = document.querySelector('.search-movies')
const peopleWrapper = document.querySelector('.search-people')
const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const searchValueLabel = document.getElementById('search-value')

const searchedMovies = async () => {
  searchForm.addEventListener('submit', async e => {
    e.preventDefault()
    // Clear old values
    let html = ''
    searchValueLabel.innerText = ''
    peopleWrapper.innerHTML = ''
    moviesWrapper.innerHTML = ''

    // If input is not filled
    if (searchInput.value === '') return

    localStorage.setItem('INPUT', searchInput.value)

    // Loading spinner
    moviesWrapper.innerHTML = `
    <div class="lds-ring hidden">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>`
    document.querySelector('.lds-ring').classList.remove('hidden')

    const { search } = await getMovie(
      `https://flixster.p.rapidapi.com/search?query=${searchInput.value}&zipCode=90002&radius=50`,
      moviesWrapper
    )

    const { movies: searchMovies } = search
    const { people: peopleSearch } = search

    // If search not found any element
    if (searchMovies.length === 0 && peopleSearch.length === 0) {
      const htmlNoFound = '<p class="error">No items found.</p>'
      moviesWrapper.insertAdjacentHTML('beforeend', htmlNoFound)
      return
    }

    html = '<h3 class="search-type">Movies:</h3>'
    searchMovies.forEach(movie => {
      const movieImg = movie.posterImage
        ? movie.posterImage.url
        : '../imgs/image-not-found.png'

      html += `
    <div class="card" data-version__id="${movie.emsVersionId}" data-group="search"> 
        <h2 class="movie-title">${movie.name}</h2>
        <img class="movie" src="${movieImg}" alt="${movie.name}" />        
    </div>
        `
    })
    moviesWrapper.insertAdjacentHTML('beforeend', html)

    html = '<h3 class="search-type">People:</h3>'

    console.log(peopleSearch)
    peopleSearch.forEach(person => {
      const personImg = person.headShotImage
        ? person.headShotImage.url
        : '../imgs/image-not-found.png'

      html += `
    <div class="card" data-person__id="${person.id}" data-group="search"> 
        <h2 class="movie-title">${person.name}</h2>
        <img class="person" src="${personImg}" alt="${person.name}" />        
    </div>
        `
    })
    peopleWrapper.insertAdjacentHTML('beforeend', html)
    searchValueLabel.innerText = `Search for: ${searchInput.value}`
  })
}

export default searchedMovies
