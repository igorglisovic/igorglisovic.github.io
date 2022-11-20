'use strict'

const events = () => {
  const body = document.querySelector('body')

  body.addEventListener('mouseover', e => {
    const el = e.target

    if (
      el.classList.contains('movie') ||
      el.classList.contains('movie-title') ||
      el.classList.contains('person')
    ) {
      el.closest('.card').querySelector('img').classList.add('img-hover')
      el.closest('.card').querySelector('h2').classList.add('movie-title-show')
    }
  })

  body.addEventListener('mouseout', e => {
    const el = e.target

    if (
      el.classList.contains('movie') ||
      el.classList.contains('movie-title') ||
      el.classList.contains('person')
    ) {
      el.closest('.card').querySelector('img').classList.remove('img-hover')
      el.closest('.card')
        .querySelector('h2')
        .classList.remove('movie-title-show')
    }
  })

  body.addEventListener('click', e => {
    const el = e.target

    if (el.classList.contains('movie')) {
      const versionId = el.closest('.card').dataset.version__id
      const group = el.closest('.card').dataset.group

      localStorage.setItem('VERSION_ID', versionId)
      localStorage.setItem('GROUP', group)
      location.href = `/movie.html`
    }

    if (el.classList.contains('person')) {
      const id = el.closest('.card').dataset.person__id

      localStorage.setItem('PERSON_ID', id)
      location.href = `/person.html`
    }

    if (el.classList.contains('crew-btn')) {
      const id = el.dataset.person__id

      if (id === 'null') return

      localStorage.setItem('PERSON_ID', id)
      location.href = `/person.html`
    }
  })
}

export default events
