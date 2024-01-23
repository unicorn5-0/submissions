import { useEffect, useState } from "react"
import axios from 'axios'

const Notification = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <p>{message}</p>
  )
}

const Country = ({country}) => {
  
  return (
    <div>
      <h1>{country[0].name['common']}</h1>
      <p>capital {country[0].capital[0]}</p>
      <p>area {country[0].area}</p>
      <p>languages:</p>
      {country[0].languages}
      <img src={country[0].flags['png']} />
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [getCountry, setGetCountry] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(res => setCountries(res.data))
  }, [])

  const handleSearch = (e) => {
    const {value} = e.target 
    setGetCountry(value)

    const filteredCountries = countries.filter(c => c.name['common'].includes(value))
    

    if (filteredCountries.length > 10) {
      setMessage('Too many matches, specify another filter')
      setTimeout(() => { setMessage(null) }, 2000)
      setFilteredData([])
    } else if (filteredCountries.length === 0) {
      setMessage('There is zero matches, specify another filter')
      setTimeout(() => { setMessage(null) }, 2000)
      setFilteredData([])
    } else {
      setFilteredData(filteredCountries)
    }
  }

  console.log(countries)

  return (
    <div>
      find countries <input value={getCountry} onChange={handleSearch} />
      <Notification message={message} />
      {filteredData.length === 1 ? <Country country={filteredData} /> : filteredData.map((gc, i) => <p key={i}>{gc.name['common']}</p>)}
    </div>
  )
}

export default App
