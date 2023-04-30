// library
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// components
// css
import "../../../assets/css/cart-page.css";
//redux
import { removeItem, deleteItem, increaseItem, resetAction } from "../../../redux/reducer/productReducer";
import { checkOutOrder } from "../../../redux/reducer/userReducer";
import { Button, Modal, message } from "antd";
import CommonSection from "../../../components/Common Section/CommonSection";
import Helmet from "../../../components/Helmet/Helmet";
import { productService } from "../../../service/productService";

const Cart = () => {
  const { totalAmount, productCart } = useSelector(
    (state) => state.products
  );
  const [totalPrice, setTotalPrice] = useState()
  const { userLogin } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);


  const product = productCart?.map((items) => {
    const orderDetail = {
      productId: parseInt(items.id),
      quantity: parseInt(items.quantity),
      size: parseInt(items.size)
    }
    return orderDetail;
  })


  const handleDeliveryChange = (event, setFieldValue) => {
    const deliveryMethod = event.target.value;
    let shippingFee = 0;
    if (deliveryMethod === 'Standard Delivery') {
      shippingFee = 5;
    } else if (deliveryMethod === 'Express Delivery') {
      shippingFee = 10;
    }
    setFieldValue("delivery", deliveryMethod);
    setFieldValue("totalPrice", totalAmount + totalAmount * 0.1 + shippingFee);
  }

  const resetCart = () => {
    dispatch(resetAction())
  }



  // xử lý checkout
  const handleCheckout = (payment, totalPrice, address, delivery) => {
    try {
      console.log(product)
      // const action = checkOutOrder({
      //   orderDetail: product,
      //   email: String(userLogin.email)
      // })
      // dispatch(action);
      // orderDetail = {
      //   orderDetail: product
      // }
      const userOrder = {
        payment: payment,
        totalPrice: totalPrice,
        orderDetail: product,
        address: address,
        delivery: delivery
      }
      console.log(userOrder)
      productService.checkOutOrder(userOrder)
        .then(res => {
          setShowModal(true)
          message.open({
            type: 'success',
            content: "Checkout completed successfully",
          });
        })
        .catch(err => {
          message.open({
            type: 'error',
            content: "Something went wrong! Try again later",
          });
        })
    } catch (error) {
      console.log(error)
      message.open({
        type: 'error',
        content: "Something went wrong! Try again later",
      });

      console.log(error)
    }
  };

  useEffect(() => {
    localStorage.setItem('productCart', JSON.stringify(productCart))
    localStorage.setItem('totalAmount', totalAmount)
  }, [productCart, totalAmount])

  return (
    <Helmet title="Cart">
      <CommonSection title={"Your Cart"} />
      <section>
        <Modal
          open={showModal}
          onOk={() => {
            setShowModal(false);
            // resetCart();
          }}
          onCancel={() => setShowModal(false)}
          title="Order Successful"
        >
          <p>Your order has been submitted successfully. Thank you for shopping with us!</p>
        </Modal>
        <Container>
          <Row>
            <Col lg="8">
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
                      <th>Size</th>
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
            <Col lg="4">
              <div>
                <h5 className="fw-bold mb-3">Payment Information</h5>
                <Formik
                  initialValues={
                    {
                      address: '',
                      payment: 'Credit Card',
                      delivery: 'Standard Delivery',
                      totalPrice: totalAmount + 5 + totalAmount * 0.1
                    }
                  }
                  validationSchema={Yup.object({
                    address: Yup.string().required('Your address must be filled'),
                    payment: Yup.string().oneOf(['Credit Card', 'Momo', 'Cash On Delivery'], 'Invalid payment method'),
                    delivery: Yup.string().oneOf(['Standard Delivery', 'Express Delivery'], 'Invalid delivery method')
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    const { payment, totalPrice, address, delivery } = values;
                    setTimeout(() => {
                      handleCheckout(payment, totalPrice, address, delivery)
                      setSubmitting(false);
                    }, 100);
                  }}
                >
                  {({ values, setFieldValue, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label fw-bold">Address</label>
                        <Field type="text" className="form-control" id="address" name="address" placeholder="Enter your address here" />
                        <ErrorMessage name="address" className="text-danger" component="div" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="payment" className="form-label fw-bold">Payment Method</label>
                        <Field as="select" className="form-select" id="payment" name="payment">
                          <option value="Credit Card">Credit Card</option>
                          <option value="Momo">Momo</option>
                          <option value="Cash On Delivery">Cash On Delivery</option>
                        </Field>
                        <ErrorMessage name="payment" className="text-danger" component="div" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="delivery" className="form-label fw-bold">Delivery Method</label>
                        <Field as="select" className="form-select" id="delivery" name="delivery" onChange={(event) => {
                          const deliveryMethod = event.target.value;
                          let shippingFee = 0;
                          if (deliveryMethod === 'Standard Delivery') {
                            shippingFee = 5;
                          } else if (deliveryMethod === 'Express Delivery') {
                            shippingFee = 10;
                          }
                          setFieldValue("delivery", deliveryMethod);
                          setFieldValue("totalPrice", totalAmount + totalAmount * 0.1 + shippingFee);
                        }}>
                          <option value="Standard Delivery">Standard Delivery</option>
                          <option value="Express Delivery">Express Delivery</option>
                        </Field>
                        <ErrorMessage name="delivery" className="text-danger" component="div" />
                      </div>
                      <h5 className="fw-bold mb-3 mt-5">Payment Detail</h5>
                      <div className="mt-3">
                        <div className="d-flex justify-content-between mt-2">
                          <h6 className="fw-bolder">Subtotal:</h6>
                          <span className="fs-5">${Math.round(Number(totalAmount), 2)}</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <h6 className="fw-bolder">Shipping fee:</h6>
                          {values.delivery === 'Standard Delivery' ?
                            <span className="fs-5">$5</span> :
                            <span className="fs-5">$10</span>
                          }
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <h6 className="fw-bolder">Taxes:</h6>
                          <span className="fs-5">10%</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                          <h5 className="fs-3 fw-bolder">Total:</h5>
                          <span className="fs-3">${values.totalPrice}</span>
                        </div>
                      </div>
                      <div className="cart__page-btn mt-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="buy__btn w-100"
                        >
                          <Link to={"/search"}>Continue Shopping</Link>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="buy__btn w-100 mt-3"
                          type="submit"
                        >
                          Checkout
                        </motion.button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet >
  );
};

export default memo(Cart);

export const Tr = ({ item }) => {
  const { id, image, name, price, quantity, size } = item;
  const dispatch = useDispatch();

  const handleDeleteItem = () => {
    dispatch(deleteItem({ id, size }));
  };

  const handleIncrease = () => {
    dispatch(increaseItem({ id, size }))
  }
  const handleDecrease = () => {
    dispatch(removeItem({ id, size }))
  }
  return (
    <tr className="text-center">
      <td className="cart__img-box">
        <img src={image} alt="" />
      </td>
      <td style={{ verticalAlign: 'middle' }}>{name}</td>
      <td style={{ verticalAlign: 'middle' }}>{size}</td>
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
