import { createSlice } from '@reduxjs/toolkit'
import anecdoteService  from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeAnecdote(state, action) {
      const id = action.payload.id

      return state.map(anecdote => anecdote.id !== id ? anecdote : action.payload)

    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, changeAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  } 
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(anecdote)
    dispatch(appendAnecdote(newAnecdote))   
  }
}

export const addVote = id => {
  return async (dispatch, getState) => {
    const store = getState().anecdotes
  
    const anecdoteToChange = store.find(a => a.id === id)
    
    const changedAnecdote = {
      ...anecdoteToChange, 
      votes: anecdoteToChange.votes + 1
    }

    const newAnecdote = await anecdoteService.updateAnecdote(changedAnecdote)

    dispatch(changeAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer