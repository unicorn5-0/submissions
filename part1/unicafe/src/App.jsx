import { useState } from 'react'

const Heading = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value}) => {
  return (
      <tr>
        <td>{text} </td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  return (
    <table>
      <tbody>   
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={props.total} />
        <StatisticLine text='average' value={props.average} />
        <StatisticLine text='positive' value={props.positive + ' %'} />
      </tbody>
    </table>
  )
}


function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addToGood = () => {
    setGood(good + 1)
  }

  const addToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addToBad = () => {
    setBad(bad + 1)
  }

  const total = bad + good + neutral
  const average = (good - bad) / total
  const positive =  (good / total) * 100

  return (
    <div>
      <Heading text='give feedback' />
      <Button onClick={addToGood} text='good'/>
      <Button onClick={addToNeutral} text='neutral'/>
      <Button onClick={addToBad} text='bad'/>
      <Heading text='statistics' />
      {total == 0 ? 'No Feedback' : <Statistics bad={bad} good={good} neutral={neutral} total={total} average={average} positive={positive} />}
    </div>
  )
}

export default App
