import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadTypes = createAsyncThunk('types/loadTypes', async () => {
    const resp = await axios.get('http://127.0.0.1:5000/api/type/')
    const data = resp.data
    return data
})
export const addType = createAsyncThunk('type/addType', async (nameType) => {
    const resp = await axios.post('http://127.0.0.1:5000/api/type/', { name: nameType })
    const data = resp.data
    return data
})
export const deleteType = createAsyncThunk('type/deleteType', async (typeId) => {
    const resp = await axios.delete(`http://127.0.0.1:5000/api/type/${typeId}`)
    const data = resp.data
    return data
})


const typesSlice = createSlice({
    name: 'types',
    initialState: {
        types: [],
        stateLoading: {
            load: false,
            error: ''
        }
    },
    reducers: {

    },
    extraReducers: (build) => {

        build.addCase(loadTypes.fulfilled, (state, action) => {
            state.types = action.payload
            state.stateLoading.load = false
        })
        build.addCase(loadTypes.pending, (state, action) => {
            state.stateLoading.load = true
        })
        build.addCase(loadTypes.rejected, (state, action) => {
            state.stateLoading.error = 'Временно не работает, повторите попытку позже '
            state.stateLoading.load = false
        })
        build.addCase(addType.fulfilled, (state, action) => {
            state.types.push(action.payload)
        })
        build.addCase(deleteType.fulfilled, (state, action) => {
            const idxType = state.types.findIndex(type => type.id == action.payload.typeId)
            state.types.splice(idxType, 1)
        })
    }

})

export const typesReducer = typesSlice.reducer