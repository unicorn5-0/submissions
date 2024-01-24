const express = require("express")
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

let persons = [
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

app.get('/info', (req, res) => {
    const length = persons.length
    const today = new Date()
    
    res.send(`PhoneBook has info for ${length} <br /> ${today}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    
    if (person) {
        res.json(person)       
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    const found = persons.some(p => p.name === body.name)

    if (found) {
        return res.status(400).json({error : 'name must be unique'})
    }else if (!body.name || !body.number) {
        return res.status(400).json({error : 'The name or number is missing'})
    }

    const person = {
        id: Math.floor(Math.random() * 100),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.listen(PORT, () => console.log(`App connected on server: http://localhost${PORT}/`))
