import './App.css';
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [searchEntry, setSearchEntry] = useState('');

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
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={searchEntry} onChange={(e)=>{setSearchEntry(e.target.value)}} /> </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div> name: <input value={newName} onChange={(e)=>{setNewName(e.target.value)}} /> </div>
        <div> number: <input value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(x=>x.name.includes(searchEntry)).map(x=><p key={x.name}>{x.name} {x.number}</p>)}
    </div>
  )
}

export default App