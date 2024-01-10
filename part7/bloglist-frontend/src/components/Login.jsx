import { useState } from 'react'
import {setLogin} from "../reducers/loginReducer"
import {useDispatch } from 'react-redux'



const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    
    const inside = {
      username: username,
      password: password
    }
    dispatch(setLogin(inside))
    setUsername('')
    setPassword('')
  

  }


  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={ event  => setUsername(event.target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button id='login-button' type="submit">login</button>
    </form>

  )



}

export default LoginForm
