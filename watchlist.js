import { Movie } from './movie.js'

let WatchList
if (localStorage.getItem('watchList')) {
  WatchList = localStorage.getItem('watchList').replace(/["]+/g, '').split(",")
}

console.log(WatchList)
let movieList = []
// regex courtesy of https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string

console.log(WatchList)
if (WatchList) {
  renderWatchList(WatchList)
}


// Create movie objects from watchlist

// Input: Array of IMDB IDs. Output: HTML pushed to the DOM.
async function renderWatchList(listOfIDs) {
  // Refresh movieList
  movieList = []

  // Construct movie object for each search result
  for (let i = 0; i < listOfIDs.length; i++) {
    movieList.unshift(new Movie(listOfIDs[i]))
  }

  // Add movie info to each object - this could probably be combined with the previous FOR loop
  for (let i = 0; i < movieList.length; i++) {
    movieList[i].Info = await movieList[i].retrieveMovieInfo()
  }


  // Construct HTML from objects
  let watchListHTML = ""
  document.getElementById("watchlist").innerHTML = ""

  for (let i = 0; i < movieList.length; i++) {
    let posterURL = "https://images.unsplash.com/photo-1652284225205-a27fce2b2ba7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1960&q=80"
    if (movieList[i].Info.Poster != "N/A") {
      posterURL = movieList[i].Info.Poster
    }

    let title = "NA"
    if (movieList[i].Info.Title) {
      title = movieList[i].Info.Title
    }

    let rating = "NA"
    if (movieList[i].Info.Ratings[0]) {
      rating = movieList[i].Info.Ratings[0].Value
    }

    let runtime = "NA"
    if (movieList[i].Info.Runtime) {
      runtime = movieList[i].Info.Runtime
    }

    let genre = "unknown genre"
    if (movieList[i].Info.Genre) {
      genre = movieList[i].Info.Genre
    }

    let plot = "NA"
    if (movieList[i].Info.Plot) {
      plot = movieList[i].Info.Plot
    }

    watchListHTML += `
      <div class="movie-result">
        <img src="${posterURL}"/>
        <h2>${title}</h2>
        <img src="img/star.png" /><p>${rating}</p>
        <p>${runtime}</p>
        <p>${genre}</p>
        <button id="${movieList[i].ID}" class="remove-btn"><img src="img/minus.png" />Remove</button>
        <p>${plot}</p>
      </div>
    `
  }


  document.getElementById("watchlist").innerHTML = watchListHTML
  addListeners()
}


// Create a function that executes after search results appear
function addListeners() {
  let allButtons = document.querySelectorAll(".remove-btn")

  for (let i = 0; i < allButtons.length; i++) {
    document.getElementById(allButtons[i].id).addEventListener("click", () => removeFromList(allButtons[i].id))
  }
}

function removeFromList(movieID) {
  WatchList = WatchList.filter(id => id != movieID)
  localStorage.setItem("watchList", WatchList)
  console.log(WatchList)
  renderWatchList(WatchList)
}