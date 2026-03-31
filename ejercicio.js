const URL = 'https://jsonplaceholder.typicode.com/'

async function errorHandlingFetch( url ) {
  try {
    let res = await fetch(url)
    if (!res.ok) throw new Error(`Http request to ${url} did not return response code in range 200-299.\nResponse code ${res.status}`)
    return await res.json()

  } catch (error) {
    throw error
  }

}

async function getUsuario(userId) {
  let user = await errorHandlingFetch(URL + 'users/' + userId)
  let userName = user.name

  return userName

}

async function getAlbums(userId) {
  let albumsRaw = await errorHandlingFetch(URL + 'users/' + userId + '/albums')

  let albumsTitles = albumsRaw.map(album => album.title)

  let photos = albumsRaw.map(album => getPhotos(album.id))

  // Version 1: devolviendo array [ { album: photos[] }, {...} ]
  // return Promise.all(photos).then(res => {
  //   return res.map((photo, index) => {
  //     return { [albumsTitles[index]]: photo }
  //   })
  // })

  // Version 2: devolviendo objeto { album : photos[], ... }
  return Promise.all(photos).then(res => {
    let processedAlbums = {}
    res.forEach((photo, index) => {
      processedAlbums[albumsTitles[index]] = photo
    })
    return processedAlbums
  })
}

async function getPhotos(albumId) {

  let photos = await errorHandlingFetch(URL + 'albums/' + albumId + '/photos')
  let photosTitles = photos.map(photo => photo.title)

  return photosTitles
}


function getUserAlbumsAndPhotos(userId) {

  return Promise.all([getUsuario(userId), getAlbums(userId)])
    .then((result) => {
      return {
        'name': result[0],
        'albums': result[1]
      }
    })

}


let result =  await getUserAlbumsAndPhotos(1)

console.log(result)

