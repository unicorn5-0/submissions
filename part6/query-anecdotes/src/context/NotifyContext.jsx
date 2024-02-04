import { createContext, useContext, useReducer } from 'react'

const notifyReducer = (state, action) => {
    
    switch (action.type) {
        case 'NOTIFY':
            console.log(action.payload)
            return action.payload
    
        default:
            return null
    }
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
    const [ message, messageDispatch ] = useReducer(notifyReducer, null)

    return (
        <NotifyContext.Provider value={[ message, messageDispatch ]}>
            {props.children}
        </NotifyContext.Provider>
    )
}

export const useNotifyValue = () => {
    const notifyAndDispatch = useContext(NotifyContext)
    return notifyAndDispatch[0]
}


export const useNotifyDispatch = () => {
    const notifyAndDispatch = useContext(NotifyContext)
    return notifyAndDispatch[1]
}

export default NotifyContext