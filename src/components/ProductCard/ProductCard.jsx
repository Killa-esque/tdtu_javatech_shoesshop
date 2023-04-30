// library
import React, { memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
// import { history } from '../../../../src/index';

// css 
import '../../assets/css/product-card.css'
import { addItem } from '../../redux/reducer/productReducer'
import { history } from '../..'

const ProductCard = ({ product }) => {
  const { userLogin, userToken } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()
  const { image, price, name, id } = product

  // Add product to cart
  const handleAddToCart = () => {
    if (userLogin) {
      dispatch(addItem({
        id,
        name,
        image,
        price
      }))
    } else {
      history.push('/login')
    }
  }


  return (
    <div className='product__item position-relative'>
      {/* {handleFave()} */}
      <div className="product__img">
        <motion.img whileHover={{ scale: 1.2 }}
          className='w-50 mx-auto' src={image} alt="" />
      </div>
      <div className='product__content'>
        <h5>
          <Link to={`/detail/${id}`}>{name?.length > 15 ? name?.substring(0, 15) + '...' : name}</Link>
        </h5>
        <div className='d-flex align-items-center justify-content-between'>
          <span className='product__price'>
            ${price}
          </span>
          <Link to={`/detail/${id}`}>
            <motion.button whileTap={{ scale: 1.2 }} className='addToCart__btn' >
              Add to Cart
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(ProductCard)
