import { likeAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    let anecdotes = useSelector(state => state.anecdotes.filter(element => element.content.toLowerCase().includes(filter)).sort((a,b) => b.votes - a.votes))
   

    const vote = (anecdote) => {
        
        console.log(anecdote.id)
        dispatch(likeAnecdote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 1))
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