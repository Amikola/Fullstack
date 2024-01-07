import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const messageSlice = createSlice({
    name: "message", 
    initialState,
    reducers: {
  
      messageChange(state, action) {
        console.log(action.payload)
        const content = action.payload
        return content
  
    } }
  
  })
    
  export const { messageChange } = messageSlice.actions
  export default messageSlice.reducer