import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from 'jwt-decode'

export const registration = createAsyncThunk('user/registration', async (user) => {
    const resp = await axios.post('http://127.0.0.1:5000/api/user/registration/', {
        email: user.email,
        password: user.password
    })
    const data = resp.data
    return data
})

export const login = createAsyncThunk('user/login', async (user) => {
    const resp = await axios.post(`http://127.0.0.1:5000/api/user/login/`,{
        email: user.email,
        password: user.password
    })
    const data = resp.data
    return data
})

export const authAndRefresh = createAsyncThunk('authAndRefresh', async() => {
    const resp = await axios.get(`http://127.0.0.1:5000/api/user/auth/`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = resp.data
    return data
}) 


const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        email: '',
        role: '',
        stateLoading: {
            load: false,
            error: ''
        },
    },
    reducers: {
        logout:  (state, action)=> {
            state.id = -1
            state.email = ''
            state.role = ''
            localStorage.removeItem('token')
         },
    },
    extraReducers: (build) => {
        build.addCase(registration.fulfilled, (state, action) => {
            const token = action.payload.token
            const userDecode = jwtDecode(token)
            state.id = userDecode.id
            state.email = userDecode.email
            state.role = userDecode.role
            state.stateLoading.load = false
            localStorage.setItem('token', action.payload.token)
        })
        build.addCase(registration.pending, (state, action) => {
            state.stateLoading.load = true
        })
        build.addCase(registration.rejected, (state, action) => {
            state.stateLoading.error = 'Временно не работает, повторите попытку позже'
            state.stateLoading.load = false
        })
        build.addCase(login.fulfilled, (state, action)=>{
            const token = action.payload.token
            const userDecode = jwtDecode(token)
            state.id = userDecode.id
            state.email = userDecode.email
            state.role = userDecode.role
            localStorage.setItem('token', action.payload.token)

        })
        build.addCase(authAndRefresh.fulfilled, (state , action)=>{
            const token = action.payload.token
            const userDecode = jwtDecode(token)
            state.id = userDecode.id
            state.email = userDecode.email
            state.role = userDecode.role
        })
        build.addCase(login.rejected, (state, action)=>{
            localStorage.removeItem('token')
        })
    }
})

export const userReducer = userSlice.reducer
export const {logout} = userSlice.actions