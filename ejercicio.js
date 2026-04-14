
import { inspect } from 'util'
const URL = 'https://jsonplaceholder.typicode.com/'

// Import mockFetch from module
import mockFetch from './mockFetch.js'
// To use the mock, uncomment the following line:
globalThis.fetch = mockFetch

const INFO_LOG = []
const ERRORMSG = 'ERROR'


async function errorHandlingFetch(url) {

  let result = {
    success: false,
    data: null
  }

  try {
    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Http request to ${url} failed, respose code not in 200-299. Current response code ${res.status}`)
    }
    result.data = await res.json()
    result.success = true

  } catch (error) {
    INFO_LOG.push(error)
  }
  return result

}

async function getUser(userId) {

  let { data: userData, success } = await errorHandlingFetch(URL + 'users/' + userId)
  return success
    ? userData.name
    : ERRORMSG

}

async function getAlbums(userId) {
  let { data: albumsData, success } = await errorHandlingFetch(URL + 'users/' + userId + '/albums')

  if (!success) return ERRORMSG

  let photos = albumsData.map(album => getPhotos(album.id))

  photos = await Promise.all(photos)

  let processedAlbums = albumsData.map((item, index) => {
    return {
      title: item.title,
      photos: photos[index]
    }
  })
  return processedAlbums

}

async function getPhotos(albumId) {

  let { data: photosData, success } = await errorHandlingFetch(URL + 'albums/' + albumId + '/photos')
  return success
    ? photosData.map(photo => photo.title)
    : ERRORMSG
}

async function getUserAlbumsAndPhotos(userId) {
  

  const [name, albums] = await Promise.all([getUser(userId), getAlbums(userId)])
  const errors = INFO_LOG.map(item => item)
  INFO_LOG.length = 0

  return {
    data: {
      name,
      albums,
    },
    errors
  }
}

//-----------------------------


let result = await getUserAlbumsAndPhotos(3)

console.log(inspect(result, { depth: null }))