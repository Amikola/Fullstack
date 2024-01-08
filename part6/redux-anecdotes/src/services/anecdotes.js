import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

const createNew = async (content) => {
  const object = asObject(content)

  const response = await axios.post(baseUrl, object)
  return response.data
}

const like = async (id) => {
  const request = await axios.get(baseUrl)
  const all = request.data
  console.log(id)
  const object = all.filter(element => element.id === id)[0]
  const out = {
    content: object.content,
    id: object.id,
    votes: object.votes + 1
  }


  const response = await axios.put(`${baseUrl}/${out.id}`, out)
  console.log(response.data)
  return response.data
}


 


  export default { getAll, createNew, like}