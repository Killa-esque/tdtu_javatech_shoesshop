import React, { useState } from 'react'
import logo from "../../../assets/img/logo.png";
import "../../../assets/css/form-bg.css";
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginSchema } from '../../../utils/validation/FormValidation';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardBody, Container, Label } from 'reactstrap';
import axios from 'axios';
import { history } from '../../..';
import { message } from 'antd';
import { loginAction } from '../../../redux/reducer/userReducer';
import { USER_LOGIN, USER_TOKEN, saveStore } from '../../../utils/config';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values, actions) => {
        try {
          const response = await axios.post("http://localhost:8080/api/auth/login", values);
          if (response.data.statusCode === 200) {
            const { accessToken, email } = response.data.content;
            saveStore(USER_LOGIN, email);
            saveStore(USER_TOKEN, accessToken);
            dispatch(loginAction({
              userLogin: email,
              userToken: accessToken
            }));
            history.push("/")
            window.location.reload()
            message.open({
              type: 'success',
              content: "Sign in successfully",
            });
          } else {
            message.open({
              type: 'error',
              content: 'Email và mật khẩu bạn nhập không kết nối với tài khoản nào'
            })
            console.error('Request failed with status code', response.status);
          }
        } catch (error) {
          message.open({
            type: 'error',
            content: 'Email và mật khẩu bạn nhập không kết nối với tài khoản nào'
          })
          console.error(error);
        }
      }}

    >
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit }) => (
        <Form id='form-background' className='pb-5 pt-3' onSubmit={handleSubmit}>
          <Container className="my-5 rounded d-flex justify-content-center">
            <Card>
              <CardBody className='d-flex flex-column justify-content-center py-5 px-5'>
                <div className='d-flex flex-row align-items-center'>
                  <div className='d-flex'>
                    <img className='' src={logo} alt="..." />
                    <h2 className="text-uppercase text-center mt-2 mx-3 fs-1" style={{ color: '#df2020', display: 'inline' }}>Shoes Store</h2>
                  </div>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', padding: 0 }}>Sign into your account</h5>
                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="email">
                  Email
                </Label>
                <Field
                  id="email"
                  name="email"
                  className={`form-control form-control-lg my-2 ${errors.email && touched.email ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="email" component="div" className='invalid-feedback' />
                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="password">
                  Password
                </Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className={`form-control form-control-lg my-2 ${errors.password && touched.password ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="password" component="div" className='invalid-feedback' />
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="btn btn-dark mt-2 fs-5 fw-bolder"
                  type='submit'
                >
                  Login
                </motion.button>
                <Link to={'/register'} className='mt-2' style={{ color: '#393f81', display: 'inline' }}>Register here</Link>
              </CardBody>
              <div className='text-center'>
                <p>© All rights reserved.</p>
              </div>
            </Card>
          </Container>
        </Form>
      )}
    </Formik >
  )
}

export default Login
