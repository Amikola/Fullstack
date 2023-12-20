import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewfilter] = useState("")
  const [newOut, setNewOut] = useState(persons)

  


  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(element =>element.name).indexOf(newName) != -1){
      window.alert(`${newName} is already added to phonebook`)

    }else{

    const noteObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(noteObject))
    const filter = newfilter.toLowerCase()
    const out = persons.concat(noteObject).filter(element => element.name.toLowerCase().includes(filter))
    setNewOut(out)
    setNewName('')
    setNewNumber('')
  }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewfilter(event.target.value)
    const filter = event.target.value.toLowerCase()
    const out = persons.filter(element => element.name.toLowerCase().includes(filter))
    setNewOut(out)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter newfilter={newfilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
        <PersonForm 
        addNumber={addNumber} 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
       />
      <h3>Numbers</h3>
        <Persons persons={newOut}/>
    </div>
  )

}

export default App