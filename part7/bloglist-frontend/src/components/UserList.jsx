import {useSelector ,useDispatch} from 'react-redux'
import {Link
  } from 'react-router-dom'

const UserList = () => {


    
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)


    return(
        <div>
            <h1>Users</h1>
            <table>
            <tbody>
            <tr>
            <th></th>
            <th>Blogs Created</th>
            </tr>
            {users.map(user => 
                <tr key={user.id}>
                <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
                <td>{blogs.filter(n => n.user.id === user.id).length}</td>
                </tr>      
                )}
            </tbody>
            </table>
        </div>



    )
}

export default UserList