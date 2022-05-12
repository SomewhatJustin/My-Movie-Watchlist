import { omdbKey } from './secrets.js'

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
    return data
  }

  async retrieveMovieInfo() {
    // awaits for completion (shoutout to https://bytearcher.com/articles/asynchronous-call-in-constructor/)
    const response = await this.Info
    return response
  }

}

export { Movie }