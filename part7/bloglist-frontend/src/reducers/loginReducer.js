import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'





let initialState = null


const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
  
      setUser(state, action) {
        return action.payload
  
    } }
  
  })



export const {setUser } = userSlice.actions



export const setLogin = (object) => {
  console.log(object)
  return async dispatch => {
    const out = await loginService.login(object)
    await blogService.setToken(out.token)
    dispatch(setUser(out))
    
  }}

export const setData = (object) => {
    console.log(object)
    return dispatch => {
      dispatch(setUser(object))
    }}


export default userSlice.reducer