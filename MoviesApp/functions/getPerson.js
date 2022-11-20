'use strict'

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '03d014834emsh6c8106cfb38ee26p1dc470jsn1092b01a1943',
    'X-RapidAPI-Host': 'flixster.p.rapidapi.com',
  },
}

const getPerson = async function (id, container) {
  try {
    const res = await fetch(
      `https://flixster.p.rapidapi.com/actors/detail?id=${id}`,
      options
    )

    if (!res.ok) {
      throw new Error(
        `${res.status === 429 ? 'API Key expired!' : 'Something went wrong'}`
      )
    }

    const { data } = await res.json()

    return data
  } catch (err) {
    console.log(err)
    const overlay = document.createElement('div')
    overlay.innerHTML = `<h2>${err}</h2>`

    document.querySelector('body').appendChild(overlay)
  } finally {
    container.removeChild(container.querySelector('.lds-ring'))
  }
}

export default getPerson
