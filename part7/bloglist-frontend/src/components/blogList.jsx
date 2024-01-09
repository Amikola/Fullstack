import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import Togglable  from './Togglable'
import { deleteBlog, likeBlog} from '../reducers/blogReducer'



const BlogList = ({user}) => { 
    
    const blogs = useSelector(state => state.blogs)
    const user1 = useSelector(state => state.user)

    const dispatch = useDispatch()

    const remove = (blog) => {

        const ok = window.confirm(`Remove ${blog.title} by ${blog.author}`)

        if (ok) {
        console.log(blog)
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`,5))
        }
    }

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


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }




      const InnerButton = ({blog}) => {
        if (!user) {<div></div>}
        if( blog.user.username === user.username){
            return(
            <div>
            <button onClick={() => remove(blog)}>remove</button>
            <br/>
            </div>
            )

        }else{
            <div></div>
        }
      }


    return(
        <div>
            {blogs.map(blog =>
        <div style={blogStyle} className="blog" key={blog.id}>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view" buttonLabelClose="hide" key={blog.id}>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => like(blog)}>like</button> </p>
        <p>{blog.id}</p>
        <p>{blog.user.name}</p>
        <InnerButton blog={blog}/>
       </Togglable>
       
       </div>
        
        )}

        </div>
    )
}


export default BlogList
