import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const basketSlice  = createSlice({
    name:'basket',
    initialState:{
        productIds:[],
        products: [],
        openBasket:false,
        basketCount:0,
    },
    reducers:{
        setBasketProducts:(state , action)=>{
            const products = action.payload
            const productIds =products.map(product => product.id)
            state.productIds = productIds
            state.products = products
            state.basketCount = state.productIds.length
        },
        addProducts:(state,action)=>{
            const product = action.payload
            const findProduct = state.products.find(productArr => productArr.id == product.id)
            if(!findProduct){
                state.products.push(product)
            }
        },
        addBasket:(state, action)=>{
            const id = action.payload
            if(!state.productIds.includes(id)){
                state.productIds.push(id)
                localStorage.setItem('basket', JSON.stringify(state.productIds))
                console.log(action.payload);
                state.basketCount = state.productIds.length
            }
        },
        
        toggleBasket:(state, action)=>{
            state.openBasket = !state.openBasket
        },
        delProductIdBasket:(state , action)=>{
            const id = action.payload
            const idx = state.productIds.indexOf(id)
            if(idx != -1){ 
                state.productIds.splice(idx,1)
                localStorage.setItem('basket', JSON.stringify(state.productIds))
                state.basketCount = state.productIds.length
            }
        },
        delProductBasket:(state, action)=>{
            const id = action.payload
            const idx = state.products.findIndex(product => product.id == id)
            if(idx != -1){ 
                state.products.splice(idx,1)
            }
        },
    },
})

export const basketReducer = basketSlice.reducer
export const { addProducts, addBasket, toggleBasket, delProductIdBasket, delProductBasket, setBasketProducts } = basketSlice.actions 