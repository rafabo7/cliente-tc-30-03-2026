
import { inspect } from 'util'
const URL = 'https://jsonplaceholder.typicode.com/'

// Import mockFetch from module
import mockFetch from './mockFetch.js'
// To use the mock, uncomment the following line:
globalThis.fetch = mockFetch


async function errorHandlingFetch(url) {


    let res = await fetch(url)
    if (!res.ok) throw new Error(`Http request to ${url} did not return response code in range 200-299.\nResponse code ${res.status}`)
    return await res.json()

}

async function getUser(userId) {

  let user = await errorHandlingFetch(URL + 'users/' + userId)

  return user.name

}

async function getAlbums(userId) {
  let albumsRaw = await errorHandlingFetch(URL + 'users/' + userId + '/albums')

  let albumsTitles = albumsRaw.map(album => album.title)

  let photos = albumsRaw.map(album => getPhotos(album.id))

  photos = await Promise.all(photos)
  let processedAlbums = albumsTitles.map((title, index) => {
    return {
      title,
      photos: photos[index]
    }
  })
  return processedAlbums

}

async function getPhotos(albumId) {

  let photos = await errorHandlingFetch(URL + 'albums/' + albumId + '/photos')
  let photosTitles = photos.map(photo => photo.title)

  return photosTitles
}

async function getUserAlbumsAndPhotos(userId) {

  const [name, albums] = await Promise.all([getUser(userId), getAlbums(userId)])

  return {
    name,
    albums
  }
}

//-----------------------------

try {
  let result = await getUserAlbumsAndPhotos(1)
  console.log(inspect(result, { depth: null }))

} catch (error) {
  console.log('No se han podido obtener los datos')
  console.log(error)
}



