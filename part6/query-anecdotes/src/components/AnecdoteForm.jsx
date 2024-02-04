import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"
import { useNotifyDispatch } from "../context/NotifyContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifyDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length < 5) {
      dispatch({ type: 'NOTIFY', payload: ` too short anecdote, must have length 5 or more` })

      setTimeout(() => {
        dispatch({ type: ''})
      }, 5000)

      return 
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })

    dispatch({ type: 'NOTIFY', payload: `anecdote '${content}' created.` })

    setTimeout(() => {
      dispatch({ type: ''})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
