import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadBrands = createAsyncThunk('brands/loadBrands', async () => {
    const resp = await axios.get('http://127.0.0.1:5000/api/brand/')
    const data = resp.data
    return data
})
export const addBrand = createAsyncThunk('brand/addBrand', async (nameBrand)=>{
    const resp = await axios.post('http://127.0.0.1:5000/api/brand/',{name:nameBrand})
    const data = resp.data
    return data
})
export const deleteBrand = createAsyncThunk('brand/deleteBrand', async (brandId)=>{
    const resp = await axios.delete(`http://127.0.0.1:5000/api/brand/${brandId}`)
    const data = resp.data
    return data
})

const brandsSlice = createSlice({
    name: 'brands',
    initialState: {
        brands: [],
        stateLoading:{
            load:false,
            error: ''
        }
    },
    reducers: {},
    extraReducers: (build) => {
        build.addCase(loadBrands.fulfilled, (state, action) => {
            state.brands = action.payload
            state.stateLoading.load = false
        })
        build.addCase(loadBrands.pending, (state , action)=>{
            state.stateLoading.load = true
        })  
        build.addCase(loadBrands.rejected, (state , action)=>{
            state.stateLoading.error = 'Временно не работает, повторите попытку позже '
            state.stateLoading.load = false
        })
        build.addCase(addBrand.fulfilled, (state , action)=>{
            state.brands.push(action.payload)
        })
        build.addCase(deleteBrand.fulfilled, (state, action)=>{
           const idxBrand = state.brands.findIndex(brand => brand.id == action.payload.brandId)
           state.brands.splice(idxBrand,1)
        })
        
    }
})

export const brandsReducer = brandsSlice.reducer
