import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({text, votes}) => {
  return (
    <>
      {text}
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const randomIndex = Math.floor(Math.random() * anecdotes.length)
  const [selected, setSelected] = useState(randomIndex)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])
 
  const nextAnecdote = () => {
    setSelected(randomIndex)
  }

//takes index and returns a function which copies the points array and updates the value with the index 
  const addPoint = (i) => () => {
      let pointsCopy = [...points]

      pointsCopy[i] += 1
      
      setPoints(pointsCopy)
    }

  const maxPoints = Math.max(...points);

  return (
    <div>
      <Heading text='Anecdote of the day'/>
      <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      <Button onClick={addPoint(selected)} text='vote' />
      <Button onClick={nextAnecdote} text='next anecdote' />
      <Heading text='Anecdote with the most votes'/>

      {points.map((c, i) => {
        if (c == maxPoints) {
          return <Anecdote key={i} text={anecdotes[i]} votes={c} />
        }
      })}
    </div>
  )
}

export default App