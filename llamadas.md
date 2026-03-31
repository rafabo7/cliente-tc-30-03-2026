## Usuario
curl -X GET 'https://jsonplaceholder.typicode.com/users/1'

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```



## Albumes
curl -X GET 'https://jsonplaceholder.typicode.com/users/1/albums'

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "quidem molestiae enim"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "sunt qui excepturi placeat culpa"
  },
  ...
]
```

## Photos
curl -X GET 'https://jsonplaceholder.typicode.com/albums/3/photos' \
  --header 'User-Agent: yaak' \
  --header 'Accept: */*'


```json
[
  {
    "albumId": 3,
    "id": 101,
    "title": "incidunt alias vel enim",
    "url": "https://via.placeholder.com/600/e743b",
    "thumbnailUrl": "https://via.placeholder.com/150/e743b"
  },
  {
    "albumId": 3,
    "id": 102,
    "title": "eaque iste corporis tempora vero distinctio consequuntur nisi nesciunt",
    "url": "https://via.placeholder.com/600/a393af",
    "thumbnailUrl": "https://via.placeholder.com/150/a393af"
  },
  ...
]
```
