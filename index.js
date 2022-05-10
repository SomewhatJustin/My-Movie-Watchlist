// Gitignored API key
import { omdbKey } from './secrets.js'

// Event listener for search button
const searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener("click", searchMovies)

async function searchMovies() {
  // Get the query
  let searchQuery = document.getElementById("ombd-search").value

  // Call out to the OMDB search API
  const res = await fetch(`http://www.omdbapi.com/?apikey=33f8c60d&s=${searchQuery}`)
  const data = await res.json()
  console.log(data)
}

// Movie Constructor
// all we need to initialize a new movie is the IMDB ID

class Movie {
  constructor(imdbID) {
    this.ID = imdbID
  }

  async getMovieInfo() {
    // Make a call to the OMDB
    const res = await fetch(`http://www.omdbapi.com/?apikey=33f8c60d&`)
  }
}