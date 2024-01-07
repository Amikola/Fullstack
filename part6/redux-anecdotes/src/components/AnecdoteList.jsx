import { likeAnecdote } from '../reducers/anecdoteReducer'
import { messageChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    let anecdotes = useSelector(state => state.anecdotes.filter(element => element.content.toLowerCase().includes(filter)).sort((a,b) => b.votes - a.votes))
   

    const vote = (anecdote) => {
        console.log(anecdote)
        dispatch(likeAnecdote(anecdote.id))
        dispatch(messageChange(`You voted ${anecdote.content}`))
      }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default AnecdoteList