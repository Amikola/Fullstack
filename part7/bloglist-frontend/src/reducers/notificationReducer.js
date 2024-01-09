import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
    name: "message", 
    initialState,
    reducers: {
  
      messageChange(state, action) {
        const content = action.payload
        return content
  
    } }
  
  })


export const setNotification = ( message, seconds) => {
    return async dispatch => {
      
      dispatch(messageChange(`${message}`))
      
      setTimeout(() => {
        dispatch(messageChange(null))
      }, seconds*1000)
    
    }}
    
  export const { messageChange } = messageSlice.actions
  export default messageSlice.reducer