// library
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// components
// css
import "../../../assets/css/cart-page.css";
//redux
import { removeItem, deleteItem, increaseItem } from "../../../redux/reducer/productReducer";
import { checkOutOrder } from "../../../redux/reducer/userReducer";
import { message } from "antd";
import CommonSection from "../../../components/Common Section/CommonSection";
import Helmet from "../../../components/Helmet/Helmet";

const Cart = () => {
  const { totalAmount, productCart } = useSelector(
    (state) => state.products
  );
  const { userLogin } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  const product = productCart.map((items) => {
    const orderDetail = {
      productId: String(items.id),
      quantity: Number(items.quantity)
    }
    return orderDetail;
  })



  // xử lý checkout
  // const handleCheckout = (e) => {
  //   try {
  //     e.preventDefault()
  //     const action = checkOutOrder({
  //       orderDetail: product,
  //       email: String(userLogin.email)
  //     })
  //     dispatch(action);
  //     message.open({
  //       type: 'success',
  //       content: "Checkout completed successfully",
  //     });
  //   } catch (error) {
  //     console.log(error)
  //     message.open({
  //       type: 'error',
  //       content: "Something went wrong! Try again later",
  //     });

  //     console.log(error)
  //   }
  // };

  useEffect(() => {
    localStorage.setItem('productCart', JSON.stringify(productCart))
    localStorage.setItem('totalAmount', totalAmount)
  }, [productCart, totalAmount])

  return (
    <Helmet title="Cart">
      <CommonSection title={"Your Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {productCart?.length === 0 ? (
                <div className="text-center">
                  <h5 className="mt-4">No products added to cart</h5>
                </div>
              ) : (
                <table className="table ">
                  <thead>
                    <tr className="text-center">
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      <>
                        {productCart?.map((item, index) => {
                          return <Tr item={item} key={index} />;
                        })}
                      </>
                    }
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${Math.round(Number(totalAmount),2)}</span>
                </h6>
              </div>
              <p className="small-desc mt-3">
                Taxes and shipping will calculate in checkout
              </p>
              <div className="cart__page-btn">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100"
                >
                  <Link to={"/search"}>Continue Shopping</Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="buy__btn w-100 mt-3"
                >
                  <Link
                    to='/'
                  // onClick={handleCheckout}
                  >
                    Checkout
                  </Link>
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default memo(Cart);

export const Tr = ({ item }) => {
  const { id, image, name, price, quantity } = item;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem(id));
  };

  const handleIncrease = () => {
    dispatch(increaseItem(id))
  }
  const handleDecrease = () => {
    dispatch(removeItem(id))
  }
  return (
    <tr className="text-center">
      <td className="cart__img-box">
        <img src={image} alt="" />
      </td>
      <td style={{ verticalAlign: 'middle' }}>{name}</td>
      <td style={{ verticalAlign: 'middle' }}>${price}</td>
      <td className="" style={{ verticalAlign: 'middle' }}>
        <span onClick={handleDecrease}><i className="fa fa-minus-square fs-4"></i></span>
        <span className="fs-4 mx-2 px-1">{quantity}</span>
        <span onClick={handleIncrease}><i className="fa fa-plus-square fs-4"></i></span>
      </td>
      <td className="cart__item-del" style={{ verticalAlign: 'middle' }}>
        <span onClick={handleDeleteItem}>
          <i className="ri-delete-bin-line"></i>
        </span>
      </td>
    </tr>
  );
};
