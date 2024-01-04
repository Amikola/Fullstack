import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <div>
        <h1>Log in to application</h1>
        <Notification message={errorMessage} type={"error"}  />
      </div>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
    const blogsForm = () => (
      <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type={"normal"} />
      <form onSubmit={handleLogout}>
      <p>{user.name} logged in <button type="logout">logout</button></p>
      </form>

      <form onSubmit={handleBlog}>

        <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
        </div>

        <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        </div>
        
        <div>
          url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
        </div>


        <button type="submit">create</button>

      </form>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div> 
    )
  

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(        
        'loggedBlogappUser', JSON.stringify(user)      
        ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const handleBlog  =  (event) => {
    event.preventDefault()
    console.log(title,author,url)
    blogService.create(
      {
        title: title,
        author: author, 
        url: url,

      }).then(returned => {
        setBlogs(blogs.concat(returned))
        setErrorMessage(`a new blog added ${title} by ${author}`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
        setTitle("")
        setAuthor("")
        setUrl("")
        

      })
  
  }
    

  const handleLogout = (event) => {
    event.preventDefault()
    console.log(user)
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }


  return (
    <div>
      {!user && loginForm()} 
      {user && blogsForm()}
    </div>
  )
}

export default App