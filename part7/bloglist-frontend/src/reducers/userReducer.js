import { createSlice } from '@reduxjs/toolkit'
import userService from "../services/users"
import blogService from "../services/blogs"

const initialState = await userService.getAll()


const usersSlice = createSlice({
    name: "users", 
    initialState,
    reducers: {
  
      update(state, action) {
        return action.payload
       
  
    } }
  
  })

  export const { update } = usersSlice.actions

  export const updateUsers = () => {
    return async dispatch => {
      const out = await userService.getAll()
      dispatch(update(out))
    
    }}

    

  export default usersSlice.reducer