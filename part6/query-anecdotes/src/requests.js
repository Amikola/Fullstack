import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = () => {
    return(axios.get(baseUrl).then(res => res.data))}


export const createAnecdote = newAnecdote =>  
    axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdotes = updateAnecdote =>
    axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data)