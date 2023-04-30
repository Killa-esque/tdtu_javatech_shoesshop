import { createSlice } from '@reduxjs/toolkit'
import { getStoreJson } from '../../utils/config'
import { message } from 'antd'

const totalAmountCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalAmount')))) {
    return 0
  }
  return Number(localStorage.getItem('totalAmount'))
}
const totalQuantityCheck = () => {
  if (isNaN(Number(localStorage.getItem('totalQuantity')))) {
    return 0
  }
  return Number(getStoreJson('productCart')?.length)
}
const productCartCheck = () => {
  if (JSON.parse(localStorage.getItem('productCart')) === null) {
    return []
  }
  return JSON.parse(localStorage.getItem('productCart'))
}

const initialState = {
  productList: [],
  totalQuantity: totalQuantityCheck(),
  totalAmount: totalAmountCheck(),
  productCart: productCartCheck(),
  productDetail: {},

}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getAllProductsAction: (state, action) => {
      state.productList = action.payload;
    },
    getProductByIdAction: (state, action) => {
      state.productDetail = action.payload;
    },
    resetAction: (state, action) => {
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.productCart = [];
    },

    addItem: (state, action) => {
      const newItem = action.payload;
      // Check if product already exists or not
      const existingItem = state.productCart?.find(
        (item) => parseInt(item.id) === parseInt(newItem.id) && parseInt(item.size) === newItem.size
      );
      // not: add new item to cart
      if (!existingItem) {
        state.productCart?.push({
          id: newItem.id,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          size: newItem.size,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
        message.open({
          type: 'success',
          content: 'Sản phẩm mới đã được thêm vào',
          duration: 3,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
      } else {
        // Already have: => increasing quantity, at the same time recalculate the total price = existing money + new amount
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
        message.open({
          type: 'success',
          content: 'Tăng thêm số lượng thành công',
          duration: 3,
          className: 'custom-class',
          style: {
            marginTop: '20vh',
          },
        })
      }

      //  Calculate the total amount of the products in the cart
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      )

    },
    increaseItem: (state, action) => {
      const { id, size } = action.payload;
      // Find the product you want to increase quantity
      const existingItem = state.productCart?.find((item) => parseInt(item.id) === parseInt(id) && parseInt(item.size) === parseInt(size));
      // state.totalQuantity++;
      const productList = JSON.parse(localStorage.getItem('productList'))
      const checkItem = productList?.find((item) => parseInt(item.id) === parseInt(id) && parseInt(item.size) === parseInt(size));
      // Check the quantity of only one product left
      if (existingItem.quantity <= checkItem.quantity) {
        existingItem.quantity++;
        existingItem.totalPrice = Number(existingItem.totalPrice) + Number(existingItem.price);
      }
      // Calculate the total amount of products in the cart after reducing the number of products
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

    },
    removeItem: (state, action) => {
      const { id, size } = action.payload;
      // Find the product you want to decrease quantity
      const existingItem = state.productCart?.find((item) => item.id === id && parseInt(item.size) === parseInt(size));
      // state.totalQuantity--;

      // Check the quantity of only one product left
      if (existingItem.quantity === 1) {
        // Remove from productCart array
        state.productCart = state.productCart.filter((item) => item.id !== id && parseInt(item.size) === parseInt(size));
      } else {
        // If there is more than 1 product, reduce the quantity and 
        // update the new amount = total amount - product price
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      // Calculate the total amount of products in the cart after reducing the number of products
      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

    },

    deleteItem(state, action) {
      const { id, size } = action.payload;
      console.log(id, size)
      const existingItem = state.productCart?.find((item) => parseInt(item.id) === parseInt(id) && parseInt(item.size) === parseInt(size));
      // console.log(43 === existingItem.size)
      if (existingItem) {
        const updatedCart = state.productCart.filter((item) => !(parseInt(item.id) === parseInt(id) && parseInt(item.size) === parseInt(size)));
        state.productCart = updatedCart;
        state.totalQuantity--;
      }

      state.totalAmount = state.productCart?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },

    addShippingFeeAction: (state, action) => {
      state.totalAmount += action.payload
    }
  },
});

export const { getAllProductsAction, getProductByIdAction, addShippingFeeAction, deleteItem, addItem, removeItem, increaseItem, resetAction } = productReducer.actions

export default productReducer.reducer


