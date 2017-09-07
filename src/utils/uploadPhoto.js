export function uploadPhoto(file, parentType, parentId) {
  let data = new FormData()
  data.append('image', file)
  data.append('parentType', parentType)
  data.append('parentId', parentId)

  let headers = new Headers();
  headers.append('authorization', `Bearer ${localStorage.getItem('authenticationToken')}`);

  // use the file endpoint
  return fetch(`${process.env.REACT_APP_API_URL}/photos`, {
    method: 'POST',
    body: data,
    headers: headers
  }).then(response => {
    return response.json()
  })
}
