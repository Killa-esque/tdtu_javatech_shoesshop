import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Carts from '../components/Cart/Carts'
// components

const Template = () => {
  const { cartIsVisible } = useSelector(state => state.cartUI)
  const { userLogin, userToken } = useSelector(state => state.userReducer)
  if (!userToken) {
    return <Navigate to={'login'} />
  }
  else {
    return (
      <>
        <Header />
        {/* Show Cart */}
        {cartIsVisible && <Carts />}
        <Outlet />
        <Footer />
      </>
    )
  }
}

export default Template
