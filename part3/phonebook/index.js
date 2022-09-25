const { response } = require('express')
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
    if (req.method === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            tokens['body'](req, res)
        ].join(' ')
    }

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

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

// app.get('/', (req, res) => { res.send('<h1>Hello World!</h1>')})
  
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

app.post('/api/persons', (req, res) => {
    const note = {"id": Math.floor(Math.random() * 10000000), ...req.body};

    if (!note.name && !note.number) {
        return res.status(400).json({ 
            error: 'name and number are missing'
        })
    } else if (!note.name) {
        return res.status(400).json({ 
            error: 'name is missing'
        })
    } else if (!note.number) {
        return res.status(400).json({ 
            error: 'number is missing'
        })
    } else {
        for (let oldNote of notes) {
            if (oldNote.name == note.name) {
                return res.status(400).json({ 
                    error: 'name must be unique'
                })
            }
        }

        notes.push(note)
        res.json(note)
    }
})

app.put('api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = {"id": id, ...req.body};
    
    if (!note.name && !note.number) {
        return res.status(400).json({ 
            error: 'name and number are missing'
        })
    } else if (!note.name) {
        return res.status(400).json({ 
            error: 'name is missing'
        })
    } else if (!note.number) {
        return res.status(400).json({ 
            error: 'number is missing'
        })
    } else {
        notes = notes.filter(n => n.id !== id).push(note)
        res.status(204).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
  
    res.status(204).end()
})
  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})