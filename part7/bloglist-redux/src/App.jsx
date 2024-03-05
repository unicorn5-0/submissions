import { useState, useEffect, useRef } from "react"
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initializeBlogs } from "./reducers/blogReducer";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import { loginUser, setUser } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";
import { Routes, Route, useMatch, Link } from "react-router-dom"
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  
  const blogs = useSelector(({ blogs }) => blogs)
  const notification = useSelector(({ notification }) => notification)

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser({ username, password }))
  
      dispatch(setNotification({ message: `${username} is successfully logged in`, type: "success" }));
    } catch (exception) {
      dispatch(setNotification({ message: "Invalid username or password", type: "error" }));
    }

    setPassword("");
    setUserName("");
  };

  const Notification = ({ info }) => {
    if (!info) {
      return;
    }

    const style = {
      color: info.type === "error" ? "red" : "green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    }
    
    return <div style={style}>{info.message}</div>;
  };

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification info={notification} />
      <form onSubmit={handleLogin} className="login">
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  );

  

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(setUser(null))
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
  };

  const userMatch = useMatch('/users/:id')

  const matchedUser = userMatch 
                        ? users.find(user => user.id === String(userMatch.params.id))
                        : null

  const blogMatch = useMatch('/blogs/:id')

  const matchedBlog = blogMatch 
                        ? blogs.find(blog => blog.id === String(blogMatch.params.id))
                        : null

  const padding = {
    paddingRight: 5
  }
  
  if (user === null) {
    return loginForm();
  }

                      

  return (
    <div className="container">
      <h2>blogs</h2>
      <Notification info={notification} />
      <div>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      
        {user.name} logged in
        <button type="submit" onClick={handleLogOut}>
          logout
        </button>
      </div>
      
      <Routes>
      <Route path='/' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User user={matchedUser} />} />
        <Route path='/blogs/:id' element={<Blog blog={matchedBlog} />} />
      </Routes>
    </div>
  );
};

export default App;
