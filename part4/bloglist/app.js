const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')

const mongoUrl = config.MONGODB_URI
mongoose.set("strictQuery", false)
logger.info('connicting to', mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(result => logger.info('connected mongodb'))
  .catch(err => logger.error(err.message))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testingRouter)

app.use(middleware.errorHandler)


module.exports = app