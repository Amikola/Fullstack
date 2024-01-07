import { useSelector, useDispatch } from 'react-redux'
import {messageChange} from "../reducers/notificationReducer"

const Notification = () => {

  const notification = useSelector(state => state.message)
  const dispatch = useDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification !== null){
    setTimeout(() => {
      dispatch(messageChange(null))
    }, 5000)
    
  return (
    <div style={style}>
      {notification}
    </div>
  )
  }else{<div></div>}
}

export default Notification