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
export const setNotification = (message, time) => {
    return async dispatch => {
        const timer = time * 1000
        dispatch(notify(message))
        setTimeout(() => {
            dispatch(notify(null))
        }, timer)
    }
}
export default notificationSlice.reducer