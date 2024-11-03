import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToWishList = createAsyncThunk('AddWishItems', async (item)=> {
    const response = await axios.post('http://localhost:8001/wish', item);
    return response.data;
})
export const getWishList = createAsyncThunk('GetWishItem', async (email) => {
    const response = await axios.get('http://localhost:8001/wish', {
        params: {email}
    });
    return response.data;
})
export const removeFromWishList = createAsyncThunk('RemoveWishList', async (data) => {
    const response = await axios.delete('http://localhost:8001/wish', {
        params: {
            data
        }
    });
    return data.id;
});

const wishSlice = createSlice({
    name: 'asyncwish',
    initialState: {
        status: 'idle',
        wish: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWishList.pending, (store) => {
            store.status = 'loading';
        })
        .addCase(getWishList.fulfilled, (store, action) => {
            store.status = 'succeded';
            store.wish = action.payload;
        })
        .addCase(getWishList.rejected, (store, action) => {
            store.status = 'failed';
            store.error = action.error.message;
        })
        .addCase(addToWishList.fulfilled, (store, action) => {
            store.status = 'added';
            store.wish.push(action.payload);
        })
        .addCase(removeFromWishList.fulfilled, (store, action) => {
            store.wish = store.wish.filter(item => item.id != action.payload)
        })
    }
})
export default wishSlice.reducer