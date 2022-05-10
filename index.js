// Gitignored API key
import { omdbKey } from './secrets.js'

// Event listener for search button
const searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener("click", searchMovies)

async function searchMovies() {
  // Get the query
  let searchQuery = document.getElementById("ombd-search").value

  // Call out to the OMDB search API
  const res = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&s=${searchQuery}`)
  const data = await res.json()

  // Create an array of movie IDs from search results and send to render function
  let movieIDArray = data.Search.map(item => item.imdbID)
  renderSearch(movieIDArray)
}

// Input: Array of IMDB IDs. Output: HTML pushed to the DOM.
function renderSearch(array) {
  // An array of movie objects
  let movieObjectsArray = []

  // Construct movie objects for each search result
  for (let i = 0; i < array.length; i++) {
    movieObjectsArray.push(new Movie(array[i]))
  }

  movieObjectsArray[0].getMovieInfo()
}

// Movie Constructor
// all we need to initialize a new movie is the IMDB ID
class Movie {
  constructor(imdbID) {
    this.ID = imdbID
  }

  async getMovieInfo() {
    // Make a call to the OMDB
    const res = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&i=${this.ID}`)
    const data = await res.json()
    console.log(data)
  }
}