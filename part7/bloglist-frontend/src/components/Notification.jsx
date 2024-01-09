import { useSelector, useDispatch } from 'react-redux'




const Notification = () => {

  const notification = useSelector(state => state.message)

 
  if (notification !== null){

  let classType = 'normal'

  console.log(notification)
  if (notification.includes("Error")) {classType = 'error'}
    
  return (
    <div className={classType}>
      {notification}
    </div>
  )
  }else{<div></div>}
}

export default Notification