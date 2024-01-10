import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'


const User = () => {


    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const id = useParams().id
    console.log(id)
    const user = users.find(n => n.id === id)
    const blogsOut = blogs.filter(n => n.user.id === user.id)

    if (!user) { return null  }

    return(
        <div>
            <h1>{user.name}</h1>
            <ul>
                {blogsOut.map( blog => 

                <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>

    )

}

export default User