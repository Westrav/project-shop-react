import{configureStore} from '@reduxjs/toolkit'
import { brandsReducer } from './slice/BrandsSlice'
import { typesReducer } from './slice/TypesSlice'
import { productsReducer } from './slice/ProductsSlice'
import { userReducer } from './slice/UserSlice'
import { adminReducer } from './slice/AdminSlice'
import { productReducer } from './slice/ProductSlice'
import { settingReducer } from './slice/SettingSlice'
import { basketReducer} from './slice/BasketSlice'

export default configureStore({
    reducer:{brandsReducer, typesReducer, productsReducer, productReducer, userReducer, adminReducer, settingReducer, basketReducer }
})