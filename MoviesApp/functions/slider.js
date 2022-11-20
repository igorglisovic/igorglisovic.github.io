'use strict'

const slider = (btnLeft, btnRight, array, translate, cardsToShow, stepInPx) => {
  let step = 0
  let i = 0

  const math =
    array.length % cardsToShow === 0
      ? Math.floor(array.length / cardsToShow) - 2
      : Math.floor(array.length / cardsToShow) - 1

  if (array.length <= cardsToShow) btnRight.style.display = 'none'

  btnRight.addEventListener('click', () => {
    if (i === math) btnRight.style.display = 'none'

    step -= stepInPx

    // Move elements to right
    array.forEach(() => {
      document.documentElement.style.setProperty(translate, `${step}px`)
    })

    i++
    if (i > 0) btnLeft.style.display = 'block'
  })

  // Not showing btn left on begin
  btnLeft.style.display = 'none'

  btnLeft.addEventListener('click', () => {
    i--

    if (i === 0) btnLeft.style.display = 'none'
    if (i < Math.floor(array.length / 5)) btnRight.style.display = 'block'

    step += stepInPx

    // Move elements to left
    array.forEach(() => {
      document.documentElement.style.setProperty(translate, `${step}px`)
    })
  })
}

export default slider
