import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import {likeBlog} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
    
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id

    const blog = blogs.find(n => n.id === id)

    const like = (blog) => {
        const liked = blog.likes + 1
        const updated = {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: liked,
            id: blog.id
          }

        dispatch(likeBlog(updated))
        dispatch(setNotification(`Liked ${blog.title} by ${blog.author}`,5))
    }


    return(
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>Likes {blog.likes} <button onClick={() => like(blog)}>like</button> </p>
            <p>Added by {blog.user.name}</p>

            <h2>Comments</h2>
        </div>
    )
}

export default Blog