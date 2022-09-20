const { response } = require('express')
//const bodyParser = require('body-parser')
const express = require('express')
const app = express()

//bodyParser.urlencoded({ extended: false })

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (req, res) => {
    res.json(notes)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {    
        res.json(note)  
    } else {    
        res.status(404).end()  
    }
})

app.get('/info', (req, res) => {
    const d = new Date();
    res.send(`
        <p>Phonebook has info for ${notes.length} people.</p>
        <p>${d.toDateString()} ${d.toTimeString()}</p>
    `)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
  
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const note = {"id": Math.floor(Math.random() * 10000000), ...req.body};

    if (!note.name && !note.number) {
        res.json({ error: 'name and number are missing' })
    } else if (!note.name) {
        res.json({ error: 'name is missing' })
    } else if (!note.number) {
        res.json({ error: 'number is missing' })
    } else {
        for (let oldNote of notes) {
            if (oldNote.name == note.name) {
                res.json({ error: 'name must be unique' });
                return;
            }
        }

        notes.push(note)
        res.json(note)
    }
})
  
const PORT = 3001
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})