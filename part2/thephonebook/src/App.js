import './App.css';
import { useState, useEffect } from 'react'
import nodeService from './notes'

const Filter = ({searchEntry, setSearchEntry}) => {
  return <div>filter shown with <input value={searchEntry} onChange={(e)=>{setSearchEntry(e.target.value)}} /> </div>
}

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (persons.some(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };

      nodeService.create(newPerson).then(()=>{
        nodeService
          .getAll()
          .then(res => {setPersons(res)})
      })
    }

    setNewName('');
    setNewNumber('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div> name: <input value={newName} onChange={(e)=>{setNewName(e.target.value)}} /> </div>
      <div> number: <input value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}} /> </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, searchEntry, deletePerson}) => {
  return (
    <>
      {persons
        .filter(x=>x.name.includes(searchEntry))
        .map(x=>{
          return (
            <p key={x.name}>
              {x.name} {x.number} <button onClick={()=>{deletePerson(x.id, x.name)}}>Delete</button>
            </p>
          )
        })
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchEntry, setSearchEntry] = useState('');

  useEffect(()=> {
    console.log('effect')
    nodeService
      .getAll()
      .then(res => {setPersons(res)})
  }, [])

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      nodeService
        .deleteById(id)
        .then(()=>{setPersons(persons.filter(p => p.id !== id))})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchEntry={searchEntry} setSearchEntry={setSearchEntry} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchEntry={searchEntry} deletePerson={deletePerson} />
    </div>
  )
}

export default App