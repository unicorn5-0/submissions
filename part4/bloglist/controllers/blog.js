const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      
    response.json(blogs)  
  })

 blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

  response.json(blog)
 }) 
  
blogRouter.post('/', userExtractor, async (request, response) => {
  const {title, author, url, likes} = request.body
console.log(request.body);
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ? likes : 0
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'opperation not successful' })
  }

  blog.user = user._id

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(id, body, {new: true, runValidators: true, context: 'query'})
  
  response.json(updatedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user =request.user
  
  if (!user || blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'operation not successful'})
  }

  user.blogs = user.blogs.filter(b => b.toString !== blog.id.toString())

  await user.save()
  await blog.deleteOne()

  response.status(204).end()
})

module.exports = blogRouter