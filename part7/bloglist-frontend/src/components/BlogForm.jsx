import { useState } from 'react'
import { createBlog} from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification} from '../reducers/notificationReducer'

const BlogsForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()


  const addBlog = (event) => {
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
  )
}
export default BlogsForm