const Notification = ({ message, type}) => {
  if (message === null) {
    return null
  }
  if (type === "error"){
  return (
    <div className="error">
      {message}
    </div>
  )}else if(type === "normal"){
    console.log("Normaali")
    return(
    <div className="normal">
      {message}
    </div>
    )
  }
}

export default Notification