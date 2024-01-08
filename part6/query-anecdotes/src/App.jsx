import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, createAnecdote, updateAnecdotes } from './requests'
import MessageContext from './NotificationContext'
import { useContext } from 'react'





const App = () => {
  
  const [message, dispatch] = useContext(MessageContext)

  const setNotification = ( message, seconds) => {
      dispatch({type:"CHANGE" , message: message})
      
      setTimeout(() => {
        dispatch({type:"CHANGE" , message: null})
      }, seconds*1000)
  }

  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['anecdotes'] })    },
    onError: () => { setNotification(`Must be at least 5 long`, 1)},
  })
  

  const onAdd =  (content) => {

    newAnecdoteMutation.mutate({ content, votes: 0 })
    setNotification(`Added ${content}`, 1)
}


const updateAnecdoteMutation = useMutation({
  mutationFn: updateAnecdotes,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  },
})

  const handleVote = (anecdote) => {
    console.log(anecdote)
    const newer =  anecdote.votes + 1
    updateAnecdoteMutation.mutate({...anecdote, votes: newer})
    setNotification(`Liked ${anecdote.content}`, 1)

  }


  const response = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAll(),
    retry: false
  })

  const anecdotes = response.data


  
  if ( response.status === 'pending')   {    
    return <div>loading data...</div>  }

  if ( response.status === 'error')  {
    return ( <div>Anecdote service not available due to problem with servers</div>)
  }




  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm  add={onAdd}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
