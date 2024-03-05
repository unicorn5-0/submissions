import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './context/UserContext'
import NotifyContext from './context/NotifyContext'

const App = () => {
  const queryClient = useQueryClient()
  const [ user, userDispatch] = useContext(UserContext)
  const [info, dispatch] = useContext(NotifyContext)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGGEDIN', payload: user })
    }

  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({username, password})
      
      userDispatch({ type: 'LOGIN', payload: user })
      dispatch({ type: 'NOTIFY', payload: `${user.name} has successfully loggedin` })

      setTimeout(() => {
        dispatch({ type: ''})
      }, 5000)
    } catch (exception) {
      dispatch({ type: 'NOTIFY', payload: 'Invalid username or password' })
      setTimeout(() => {
        dispatch({ type: ''})
      }, 5000)
    }

   

    setPassword('')
    setUserName('')
  }

  const Notification = ({ info }) => {
    if (!info) {
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

  const blogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const addBlog = (blogBody) => {
    blogMutation.mutate(blogBody)
  }

  
  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new note' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>

  )

  const handleLogOut = (e) => {
    e.preventDefault()
    userDispatch({type: ''})
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
  }

  const likeMutation = useMutation({
    mutationFn: blogService.updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })

  const addLikes = (blog) => {
    likeMutation.mutate({...blog, likes: blog.likes + 1, user: blog.user.id})
  }

  const deleteMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    }
  })
  
  const deleteBlog = (id) => {
    deleteMutation.mutate(id)
  }

  if (!user) {
    return loginForm()
  }
  
  if (result.isLoading) {
    return <div>Loading...</div>
  } else if (result.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  const blogs = result.data
  
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