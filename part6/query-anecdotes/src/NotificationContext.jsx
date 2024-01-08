import { createContext , useReducer } from 'react'


const messageReducer = (state, action) => {
    console.log(action.message)
    switch (action.type) {
      case "CHANGE":
        return(action.message)
    
      default:
          return state
    }
  }

const MessageContext = createContext()


export const MessageContextProvider = (props) => {
    
  const [message, messageDispatch] = useReducer(messageReducer, null)
  
    return (
      <MessageContext.Provider value={[message, messageDispatch] }>
        {props.children}
      </MessageContext.Provider>
    )
  }


export default MessageContext