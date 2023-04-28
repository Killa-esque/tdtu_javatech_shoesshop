import React, { useState } from 'react'
import logo from "../../../assets/img/logo.png";
import "../../../assets/css/form-bg.css";
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { registerSchema } from '../../../utils/validation/FormValidation';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { Card, CardBody, Col, Container, Label, Row } from 'reactstrap';
import axios from 'axios';
import { message } from 'antd';
import { history } from '../../..';

const Register = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        username: "",
        phone: "",
        address: "",
        gender: "",
        confirmPassword: ""
      }}
      validationSchema={registerSchema}
      onSubmit={async (values) => {
        console.log(values)
        const userSignUp = { ...values, gender: !!values.gender }
        try {
          const response = await axios.post("http://localhost:8080/api/auth/signup", userSignUp);
          if (response.data.statusCode === 200) {
            message.open({
              type: 'success',
              content: "Your account is available now",
            });
            history.push("/login")
          } else {
            message.open({
              type: 'error',
              content: 'Failed to sign up'
            })
            console.error('Request failed with status code', response.status);
          }
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({ errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
        <Form id='form-background' className='pb-5 pt-3' onSubmit={handleSubmit}>
          <Container className="my-5 rounded">
            <Card>
              <CardBody className='d-flex flex-column justify-content-center py-5 px-5'>
                <div className='d-flex flex-row align-items-center'>
                  <div className='d-flex'>
                    <img className='' src={logo} alt="..." />
                    <h2 className="text-uppercase text-center mt-2 mx-3 fs-1" style={{ color: '#df2020', display: 'inline' }}>Shoes Store</h2>
                  </div>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px', padding: 0 }}>Sign up your new account</h5>
                <Row>
                  <Col>
                    <Label className='fw-bolder' style={{ marginBottom: 0 }} for="username">
                      Full Name
                    </Label>
                    <Field
                      id="username"
                      name="username"
                      className={`form-control form-control-lg my-2 ${errors.username && touched.username ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="name" component="div" className='invalid-feedback' />
                  </Col>
                  <Col>
                    <Label className='fw-bolder' style={{ marginBottom: 0 }} for="email">
                      Email
                    </Label>
                    <Field
                      id="email"
                      name="email"
                      className={`form-control form-control-lg my-2 ${errors.email && touched.email ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="email" component="div" className='invalid-feedback' />
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                  </Col>
                  <Col>
                    <Label className='fw-bolder' style={{ marginBottom: 0 }} for="confirmPassword">
                      Confirm Password
                    </Label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className={`form-control form-control-lg my-2 ${errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="confirmPassword" component="div" className='invalid-feedback' />
                  </Col>
                </Row>
                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="phone">
                  Phone Number
                </Label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                  className={`form-control form-control-lg my-2 ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="phone" component="div" className='invalid-feedback' />
                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="gender">
                  Gender
                </Label>
                <Field
                  id="gender"
                  name="gender"
                  component="select"
                  className={`form-control form-control-lg my-2 ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                >
                  <option value={null}>Select gender</option>
                  <option value={true}>Male</option>
                  <option value={false}>Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className='invalid-feedback' />


                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="btn btn-dark mt-2 fs-5 fw-bolder"
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Loading..." : "Register"}

                </motion.button>
                <Link to={'/login'} className='mt-2' style={{ color: '#393f81', display: 'inline' }}>Already have an account?</Link>
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

export default Register
