import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null


const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const updateLikes = async (newObject) => {
  const url = `${baseUrl}/${newObject.id}`

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(url, newObject, config )
  return response.data
}

const remove = async ( target) => {
  const url = `${baseUrl}/${target}`

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(url, config )
  return response.data
}



export default { getAll, create, setToken, updateLikes, remove }