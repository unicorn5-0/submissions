require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.get('/info', (req, res) => {
    const today = new Date()
    Person.find({}).then(people => {
        res.send(`PhoneBook has info for ${people.length} <br /> ${today}`)
    })
})

app.get('/api/persons', (req, res, next) => {
    Person
        .find({})
        .then(people => {
            res.json(people)
        })
        .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Person
        .findById(id)
        .then(person => {
            res.json(person)
        })
        .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({error : 'The name or number is missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person
        .save()
        .then(savedPerson => res.json(savedPerson))
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const {name, number} = req.body

    Person
        .findByIdAndUpdate(id, {name, number}, { new: true, runValidators: true, context: 'query'})
        .then(updatedPerson => res.json(updatedPerson))
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id =req.params.id
    
    Person
        .findByIdAndDelete(id)
        .then(deletedPerson =>  res.json(deletedPerson))
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.error(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send('error: malformated id')
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    }
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`App connected on server: http://localhost${PORT}/`))