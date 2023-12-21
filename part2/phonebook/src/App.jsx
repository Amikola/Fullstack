import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'


const App = () => {
  
 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewfilter] = useState("")
  const [newOut, setNewOut] = useState(persons)


  useEffect(() => {
  personService.getAll().then(start => {
    setPersons(start)
    setNewOut(start)
  })

  }, [])

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.map(element =>element.name).indexOf(newName) != -1){
      if (window.confirm(`${newName} is already added to phonebook replace to old number`)){
      
      const place = persons.map(element =>element.name).indexOf(newName)
      const person = persons[place]
      const changedPerson = { ...person, number: newNumber}
      
      personService.update(person.id, changedPerson).then(element =>{
        
        setPersons(persons.map(current => person.id !== current.id ? current : element))
        setNewOut(newOut.map(current => person.id !== current.id ? current : element))
        setNewName('')
        setNewNumber('')

      })
      
      }

    }else{

    const noteObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
      
    }
    personService.create(noteObject).then( response => {
      setPersons(persons.concat(noteObject))
      const filter = newfilter.toLowerCase()
      const out = 
      persons.concat(noteObject).filter(element => element.name.toLowerCase().includes(filter))
      setNewOut(out)
      setNewName('')
      setNewNumber('')
    })
  }
  }

  const deleteName = (person) => {
    if (window.confirm(`Do wou want to delete ${person.name}?`)) {
      
      personService.deleteName(person.id).then(data => {
          const temp = persons.filter(element => element !== person)
          const temp2 = newOut.filter(element => element !== person)
          setPersons(temp)
          setNewOut(temp2)

      })
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
        <Persons key={person.name} persons={newOut} deleteName={deleteName} />
    </div>
  )

}

export default App