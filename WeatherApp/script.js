'use strict'

// Containers
const weatherCon = document.querySelector('.weather')
const hourlyWeatherCon = document.querySelector('.hourly-wrapper')

const getLatLon = () => {
  let lat, lon

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude
      lon = position.coords.longitude

      displayWeather(lat, lon)
    })
  }
}
getLatLon()

// API DONT WORK (http not https)
const getCountry = async function (lat, lon) {
  // const res = await fetch(
  //   `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lon}&username=igorglisovic`
  // )
  // const data = await res.json()
  // // Current location
  // const location = data.geonames[0].toponymName
  // // displayWeather(lat, lon, location)
}

const displayWeather = async function (lat, lon) {
  // Getting weather from api
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current_weather=true`,
    { current_weather: true }
  )
  const data = await res.json()

  // Displaying current Temperature
  const curTemp = Math.round(data.current_weather.temperature)
  const wind = Math.round(data.current_weather.windspeed)

  const html = `
        <h2 class="country">Current Location</h2>
        <span class="current-degree">${curTemp}°C</span>
        <span class="wind">💨 ${wind}km/h</span>
    `
  weatherCon.insertAdjacentHTML('afterbegin', html)

  // Getting hourly weather from api
  const hourlyTempsArr = data.hourly.temperature_2m
  const hourlyTimeArr = data.hourly.time

  let curDate = new Date().toISOString()
  curDate = `${curDate.slice(0, 13)}:00`

  let curHour = new Date().getHours()

  let indexBegin
  hourlyTimeArr.forEach((time, i) => {
    if (time === curDate) {
      indexBegin = i + 1
    }
  })

  // Displaying hourly weather
  const indexEnd = indexBegin + 24 - curHour + 23
  for (let i = indexBegin; i <= indexEnd; i++) {
    curHour === 24 ? (curHour = 0) : curHour

    const hourlyDeg = Math.round(hourlyTempsArr[i])

    const hourlyHtml = `
    <div class="hourly">
    <span class="hour">${
      i === indexBegin ? 'Now' : curHour.toString().padStart(2, '0') + 'h'
    }</span>
    <span class="all-day__degree">${hourlyDeg}°C</span>
    </div>
    `
    hourlyWeatherCon.insertAdjacentHTML('beforeend', hourlyHtml)
    curHour++
  }
  hourlyWeatherSlider()
}

const hourlyWeatherSlider = function () {
  // Elements
  const btnRight = document.querySelector('.right-arrow')
  const btnLeft = document.querySelector('.left-arrow')
  const hourlyWeatherElArr = [...hourlyWeatherCon.children]

  // Delete buttons if they are not necessary
  if (hourlyWeatherElArr.length <= 6) {
    btnRight.style.display = 'none'
    btnLeft.style.display = 'none'
  }

  let step = 0
  let i = 0
  btnRight.addEventListener('click', () => {
    if (i === Math.floor(hourlyWeatherElArr.length / 6) - 1)
      btnRight.style.display = 'none'

    step -= 265

    // Move elements to right
    hourlyWeatherElArr.forEach(() => {
      document.documentElement.style.setProperty('--translate', `${step}px`)
    })

    i++
    if (i > 0) btnLeft.style.display = 'block'
  })

  // Not showing btn left on begin
  btnLeft.style.display = 'none'

  btnLeft.addEventListener('click', () => {
    i--

    if (i === 0) btnLeft.style.display = 'none'
    if (i < Math.floor(hourlyWeatherElArr.length / 6))
      btnRight.style.display = 'block'

    step += 265

    // Move elements to left
    hourlyWeatherElArr.forEach(() => {
      document.documentElement.style.setProperty('--translate', `${step}px`)
    })
  })
}
