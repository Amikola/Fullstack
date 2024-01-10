import {useSelector} from 'react-redux'
import {Link
  } from 'react-router-dom'

const Navigation = ({handleLogout}) => {

    const user = useSelector(state => state.user)

    return(

    <p><Link to="/">blogs</Link> <Link to="/users">users</Link> {user.name} logged in <button onClick={handleLogout}>logout</button></p>
    )
}

export default Navigation