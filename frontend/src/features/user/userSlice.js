import { createSlice } from '@reduxjs/toolkit'
import api from '../../api'

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
        },
        deleteAccount: (state) => {
            api.deleteUser(state.userId)
        },
        takeMoneyFromUserWallet: (state, action) => {
            state.wallet -= action.payload.moneyAmount
            state.acceptedOffers += 1
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, deleteAccount, takeMoneyFromUserWallet } = storeSlice.actions

export default storeSlice.reducer