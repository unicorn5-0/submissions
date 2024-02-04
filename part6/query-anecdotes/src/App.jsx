import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from './request'
import { useNotifyDispatch } from './context/NotifyContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifyDispatch()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    
    dispatch({ type: 'NOTIFY', payload: `anecdote '${anecdote.content}' voted` })

    setTimeout(() => {
      dispatch({ type: ''})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <div>anecdote servise not available due to problems in server</div>
  }

  const anecdotes = result.data
  console.log(anecdotes);

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
