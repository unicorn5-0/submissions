const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
      
    response.json(blogs)  
  })

 blogRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

  response.json(blog)
 }) 
  
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

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

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

 const user = await request.user

 console.log(user);

  const blog = await Blog.findById(id)

  if (blog.user.toString() === user._id.toString()) {
    const deletedPost = await Blog.findByIdAndDelete(id)

    response.status(204).json(deletedPost)
  } else {
    return response.status(401).json({ error: 'only user can delete blog' })
  }

})

module.exports = blogRouter