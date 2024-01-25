import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import { useEffect } from 'react'
import pesronService from './services/person'
import person from './services/person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [getPerson, setGetPerson] = useState('')
  const [showFiltered, setShowFiltered] = useState([])
  const [responseMessage, setResponseMessage] = useState(null)
  const [toggleClass, setToggleClass] = useState(true)

  useEffect(()=> {
    pesronService
      .getAll()
      .then(initiatlPersons => {
        setPersons(initiatlPersons)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = persons.find(p =>  p.name.toLowerCase() == newName.toLowerCase())
    const changedPerson = {...person, number: newNumber}

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        
        pesronService
          .updatePerson(person.id, changedPerson)
          .then(returnedPerson => setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson)))
          .catch(err => {
            setToggleClass(false)
            setResponseMessage(err.response.data.error)
            setTimeout(()=> {setResponseMessage(null)}, 5000)
          })
          setNewName('')
          setNewNumber('')
      } else {
        setNewName('')
        setNewNumber('') 
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      
      pesronService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('') 
          setToggleClass(true)
          setResponseMessage(`Added ${returnedPerson.name}`)
          setTimeout(()=> {setResponseMessage(null)}, 5000)
        }).catch(err => {
          setResponseMessage(err.response.data.error)
          setTimeout(()=> {setResponseMessage(null)}, 5000)
        })
    }
    

  }

  const handleFilter = (e) => {
    const {value} = e.target
    setGetPerson(value)
  
   
    const filterArray = persons.filter(person => {
     
      const name = person.name.toLowerCase()
      const filterBy = value.toLowerCase()
      return  name.includes(filterBy)
    })

    setShowFiltered(filterArray) 
   
  }

  const handleDelete = (person) => {
    
    if(window.confirm(`Delete ${person.name}?`)) {
      pesronService
        .deletePerson(person.id)
        .then(deletedPerson => setPersons(persons.filter(person => person.id != deletedPerson.id)))
    }
  } 

  const personsToShow = showFiltered.length === 0 ? persons : showFiltered

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={responseMessage} toggleClass={toggleClass}/>
      <Filter value={getPerson} onChange={handleFilter} />
      <h3>Add a new person</h3>
      <PersonForm 
        addPerson={addPerson} newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} name={ person.name } number={ person.number } handleDelete={() => handleDelete(person)} />)}
      
    </div>
  )
}

export default App