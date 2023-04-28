import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartIsVisible: false
}

const cardUIReducer = createSlice({
  name: 'cardUIReducer',
  initialState,
  reducers: {
    toggleUI: state => {
      state.cartIsVisible = !state.cartIsVisible;
    }
  }
});

export const {toggleUI} = cardUIReducer.actions

export default cardUIReducer.reducer