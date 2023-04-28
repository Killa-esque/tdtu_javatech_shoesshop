import { configureStore } from "@reduxjs/toolkit"
import productReducer from './reducer/productReducer'
import userReducer from "./reducer/userReducer"
import cardUIReducer from "./reducer/cardUIReducer"

export const store = configureStore({
  reducer: {
    products: productReducer,
    userReducer: userReducer,
    cartUI: cardUIReducer,
  }
})

