import { createSlice } from '@reduxjs/toolkit'

export const storeSlice = createSlice({
    name: 'user',
    initialState: {
        value: "none",
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = "none"
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = storeSlice.actions

export default storeSlice.reducer