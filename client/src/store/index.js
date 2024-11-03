import {configureStore} from '@reduxjs/toolkit'
import asynccartReducer from './asyncCart'
import wishReducer from './assyncWishList'

const itemStore = configureStore({
    reducer: {
        asynccart: asynccartReducer,
        asyncwish: wishReducer
    }
})
export default itemStore;