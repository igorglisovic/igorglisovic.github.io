'use strict'

// ♡♥

const mealsContainer = document.getElementById('meals')
const favContainer = document.querySelector('.fav-container')
const modalContainer = document.querySelector('.modal')

const getMeals = async function () {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
  const data = await res.json()
  return data
}
getMeals()

if (!localStorage.getItem('mealIds')) {
  localStorage.setItem('mealIds', JSON.stringify(['']))
}

const getMealsFromLS = function () {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds
}

const addMealToLS = function (mealId) {
  const mealIds = getMealsFromLS()
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

const randomMeal = async () => {
  const [randomMeal] = (await getMeals()).meals

  const html = `
  <div class="meal">
    <div class="random">
      <h2>Random recipe<h2>
    </div>
    
    <div class="meal-body">
      <h2>${randomMeal.strMeal}</h2>
      <button id="btn-fav">♡</button>
    </div>
  </div>
  `
  mealsContainer.insertAdjacentHTML('afterbegin', html)

  document.querySelector(
    '.meal'
  ).style.backgroundImage = `url('${randomMeal.strMealThumb}')`

  document.getElementById('btn-fav').addEventListener('click', () => {
    addMealToLS(randomMeal.idMeal)
    document.location.href = '/RecipeApp/'
  })
}
randomMeal()

const getFavMeals = function () {
  const favMealIds = getMealsFromLS()
  favMealIds.shift()

  favMealIds.forEach(mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(res => res.json())
      .then(data => {
        const favMeal = data.meals[0]

        const htmlFavMeal = `
        <li data-meal_id="${favMeal.idMeal}">
          <img class="fav-item" src="${favMeal.strMealThumb}">
          <span>${favMeal.strMeal}</span>
          <button class="btn-fav-close hidden">❌</button>
        </li>
        `
        favContainer
          .querySelector('ul')
          .insertAdjacentHTML('afterbegin', htmlFavMeal)
      })
  })

  favContainer.querySelector('ul').addEventListener('click', e => {
    if (e.target.classList.contains('fav-item')) {
      const mealId = e.target.closest('li').dataset.meal_id

      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
          const meal = data.meals[0]

          let html = `
          <div class="modal-content">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}">
            <p>${meal.strInstructions}</p>
          </div>
          `
          modalContainer.insertAdjacentHTML('beforeend', html)

          modalContainer.classList.remove('hidden')
        })
    }
  })

  favContainer.querySelector('ul').addEventListener('mouseover', e => {
    if (
      e.target.classList.contains('fav-item') ||
      e.target.classList.contains('btn-fav-close')
    ) {
      e.target.closest('li').querySelector('button').classList.remove('hidden')
    }
  })

  favContainer.querySelector('ul').addEventListener('mouseout', e => {
    if (
      e.target.classList.contains('fav-item') ||
      e.target.classList.contains('btn-fav-close')
    ) {
      e.target.closest('li').querySelector('button').classList.add('hidden')
    }
  })

  favContainer.querySelector('ul').addEventListener('click', e => {
    if (e.target.classList.contains('btn-fav-close')) {
      const clickedMealId = e.target.closest('li').dataset.meal_id
      const mealIds = getMealsFromLS()

      mealIds.splice(mealIds.indexOf(clickedMealId), 1)
      localStorage.setItem('mealIds', JSON.stringify([...mealIds]))

      favContainer
        .querySelector('ul')
        .removeChild(
          favContainer.querySelector(`[data-meal_id="${clickedMealId}"]`)
        )
    }
  })

  // document.querySelector(".btn-fav-close").addEventListener("click", (e) => {})
}
getFavMeals()

modalContainer.querySelector('button').addEventListener('click', () => {
  modalContainer.classList.add('hidden')
  modalContainer.removeChild(modalContainer.lastElementChild)
  console.log(modalContainer.lastChild)
})

document.querySelector('.next-btn').addEventListener('click', () => {
  document.location.href = '/RecipeApp/'
})
