import { useDispatch } from 'react-redux'
import { messageChange } from '../reducers/notificationReducer'
import { createAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {


    const dispatch = useDispatch()

    const addAnecdote = (event) => {
      event.preventDefault()
      const content = event.target.quote.value
      event.target.quote.value = ''
      dispatch(createAnecdote(content)) 
      dispatch(messageChange(`You created ${content}`)) 
    
    }


    return(
    <div>

    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="quote"/></div>
        <button>create</button>
      </form>
    </div>
    
    )



}



export default AnecdoteForm