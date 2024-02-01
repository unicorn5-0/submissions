import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const showwhenVisible = {display: visible ? '': 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const increaseLikes = (e) => {
    e.preventDefault()
    const id = blog.id
    addLikes(id)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    const id = blog.id
    deleteBlog(id)
  }


  return (
    <div>
      <div style={blogStyle} className="blog">
        <div>
          <span>{blog.title} {blog.author}</span>
          <button onClick={toggleVisiblity} className="blog-detail">{visible ? 'hide' : 'view'}</button>
        </div>
        
        <div style={showwhenVisible} className="togglableContent">
          <p>{blog.url}</p>
          <p id="likes">{blog.likes} <button onClick={increaseLikes} id="like">like</button></p>
          <p>{blog.user.name}</p>
          <button onClick={handleDelete} id="remove">remove</button>
        </div>
      </div>
    </div>
)  
}

export default Blog