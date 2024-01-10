import './index.css'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import UserList from './components/UserList'
import User from "./components/User"
import Navigation from "./components/Navigation"
import Blog from "./components/Blog"


import {useSelector , useDispatch } from 'react-redux'


import blogService from "./services/blogs"
import {setData} from "./reducers/loginReducer"
import BlogList from './components/blogList'

import { useEffect } from 'react'


import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'






const App = () => {
 

  const dispatch = useDispatch()

  


  const user = useSelector(state => state.user)
  

  if (user) {
    console.log("täällä")
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user))
  }


  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setData(user))
        blogService.setToken(user.token)
        
      }
    }, [])


  


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(setData(null))
  }
  

  if (!user){
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification/>
        <LoginForm />
      </div>
    )}else if(user){
    return(
      <Router>
        <h1>blogs</h1>
        <Notification/>
        <Navigation handleLogout={handleLogout}/>
        <Routes>
        <Route path="/users/:id" element={<User/>}/>
        <Route path="/blogs/:id" element={<Blog/>}/>
        <Route path="/" element={<div><BlogForm/> <BlogList/></div>}/>
        <Route path="/users" element={<UserList/>}/>
        </Routes>


      </Router>
      
      )
  }
}

export default App