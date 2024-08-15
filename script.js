'use strict'

const searchInput = document.querySelector('input')
const rerollButton = document.querySelector('button')
const image = document.querySelector('img')

let searchCache = ''

async function setGif(keyword) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=oJkxMWdW3cFMOjsng83A2nKcEwFNnKaI&s=${keyword}&weirdness=10`,
      { mode: 'cors' }
    )
    const json = await response.json()
    const imageUrl = await json.data.images?.original.url
    if (!imageUrl) {
      alert('No GIF found. Please try another keyword.')
    } else {
      image.src = imageUrl
    }
  } catch {
    alert('Something went wrong. Please try again later.')
  }
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
