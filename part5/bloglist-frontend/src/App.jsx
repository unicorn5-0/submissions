import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({message: null})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const blogFormRef = useRef()

  const Notify = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      Notify(`${user.name} is successfully logged in`)
    } catch (exception) {
      Notify('Invalid username or password')
    }

   

    setPassword('')
    setUserName('')
  }

  const Notification = ({ info }) => {
    if (!info.message) {
      return
    }
  
    const style = {
      color: info.type==='error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        {info.message}
      </div>
    )
  }

  const loginForm = () => (
  
      <div>
        <h2>log in to application</h2>
        <Notification info={info} />
        <form onSubmit={handleLogin} className='login' >
          <div>
            username 
            <input 
            id='username'
              type='text' 
              value={username} 
              onChange={({target}) => setUserName(target.value)}
            /> 
          </div>
          <div>
            password 
            <input 
            id='password'
              type='password' 
              value={password} 
              onChange={({target}) => setPassword(target.value)}
            /> 
          </div>
          <button type='submit' id='login-btn'>login</button>
        </form>
      </div>
  ) 

  const addBlog = async (newBlogObject) => {
    
    
    try {
      blogFormRef.current.toggleVisiblity()
      const blog = await blogService.createBlog(newBlogObject)
      blog.user = user
      setBlogs(blogs.concat(blog))
      Notify(`${newBlogObject.title} by ${newBlogObject.author} is successfully added`)
      
    } catch (error) {
      Notify(`title or author is missing`)
    }
    
  }



  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>

  )

  const handleLogOut = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  const addLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {...blog, user: user.id, likes: blog.likes + 1}
    const updatedblog = await blogService.updateBlog(id, changedBlog)
   
    setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...updatedblog, user: user }))
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find(b => b.id === id)

    const checkDelete = window.confirm(`Remove blog ${blog.name} by ${blog.author}`)

    if (checkDelete) {
      const deletedBlog = await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  if (user === null) {
    return loginForm()
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} ref={blogFormRef}/>
      <div>
        {user.name} logged in  
        <button type='submit' onClick={handleLogOut}>logout</button>
      </div>
      <h2>create new</h2>
      {blogForm()}
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} />
        )
      }
      
    </div>
  )
}

export default App