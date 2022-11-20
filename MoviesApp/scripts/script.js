'use strict'

import searchedMovies from '../functions/searchedMovies.js'
import upcomingMovies from '../functions/upcomingMovies.js'
import popularMovies from '../functions/popularMovies.js'
import events from '../functions/events.js'

// Elements
const moviesUpcoming = document.querySelector('.movies-upcoming')
const moviesPopular = document.querySelector('.movies-popular')

localStorage.removeItem('VERSION_ID')
localStorage.removeItem('GROUP')
localStorage.removeItem('INPUT')
localStorage.removeItem('PERSON_ID')

searchedMovies()
upcomingMovies(moviesUpcoming)
popularMovies(moviesPopular)
events()
