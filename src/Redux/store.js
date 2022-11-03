import {configureStore, combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import authReducer from './slice/authSlice'
import productReducer from './slice/productSlice'
import filterReducer from './slice/filterSlice'
import cartReducer from './slice/cartSlice'
import checksoutReducer from './slice/checksoutSlice'
import orderReducer from './slice/orderSlice'

const rootReducer = combineReducers({
   auth: authReducer,
   product: productReducer,
   filter: filterReducer,
   cart: cartReducer,
   checkout: checksoutReducer,
   order: orderReducer,
})
//non serialized error fix
const customizedMiddleware = getDefaultMiddleware({
   serializableCheck:false
})
const store = configureStore({
   reducer: rootReducer,
   middleware: customizedMiddleware

})

export default store;