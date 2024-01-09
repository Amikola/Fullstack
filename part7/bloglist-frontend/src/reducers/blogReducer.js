import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'




const asObject = (title, author, url, user, id) => {
  return {
    title: title, 
    author: author,
    url: url,
    user: user,
    id: id

  }
}

const out = await blogService.getAll()
const initialState = out.sort((a,b) => b.likes - a.likes )




const blogSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    removeBlog (state, action) { 
      console.log(action.payload)
      const id = action.payload
      const changed = state.filter(n => n.id !== id)
      return changed.sort((a,b) => b.likes - a.likes )
   
    

    }, 
    setBlogs(state, action) {      
      return action.payload.sort((a,b) => b.likes - a.likes )  
    },
    appendBlogs(state, action) {
     state.push(action.payload)
    }
 
  }
  
  
  })

  export const { removeBlog, setBlogs, appendBlogs} = blogSlice.actions

  

  export const createBlog= (blog) => {
    return async dispatch => {
      await blogService.create(blog)
      const all =  await blogService.getAll()
      dispatch(setBlogs(all))

    }}

  export const deleteBlog= (id) => {
      return async dispatch => {
        const temp = await blogService.remove(id)
      
        dispatch(removeBlog(id))
  
      }}
  


  export const likeBlog = (blog) => {
    return async dispatch => {
      await blogService.updateLikes(blog)
      const all =  await blogService.getAll()
      dispatch(setBlogs(all))
      
    
    }}

  

  export default blogSlice.reducer