import { Movie } from './movie.js'

let lsWishList = localStorage.getItem('wishList').replace(/["]+/g, '').split(",")
// regex courtesy of https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string

console.log(lsWishList)

// Create movie objects from wishlist
//for (let i = 0; i < )