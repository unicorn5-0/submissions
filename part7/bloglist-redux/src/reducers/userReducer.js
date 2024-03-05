import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login";
import blogService from "../services/blogs"
import userService from "../services/users"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser (state, action) {
            return action.payload
        }
    }

})

export const { setUser } = userSlice.actions

export const loginUser = credentials => {
    return async dispatch => {
        const user = await loginService.login(credentials)
        blogService.setToken(user.token)
        window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
        dispatch(setUser(user))
    }
}

export default userSlice.reducer