import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notify(state, action) {
            return action.payload
        }
    }
})

export const { notify } = notificationSlice.actions
export const setNotification = (message) => {
    return async dispatch => {
        
        dispatch(notify(message))
        setTimeout(() => {
            dispatch(notify(null))
        }, 5000)
    }
}
export default notificationSlice.reducer