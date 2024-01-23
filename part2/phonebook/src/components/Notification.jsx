const Notification = ({ message, toggleClass }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={toggleClass ? 'success' : 'error'}>
        {message}
      </div>
    )
  }

export default Notification