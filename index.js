// Gitignored API key
import { omdbKey } from './secrets.js'

// Event listener for search button
const searchBtn = document.getElementById("search-btn")
searchBtn.addEventListener("click", searchMovies)


// Search via OMDb.
async function searchMovies() {
  // Get the query
  let searchQuery = document.getElementById("ombd-search").value

  // Call out to the OMDB search API
  const res = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&s=${searchQuery}`)
  const data = await res.json()

  // Create an array of movie IDs from search results and send to render function
  let movieIDArray = await data.Search.map(item => item.imdbID)
  renderSearch(movieIDArray)
}

// Input: Array of IMDB IDs. Output: HTML pushed to the DOM.
async function renderSearch(array) {
  // An array of movie objects
  let movieObjectsArray = []
  let listOfIDs = await array

  // Construct movie object for each search result
  for (let i = 0; i < listOfIDs.length; i++) {
    movieObjectsArray.push(new Movie(listOfIDs[i]))
    //movieObjectsArray[i].retrieveMovieInfo()
  }


  // Add movie info to each object - this could probably be combined with the previous FOR loop
  for (let i = 0; i < movieObjectsArray.length; i++) {
    movieObjectsArray[i] = await movieObjectsArray[i].retrieveMovieInfo()
  }


  // Construct HTML from objects
  let resultsHTML = ""

  console.log(movieObjectsArray[0].Ratings[0])
  for (let i = 0; i < movieObjectsArray.length; i++) {
    resultsHTML += `
      <img src="${movieObjectsArray[i].Poster}" />
      <h2>${movieObjectsArray[i].Title}</h2>
      <img src="img/star.png" /><p>${movieObjectsArray[i].Ratings[0]["Value"]}</p>
    `
  }

  document.getElementById("search-results").innerHTML = resultsHTML
}



// Movie Constructor
// all we need to initialize a new movie is the IMDB ID
class Movie {
  constructor(imdbID) {
    this.ID = imdbID

    // this is returning a promise, not the actual value yet
    this.Info = this.getMovieInfo()
  }

  // Get full movie info
  async getMovieInfo() {
    // Make a call to the OMDB
    const res = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&i=${this.ID}`)
    const data = await res.json()
    //console.log(data.Plot)
    return data
  }

  async retrieveMovieInfo() {
    // awaits for completion (shoutout to https://bytearcher.com/articles/asynchronous-call-in-constructor/)
    const response = await this.Info
    return response
  }

}


// TODO: I need to supply fake data, or have a better failure mechanism when something like ratings don't exist for a movie.