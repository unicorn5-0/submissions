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

const CountriesList = ({name, handleShow}) => {
  return (
    <div>
      {name} <a className="btn" onClick={handleShow} href={`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`}>show</a>
    </div>
  )
}


const Country = ({country}) => {
  const {name, capital, area, languages, flags} = country
  console.log(languages);
  return (
    <div>
      <h1>{name['common']}</h1>
      <p>capital {capital[0]}</p>
      <p>area {area}</p>
      <p>languages:</p>
      {/* <Languages languages={languages} /> */}
      
      <img src={flags['png']} />
      
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

  const handleShow = (e) => {
    e.preventDefault()
    
    axios
    .get(e.target.href)
    .then(res => setFilteredData(res.data))
  }

  console.log(filteredData);

  return (
    
    <div>
      find countries <input value={getCountry} onChange={handleSearch} />
      <Notification message={message} />
      {filteredData.length === 1 ? <Country country={filteredData[0]} /> : filteredData.map((gc, i) => <CountriesList key={i} name={gc.name['common']} handleShow={handleShow}/>)}
    </div>
  )
}

export default App
