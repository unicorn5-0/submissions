import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login";
import blogService from "../services/blogs"
import userService from "../services/users"

const usersSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUsers (state, action) {
            return action.payload
        }
    }

})

export const { setUsers } = usersSlice.actions

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch(setUsers(users))
    }
}

export default usersSlice.reducer