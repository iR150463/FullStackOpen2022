import './App.css';
import { useState } from 'react'

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
      setPersons(persons.concat({ name: newName, number: newNumber }));
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

const Persons = ({persons, searchEntry}) => {
  return (
    <>
      {persons.filter(x=>x.name.includes(searchEntry)).map(x=><p key={x.name}>{x.name} {x.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);

  const [searchEntry, setSearchEntry] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchEntry={searchEntry} setSearchEntry={setSearchEntry} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchEntry={searchEntry} />
    </div>
  )
}

export default App