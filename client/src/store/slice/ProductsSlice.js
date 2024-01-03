import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadProducts = createAsyncThunk('products/loadProducts', async ({page,limit}) => {
    const resp = await axios.get('http://127.0.0.1:5000/api/device',{
        params:{
            limit: Number(limit),
            page: Number(page)
        }
    })
    const data = resp.data
    return data
})

export const addProduct = createAsyncThunk('products/addProducts', async (product) => {
    const formDate = new FormData()
    formDate.append('name',product.name)
    formDate.append('price',product.price)
    formDate.append('brandId',product.brand)
    formDate.append('typeId',product.type)
    formDate.append('info',JSON.stringify(product.info))
    formDate.append('img',product.img)
    const resp = await axios.post('http://127.0.0.1:5000/api/device',formDate, {
        'Content-Type': 'multipart/form-data'
    })
    const data = resp.data
    return data
})
export const deleteProduct = createAsyncThunk('products/deleteProduct', async(deviceId)=>{
    const resp = await axios.delete(`http://127.0.0.1:5000/api/device/${deviceId}`)
    const data = resp.data
    return data
})




const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: {count:0, rows:[]},
        stateLoading: {
            load: false,
            error: ''
        }
    },
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(loadProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.stateLoading.load = false
        })
        build.addCase(loadProducts.pending, (state, action) => {
            state.stateLoading.load = true
        })
        build.addCase(loadProducts.rejected, (state, action) => {
            state.stateLoading.error = 'Временно не работает, повторите попытку позже '
            state.stateLoading.load = false
        })
        build.addCase(addProduct.fulfilled, (state , action)=>{
            state.products.rows.push(action.payload)
        })
        build.addCase(deleteProduct.fulfilled, (state, action)=>{
            const idxProduct = state.products.rows.findIndex(product => product.id == action.payload.deviceId)
            state.products.rows.splice(idxProduct,1)
        })
    }
})





export const productsReducer = productsSlice.reducer