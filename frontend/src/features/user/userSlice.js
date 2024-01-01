import { createSlice } from '@reduxjs/toolkit'

export const storeSlice = createSlice({
    name: 'user',
    initialState: {
        userId: null,
        username: "none",
        wallet: 0,
        acceptedOffers: 0
    },
    reducers: {
        login: (state, action) => {
            state.userId = action.payload.userId
            state.username = action.payload.username
            state.wallet = action.payload.wallet
            state.acceptedOffers = action.payload.acceptedOffers
        },
        logout: (state) => {
            state.userId = null
            state.username = "none"
            state.wallet = 0
            state.acceptedOffers = 0
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = storeSlice.actions

export default storeSlice.reducer