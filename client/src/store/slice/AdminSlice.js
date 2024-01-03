import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from 'jwt-decode'


export const registration = createAsyncThunk('admin/registration', async (admin) => {
    const resp = await axios.post('http://127.0.0.1:5000/api/user/registration', {
        email: admin.email,
        password: admin.password,
        role: "ADMIN"
    })
    const data = resp.data
    return data
})

export const loadAdmins = createAsyncThunk('admin/loadAdmins', async () => {
    const resp = await axios.get('http://127.0.0.1:5000/api/user/admins')
    const data = resp.data
    return data
})

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admins: [],
        stateLoading: {
            load: false,
            error: ''
        }
    },
    reducers: {

    },
    extraReducers: (build) => {
        build.addCase(registration.fulfilled, (state, action) => {
            const token = action.payload.token
            const adminDecode = jwtDecode(token)
            state.admins.push(adminDecode)
            state.stateLoading.load = false
        })
        build.addCase(registration.pending, (state, action) => {
            state.stateLoading.load = true
        })
        build.addCase(registration.rejected, (state, action) => {
            state.stateLoading.error = 'Временно не работает, повторите попытку позже'
            state.stateLoading.load = false
        })
        build.addCase(loadAdmins.fulfilled, (state, action) => {
            state.admins = action.payload
        })
    }
})

export const adminReducer = adminSlice.reducer