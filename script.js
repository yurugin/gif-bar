'use strict'

const searchInput = document.querySelector('input')
const rerollButton = document.querySelector('button')
const image = document.querySelector('img')

let searchCache = ''

function setGif(keyword) {
  return fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=oJkxMWdW3cFMOjsng83A2nKcEwFNnKaI&s=${keyword}&weirdness=10`,
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json()
    })
    .then(function (response) {
      const url = response.data.images?.original.url
      if (url) {
        image.src = url
      } else {
        alert('No GIF found. Please try another keyword.')
      }
    })
    .catch(function () {
      alert('Something went wrong. Please try again later.')
    })
}

searchInput.focus()

searchInput.onchange = function ({ target }) {
  const searchValue = target.value
  if (!searchValue) return
  searchCache = searchValue
  setGif(searchValue)
}

rerollButton.onclick = function () {
  if (!searchCache) return
  setGif(searchCache)
}
