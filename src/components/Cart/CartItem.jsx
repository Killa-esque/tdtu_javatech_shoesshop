// library
import React from "react";
import { ListGroupItem } from "reactstrap";

//css
import '../../assets/css/cart-item.css'
import { useDispatch } from "react-redux";
import { addItem, deleteItem, removeItem } from "../../redux/reducer/productReducer";

const CartItem = ({ product }) => {
  const dispatch = useDispatch()

  const { id, name, price, image, quantity, totalPrice } = product;

  // Add items to cart
  const handleIncrementItem = () => {
    dispatch(
      addItem({
        id,
        name,
        price,
        image,
      })
    );
  };

  // handling decrease the number of products
  const handleDecreaseItem = () => {
    dispatch(removeItem(id));
  };

  // Delete items from cart
  const handleDeleteItem = () => {
    dispatch(deleteItem(id));
  };
  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={image} alt="" />
        <div className="cart__product-info d-flex w-100 align-items-center gap-4 justify-content-between">
          <div className="w-75">
            <h6 className="cart__product-title">{name}</h6>
            <p className="d-flex align-items-center gap-5 cart__product-price">
              {quantity}x
              <span>${totalPrice}</span>
            </p>

            <div className="d-flex align-items-center justify-content-between increase__decrease-btn w-100">
              <span className="increase__btn" onClick={handleIncrementItem}>
                <i className="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={handleDecreaseItem}>
                <i className="ri-subtract-line"></i>
              </span>
            </div>
          </div>
          <span className="delete__btn" onClick={handleDeleteItem}>
            {" "}
            <i className="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
