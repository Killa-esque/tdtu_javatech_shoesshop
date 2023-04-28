// library
import React from 'react'
import { ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// component 
import CartItem from './CartItem'

// css
import '../../assets/css/shopping-cart.css'

// redux
import { toggleUI } from '../../redux/reducer/cardUIReducer'

const Carts = () => {
  const dispatch = useDispatch()
  const { productCart, totalAmount } = useSelector(state => state.products)

  // close cart 
  const handleToggleCart = () => {
    dispatch(toggleUI())
  }
  return (
    <div className="cart__container">
      <ListGroup className='cart'>
        <div className="cart__close" onClick={handleToggleCart}>
          <span>
            <i className='ri-close-fill'></i>
          </span>
        </div>
        <div className="cart__item-list">
          {
            //check if the user clicked buy or not  
            productCart?.length === 0 ? <h5 className='text-center mt-5'>
              No item added to cart</h5> : productCart?.map((product, index) => {
                return (
                  <CartItem product={product} key={index} />
                )
              })
          }

        </div>
        <div className="cart__bottom">
          <h6>Subtotal amount: <span>${totalAmount}</span></h6>
          <button>
            <Link to='/cart' onClick={handleToggleCart}>Checkout</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  )
}

export default Carts
