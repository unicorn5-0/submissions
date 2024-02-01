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
        response.status(400).json({ error : error.message })
    } else if (error.name === 'TokenExpiredError') {
        response.status(400).json('Token Expired')
    }

    next(error)
}

const getTokenFrom = request  => {
    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        
        return authorization.replace('Bearer ', '')
    }

    return null
}

const tokenExtractor = (request, response, next) => {
    
    request.token = getTokenFrom(request)
    
    next()
}

const userExtractor = async (request, response, next) => {
    const token = getTokenFrom(request)

    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid '})
        }
        
        request.user = await User.findById(decodedToken.id)
    }
    
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}