import './index.css'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import Togglable  from './components/Togglable'

import {useSelector } from 'react-redux'


import BlogList from './components/blogList'



const App = () => {
 

  const user = useSelector(state => state.user)


  


  

  if (!user){
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification/>
        <LoginForm />
      </div>
    )}else if(user){
    return(
      <div>
        <h2>blogs</h2>
        <Notification/>

        <form onSubmit={() => console.log("ulos") }>
          <p>{user.name} logged in <button type="logout">logout</button></p>
        </form>

        <Togglable buttonLabel="Create a new blog"  buttonLabelClose="cancel">
          <BlogForm />
        </Togglable>
        <br/>
        <BlogList user={user}/>

      </div>)
  }
}

export default App