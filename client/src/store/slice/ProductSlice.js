import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit"
import axios from "axios"


export const loadProduct = createAsyncThunk('product/loadProduct', async (productId) => {
    const resp = await axios.get(`http://127.0.0.1:5000/api/device/${productId}`)
    const data = resp.data
    return data
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product:{},
        stateLoading: {
            load: false,
            error: ''
        }
    },
    reducers: {

    },
    extraReducers: (bulid)=>{
        bulid.addCase(loadProduct.fulfilled, (state, action)=>{
            state.product = action.payload
            state.stateLoading.load = false
        })
        bulid.addCase(loadProduct.pending, (state, action)=>{
            state.stateLoading.load = true
        })
        bulid.addCase(loadProduct.rejected, (state, action)=>{
            state.stateLoading.error = 'Временно не работает, повторите попытку позже'
            state.stateLoading.load = false
        })
    }

})

export const productReducer = productSlice.reducer