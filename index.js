// Gitignored API key
import { omdbKey } from './secrets.js'
import { Movie } from './movie.js'

// Global Variables
let movieResultsArray = []

let wishList = []
if (localStorage.getItem('watchList')) {
  wishList = localStorage.getItem('watchList').replace(/["]+/g, '').split(",")
}

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
  let listOfIDs = await array


  // Clear results if they already exist
  let resultsHTML = ""
  document.getElementById("search-results").innerHTML = resultsHTML
  movieResultsArray = []

  // Construct movie object for each search result
  for (let i = 0; i < listOfIDs.length; i++) {
    movieResultsArray.push(new Movie(listOfIDs[i]))
    //movieResultsArray[i].retrieveMovieInfo()
  }


  // Add movie info to each object - this could probably be combined with the previous FOR loop
  for (let i = 0; i < movieResultsArray.length; i++) {
    movieResultsArray[i].Info = await movieResultsArray[i].retrieveMovieInfo()
  }


  // Construct HTML from objects
  resultsHTML = ""

  for (let i = 0; i < movieResultsArray.length; i++) {

    let posterURL = "https://images.unsplash.com/photo-1652284225205-a27fce2b2ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1960&q=80"
    if (movieResultsArray[i].Info.Poster != "N/A") {
      posterURL = movieResultsArray[i].Info.Poster
    }

    let title = "NA"
    if (movieResultsArray[i].Info.Title) {
      title = movieResultsArray[i].Info.Title
    }

    let rating = "NA"
    if (movieResultsArray[i].Info.Ratings[0]) {
      rating = movieResultsArray[i].Info.Ratings[0].Value
    }

    let runtime = "NA"
    if (movieResultsArray[i].Info.Runtime) {
      runtime = movieResultsArray[i].Info.Runtime
    }

    let genre = "unknown genre"
    if (movieResultsArray[i].Info.Genre) {
      genre = movieResultsArray[i].Info.Genre
    }

    let plot = "NA"
    if (movieResultsArray[i].Info.Plot) {
      plot = movieResultsArray[i].Info.Plot
    }

    resultsHTML += `
      <div class="movie-result">
        <img src="${posterURL}"/>
        <h2>${title}</h2>
        <img src="img/star.png" /><p>${rating}</p>
        <p>${runtime}</p>
        <p>${genre}</p>
        <button id="${movieResultsArray[i].ID}" class="watchlist-btn"><img src="img/plus.png" />Watchlist</button>
        <p>${plot}</p>
      </div>
    `
  }

  document.getElementById("search-results").innerHTML = resultsHTML
  addListeners()
}





// Save to Watchlist
// We need to pass in the id of the button so the button's click event will correspond to that particular movie.


// Create a function that executes after search results appear
function addListeners() {
  let allButtons = document.querySelectorAll(".watchlist-btn")

  for (let i = 0; i < allButtons.length; i++) {
    document.getElementById(allButtons[i].id).addEventListener("click", () => addToList(allButtons[i].id))
  }
}

function addToList(movieID) {
  if (wishList.includes(movieID)) {
    console.log("already added!")
  } else {
    wishList.push(movieResultsArray.map(movie => movie.ID).filter(movie => movie === movieID)[0])
    // Save list of IDs to localstorage
    console.log(wishList)
    localStorage.setItem("watchList", wishList)
  }
}
