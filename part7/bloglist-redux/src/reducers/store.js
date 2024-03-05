import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blogReducer'
import userReducer from './userReducer'
import notificationReducer from './notificationReducer'
import usersReducer from './usersReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        user: userReducer,
        users: usersReducer,
        notification: notificationReducer
    }
})

console.log(store.getState());

export default store