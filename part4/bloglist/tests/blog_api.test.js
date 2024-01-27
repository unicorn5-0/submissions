const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./tester_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
mongoose.set("bufferTimeoutMS", 30000)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when initialy some blogs saved', () => {
    test('test all blogs returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(2)        
    })

    test('varify unique identifier is called id', async () => {
        const response = await api.get('/api/blogs')
    
        const blogs = response.body
    
        expect("id" in blogs[0]).toBeTruthy()
    })
})



test('newly created blog', async () => {
    const newBlog = {
        title: "Jest just got bigger",
        author: "Robert C. Martin",
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 21,
    }

    await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogs = response.body
    
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

describe('addition of new blog', () => {
    test('test likes are zero by default', async () => {
        const newBlog = {
            title: "Jest just got bigger",
            author: "Robert C. Martin",
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
        }
    
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        const blogs = response.body
        const likes = blogs[2].likes
        
        expect(likes).toBe(0)
        
    }, 100000)
    
    test('test if server wont post if url or title missing', async () => {
        const newBlog = {
            title: "Jest just got bigger",
            author: "Robert C. Martin",
            likes:21
        }
    
        await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)
                
        
    }, 100000)
    
})

describe('deletion of blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const authors = blogsAtEnd.map(r => r.author)
    
        expect(authors).not.toContain(blogToDelete.author)
    })
})

describe('update a specific note', () => {
    test('test if a specific note can be updated', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const updateToBlog = {
            "title": "Posting with VS rest client",
            "author": "James Author",
            "url": "http:?jauthor.com/rest-client",
            "likes": 600
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateToBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        const authors = blogsAtEnd.map(b => b.author)
    
        expect(authors).toContain(updateToBlog.author)
    })
    
})

describe('user tests', () => {
    beforeEach(async () => {
        User.deleteMany({})
    })

    test('posting user is successful', async () => {
        const newUser = {
            username: "testing",
            name: "testing automation",
        }
        await api
                .post('/api/users/')
                .send(newUser)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})