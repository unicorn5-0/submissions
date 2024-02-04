import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const Anecdotes = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      if (filter === 'ALL') {
        return anecdotes
      }

      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })

    const dispatch = useDispatch()
    
    const vote = (id) => {

      const anecdote = anecdotes.find(a => a.id === id)
      dispatch(addVote(anecdote.id))

      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote.id)}
        />
      )}
      
    </div>
  )
}

export default Anecdotes
