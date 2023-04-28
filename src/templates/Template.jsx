import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Carts from '../components/Cart/Carts'
// components

const Template = () => {
  const { cartIsVisible } = useSelector(state => state.cartUI)

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

export default Template
