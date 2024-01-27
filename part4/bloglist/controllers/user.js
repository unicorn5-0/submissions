const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
    const users = await User
                            .find({})
                            .populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(password, salt)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter