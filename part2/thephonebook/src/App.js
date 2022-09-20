import './App.css';
import { useState, useEffect } from 'react'
import nodeService from './notes'

const Notification = ({ message }) => {
    if (message === null) { return null }

    const className = 'error ' + (message.successful ? "successful" : "unsuccessful");
    return ( <div className={className}>{message.text}</div> )
}

const Filter = ({searchEntry, setSearchEntry}) => {
    return <div>filter shown with <input value={searchEntry} onChange={(e)=>{setSearchEntry(e.target.value)}} /> </div>
}

const PersonForm = ({persons, setPersons, setMessage}) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let p of persons) {
            if (p.name === newName) {
                if ( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ) {
                    nodeService
                    .update(p.id, { name: newName, number: newNumber })
                    .then(()=>{
                        nodeService
                            .getAll()
                            .then(res => {
                                setPersons(res);
                                setNewName('');
                                setNewNumber('');
                            })
                    })
                    .then(()=>{
                        setMessage({ text: "Form updated!", successful: true });
                        setTimeout(()=>{
                            setMessage(null);
                        }, 5000);
                    })
                    .catch(error => {
                        setMessage({ text: `${p.name} is already deleted from the server.`, successful: false });
                        setTimeout(()=>{
                            setMessage(null);
                        }, 5000);
                    })
    
                    return;
                } else {
                    return;
                }
            }
        }

        nodeService
            .create({ name: newName, number: newNumber })
            .then(()=>{
                nodeService
                .getAll()
                .then(res => {
                    setPersons(res);
                    setNewName('');
                    setNewNumber('');
                })
            })
            .then(()=>{
                setMessage({ text: "Person added!", successful: true });
                setTimeout(()=>{
                    setMessage(null);
                }, 5000);
            });
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
    const [message, setMessage] = useState(null)

    useEffect(()=> {
        nodeService
        .getAll()
        .then(res => {setPersons(res)})
    }, [])

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            nodeService
                .deleteById(id)
                .then(()=>{setPersons(persons.filter(p => p.id !== id))})
                .then(()=>{
                    setMessage({text: "Person deleted!", successful: true });
                    setTimeout(()=>{
                        setMessage(null);
                    }, 5000);
                })
        }
    }

    return (
        <div>
        <h2>Phonebook</h2>
        <Notification message={message}/>
        <Filter searchEntry={searchEntry} setSearchEntry={setSearchEntry} />
        <h2>add a new</h2>
        <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
        <h2>Numbers</h2>
        <Persons persons={persons} searchEntry={searchEntry} deletePerson={deletePerson} />
        </div>
    )
}

export default App