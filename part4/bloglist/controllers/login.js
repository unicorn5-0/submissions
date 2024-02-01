const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body
    
    const user = await User.findOne({username})
    
    const hash = user.passwordHash
    
    const passwordCorrect = user === null
        ? false
        : bcrypt.compareSync(password, hash)

    console.log(passwordCorrect);

    if(!(user && passwordCorrect)) {
        return response.status(401).json({ error : 'invalid username or password'})
    }

    const genUserToken = {
        usernme: user.username,
        id: user._id
    }

    const token = jwt.sign(genUserToken, process.env.SECRET)

    response.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter