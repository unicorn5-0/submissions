import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            return [...state, action.payload]
        },
        changeBlog (state, action) {
            const id = action.payload.id

            return state.map(blog => blog.id !== id ? blog : action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { appendBlog, changeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = blog => {
    return async (dispatch, getState) => {
        const user = getState().user
        const newBlog = await blogService.createBlog(blog)
        newBlog.user = user

        dispatch(appendBlog(newBlog))
    }
}

export const addLike = id => {
    return async (dispatch, getState) => {
        const store = getState().blogs

        const blogToChange = store.find(b => b.id === id)
        
        const changedBlog = {
            ...blogToChange,
            user: blogToChange.user.id,
            likes: blogToChange.likes + 1
        }

        const newBlog = await blogService.updateBlog(changedBlog)
        
        dispatch(changeBlog(newBlog))
    }
}

export const addComment = (id, comment) => {
    return async (dispatch, getState) => {
        const store = getState().blogs

        const blogToChange = store.find(b => b.id === id)
        
        const changedBlog = {
            ...blogToChange,
            user: blogToChange.user.id,
            comments: blogToChange.comments.concat(comment)
        }
        console.log(changedBlog);
        const newBlog = await blogService.updateBlog(changedBlog)
        
        dispatch(changeBlog(newBlog))
    }
}

export const removeBlog = id => {
    return async (dispatch, getState) => {
        const store = getState().blogs

        const deletedBlog = await blogService.deleteBlog(id)
        
        const remainingBlogs = store.filter(b => b.id !== id)
        
        dispatch(setBlogs(remainingBlogs))

    }
}

export default blogSlice.reducer