import { useDispatch } from "react-redux"
import Anecdotes from "./components/Anecdote"
import Filter from "./components/Filter"
import NewAnecdote from "./components/NewAnecdote"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <Anecdotes />
      <NewAnecdote />
      
    </div>
  )
}

export default App