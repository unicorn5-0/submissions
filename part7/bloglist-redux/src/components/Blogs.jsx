import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLike, removeBlog } from "../reducers/blogReducer";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useRef } from "react";
import { Link } from "react-router-dom";


const Blogs = () => {
  const blogs = useSelector(({blogs}) => blogs)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };


  const blogFormRef = useRef();

  const addBlog = async (newBlogObject) => {
    try {
      blogFormRef.current.toggleVisiblity();
      
      dispatch(createBlog(newBlogObject))
 
      dispatch(setNotification({message: `${newBlogObject.title} by ${newBlogObject.author} is successfully added`, type: "success"}))
    } catch (error) {
      dispatch(setNotification({ message: `title or author is missing`, type: "error"}));
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>create new</h2>
      {blogForm()}
      {
        blogs.map(blog => 
          <Link to={`/blogs/${blog.id}`}>
            <div style={blogStyle}>
              {blog.title} {blog.author}
            </div>
          </Link>
      )}
    </div>
  )
}

export default Blogs
