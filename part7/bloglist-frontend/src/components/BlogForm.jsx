import { useState } from 'react'
import { createBlog} from '../reducers/blogReducer'
import { updateUsers} from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer'
import Togglable  from './Togglable'

const BlogsForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()


  const addBlog =  (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url
    }))
    dispatch(setNotification(`Blog created ${title} by ${author}`,5))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel="Create a new blog"  buttonLabelClose="cancel">
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
          url:
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>


      <button id='create' type="submit">create</button>

    </form>
    </Togglable>
  )
}
export default BlogsForm