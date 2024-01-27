const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'ValidationError') {
        response.status(400).json({ error : error.message })
    } else if (error.name === 'CastError') {
        response.status(400).json({ error : error.message })
    } else if (error.name === 'JsonWebTokenError') {
        response.status(401).json({ error : error.message })
    } else if (error.name === 'TokenExpiredError') {
        response.status(401).json('Token Expired')
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        const token = authorization.replace('Bearer ', '')
    
        request.token = token
    }
  
    next()
}

const userExtractor = async (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken) {
      return response.status(401).json({ error: 'invalid token'})
    }
  
    const user = await User.findById(decodedToken.id)

    request.user = user

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}