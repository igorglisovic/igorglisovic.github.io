'use strict'
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '03d014834emsh6c8106cfb38ee26p1dc470jsn1092b01a1943',
    'X-RapidAPI-Host': 'flixster.p.rapidapi.com',
  },
}
const getMovie = async function (url, container) {
  try {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(
        `${
          res.status === 429
            ? 'API Key expired! The maximum api requests has been reached.'
            : 'Something went wrong'
        }`
      )
    }

    const { data } = await res.json()

    return data
  } catch (err) {
    document.querySelector('.overlay').classList.remove('hidden')
    document.querySelector('.overlay').innerHTML = `<h2>${err}</h2>`
  } finally {
    container.removeChild(container.querySelector('.lds-ring'))
  }
}

export default getMovie
