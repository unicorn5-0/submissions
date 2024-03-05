import { useDispatch, useSelector } from "react-redux";
import { addComment, addLike, removeBlog } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import { useState } from "react";


const Blog = ({ blog}) => {  
    const blogs = useSelector(({blogs}) => blogs)
    const dispatch = useDispatch()
    const [ comment, setComment ] = useState('')
    
    const addLikes = async (e) => {
        const id = e.target.id

        const blog = blogs.find((b) => b.id === id)
        dispatch(addLike(blog.id))
        
    };


    const addComments = async (e) => {
        const id = e.target.id
        console.log(comment);
        const blog = blogs.find((b) => b.id === id)
        dispatch(addComment(blog.id, comment))
    }

    if (!blog) {
        return
    }
  
    return (
        <div className="blog">
          <h2>{blog.title}</h2>
          <Link to={blog.url}>{blog.url}</Link>
          <p id="likes">{blog.likes} likes <button onClick={addLikes} id={blog.id}>like</button></p>
          <p>Added by {blog.author}</p>
          <h2>comments</h2>
          <div>

            <input 
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button id={blog.id} onClick={addComments}>add comments</button>
            {
                blog.comments.map(comment => <li>{comment}</li>)
            }            
          </div>
        </div>
    )
  }

export default Blog
