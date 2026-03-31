const URL = 'https://jsonplaceholder.typicode.com/'

async function getUsuario(id) {
  let res = await fetch(URL + 'users/' + id)
  let user = await res.json()
  let userName = user.name

  let albums = await getAlbums(id)

  return {
    userName,
    albums
  }
}

async function getAlbums(id) {
  let res = await fetch(URL + 'users/' + id + '/albums')
  let albums = await res.json()

  let albumsTitles = []

  albums.forEach(album => {
    albumsTitles.push(album.title)
  })

  return albumsTitles
}

const resultado = await getUsuario(1)
console.log(resultado)
