import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import Togglable  from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes - a.likes)
      setBlogs(blogs)
    }).catch(error => {})
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleBlog =  (blog) => {

    blogService.create(blog)
      .then(returned => {
        returned.user = user
        setBlogs(blogs.concat(returned).sort((a,b) => b.likes - a.likes))
        setErrorMessage(`new blog added ${returned.title} by ${returned.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      }).catch(exception => {
        setErrorMessage(`${exception}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000) })


  }

  const handleBlogUpdate = (blog) => {
    blogService.updateLikes(blog)

      .then(returned => {
        const place = blogs.findIndex(element => element.id === returned.id)
        const name = blogs[place].user
        let out = blogs
        returned.user = name
        out[place] = returned
        out.sort((a,b) => b.likes - a.likes)
        console.log(blogs)
        console.log(out)

        setBlogs(out)
        setErrorMessage(`Blog Liked ${returned.title} by ${returned.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      }).catch(exception => {
        setErrorMessage(`${exception}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 1000) })


  }

  const handlelogin  = (userIn) => {
    loginService.login(userIn).then( returned => {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(returned))
      blogService.setToken(returned.token)
      setUser(returned)
    }
    ).catch (exception => {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }



  const handleDelete = (blog) => {
    console.log(blog.id)
    const ok = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (ok) {
      blogService.remove(blog.id).then( returned => {
        setBlogs(blogs.filter(p => p.id !== blog.id))
        setErrorMessage(`Removed ${blog.title} by ${blog.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }).catch(() => {
        setBlogs(blogs.filter(p => p.id !== blog.id))
      })
    }
  }

  if (!user){
    return (
      <div>
        <h1>Log in to application</h1>
        <Notification type={'error'} message={errorMessage}/>
        <LoginForm login={handlelogin}/>
      </div>
    )}else if(user){
    return(
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} type={'normal'} />

        <form onSubmit={handleLogout}>
          <p>{user.name} logged in <button type="logout">logout</button></p>
        </form>

        <Togglable buttonLabel="Create a new blog"  buttonLabelClose="cancel">
          <BlogForm createBlog={handleBlog}/>
        </Togglable>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} liker={handleBlogUpdate} deleter={handleDelete} user={user} />
        )}
      </div>)
  }
}

export default App