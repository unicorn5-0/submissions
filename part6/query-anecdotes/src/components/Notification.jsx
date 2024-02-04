import { useContext } from "react"
import NotifyContext, { useNotifyValue } from "../context/NotifyContext"

const Notification = () => {
  const message = useNotifyValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  console.log(message);

  if (message === null) return null

  return (
    <div style={style}>
      { message }
    </div>
  )
}

export default Notification
