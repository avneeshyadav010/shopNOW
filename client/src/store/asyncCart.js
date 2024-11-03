import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getCartList = createAsyncThunk('GetCartItem', async (email) => {
    const response = await axios.get('http://localhost:8001/cart', {
        params: {email}
    });
    return response.data;
})
export const addToCart = createAsyncThunk('AddCartItems', async (item)=> {
    const response = await axios.post('http://localhost:8001/cart', item);
    return response.data;
})
export const removeFromCartList = createAsyncThunk('RemoveCartItem', async (data) => {
    const response = await axios.delete('http://localhost:8001/cart', {
        params: {
            data
        }
    });
    return data.id;
});

const cartSlice = createSlice({
    name: 'asynccart',
    initialState: {
        status: 'idle',
        cart: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartList.pending, (store) => {
            store.status = 'loading';
        })
        .addCase(getCartList.fulfilled, (store, action) => {
            store.status = 'succeded';
            store.cart = action.payload;
        })
        .addCase(getCartList.rejected, (store, action) => {
            store.status = 'failed';
            store.error = action.error.message;
        })
        .addCase(addToCart.fulfilled, (store, action) => {
            store.status = 'added'
            store.cart.push(action.payload);
        })
        .addCase(removeFromCartList.fulfilled, (store, action) => {
            store.cart = store.cart.filter(item => item.id != action.payload)
        })
    }
})
export default cartSlice.reducer