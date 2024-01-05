import Togglable  from './Togglable'


const Blog = ({ blog, liker, deleter }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const updated = {
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    id: blog.id
  }


  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="view" buttonLabelClose="hide">
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => liker(updated)}>like</button> </p>
        <p>{blog.user.name}</p>
        <button onClick={() => deleter(blog)}>remove</button>
        <br/>
      </Togglable>
    </div>
  )
}

export default Blog