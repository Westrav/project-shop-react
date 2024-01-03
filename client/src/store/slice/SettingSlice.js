import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        openSideBar: false,
        widthOpenSideBar: {width: 'calc(100% - 250px)', marginLeft: '250px'},
        widthCloseSideBar: {width: 'calc(100% - 70px)'},
        mobileSize: 888,
    },
    reducers: {
        setOpenSideBar: (state, action) => {
            state.openSideBar = action.payload
        },
        setIsOpenOrder:(state,action)=>{
            
        }
    }    


})

export const settingReducer = settingSlice.reducer
export const { setOpenSideBar } = settingSlice.actions
