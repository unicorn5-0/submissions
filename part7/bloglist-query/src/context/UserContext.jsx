import { createContext, useContext, useReducer } from "react"
import blogService from "../services/blogs";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            const user = action.payload
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            
            return action.payload
        
        case 'LOGGEDIN':
            const loggeduser = action.payload
            blogService.setToken(loggeduser.token)
            
            return action.payload

        default:
            return null
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [ user, userDispatch ] = useReducer(userReducer)

    return (
        <UserContext.Provider value={[ user, userDispatch ]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[0]
}

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[1]
}

export default UserContext