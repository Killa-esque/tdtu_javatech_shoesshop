//Hook
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Libraries
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Table, Container, Card, CardBody, CardText, Breadcrumb, BreadcrumbItem, Label, CardImg } from 'reactstrap';
import classnames from 'classnames';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik';
// css
import '../../../assets/css/profile.css'

// Create form & Validation
import { history } from '../../..';
import { USER_LOGIN, USER_TOKEN, getStore } from '../../../utils/config';
import { getProfileAction } from '../../../redux/reducer/userReducer';
import { Tag, message, Form as AntdForm, Input, Button, Modal } from 'antd';
import { userService } from '../../../service/userService';
import axios from 'axios';
import { profileSchema } from '../../../utils/validation/FormValidation';


const Profile = () => {
  const disatch = useDispatch();
  const [form] = AntdForm.useForm();
  const [visible, setVisible] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [activeTab, setactiveTab] = useState('1');
  const [pageNumber, setPageNumber] = useState(0);
  const dispatch = useDispatch();

  // Number of product for each page
  const productPerTab = 5;
  // Get the visited page
  const vistedPage = pageNumber * productPerTab;
  // Show the product each page
  const displayPage = userProfile?.orders?.slice(
    vistedPage,
    vistedPage + productPerTab
  );
  // Calculate the page
  const pageCount = Math.ceil(userProfile?.orders?.length / productPerTab);
  // Function to paginate
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // Change tab between User Orderd & User Favorite tab
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  }


  const onFinish = (values) => {
    userService.updatePassword(values)
      .then(res => {
        console.log(res)
        message.open({
          type: 'success',
          content: 'Đổi mật khẩu thành công'
        })
      })
      .catch(err => {
        message.open({
          type: 'error',
          content: 'Đổi mật khẩu thất bại'
        })

      })
  };

  const onCancel = () => {
    setVisible(false);
  }

  const handleGetProfile = () => {
    if (getStore(USER_TOKEN) && getStore(USER_LOGIN)) {
      userService.getProfile()
        .then(res => {
          console.log(res)
          setUserProfile(res.data.content)
        })
        .catch(err => {
          console.log(err)
        })
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <section style={{ backgroundColor: "#eee", padding: "50px 0 0 0" }}>
        <Container>
          <Row>
            <Col>
              <Breadcrumb className="bg-light rounded-3 p-3 mb-4">
                <BreadcrumbItem>
                  <NavLink to="/">Home</NavLink>
                </BreadcrumbItem>
                <BreadcrumbItem to="/profile" active>
                  User Profile
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>

          <Row className='align-items-stretch'>
            <Col lg="4">
              <Card className="mb-4 pb-3 h-100">
                <h3 className='text-center pt-5'>My Profile</h3>
                <h3 className='container'>
                  <hr className='fw-bold' />
                </h3>
                <CardBody className="text-center d-flex flex-column align-items-center justify-content-center">
                  <CardImg
                    src='https://i.pravatar.cc/400?img=62'
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                    fluid
                  />
                  <h5 className="text-muted mb-1 mt-2">
                    User ID: #000{userProfile.id}
                  </h5>
                  <h5 className="text-muted mb-4 mt-2">
                    Xin chào {userProfile.username} !
                  </h5>
                </CardBody>
              </Card>
            </Col>
            <Col lg="8">
              <Card className="mb-4 h-100">
                <CardBody>
                  <Formik
                    initialValues={{
                      email: userProfile?.email,
                      passwordConfirm: '',
                      username: userProfile?.username,
                      phone: userProfile?.phone,
                      address: userProfile?.address,
                      gender: userProfile?.gender,
                      age: userProfile?.age,
                    }}
                    validationSchema={profileSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        userService.updateProfile(values)
                          .then((res) => {
                            console.log(res)
                            window.location.reload()
                            message.open({
                              type: 'success',
                              content: 'Cập nhật thành công',
                              className: 'custom-class',
                              style: {
                                marginTop: '20vh',
                              },
                              duration: 10
                            })
                          })
                          .catch((err) => {
                            console.log(err)
                          })
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ errors, touched, values, handleBlur, handleChange, handleSubmit, isSubmitting }) => {
                      console.log(values)
                      return (
                        <Form className='' onSubmit={handleSubmit}>
                          <Container className="rounded p-3">
                            <Row>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="email">
                                  Email
                                </Label>
                                <Field
                                  disabled
                                  id="email"
                                  name="email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control form-control-lg my-2 ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="email" component="div" className='invalid-feedback' />
                              </Col>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="username">
                                  Username
                                </Label>
                                <Field
                                  id="username"
                                  name="username"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control form-control-lg my-2 ${errors.username && touched.username ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="name" component="div" className='invalid-feedback' />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="phone">
                                  Phone Number
                                </Label>
                                <Field
                                  id="phone"
                                  name="phone"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="text"
                                  className={`form-control form-control-lg my-2 ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="phone" component="div" className='invalid-feedback' />
                              </Col>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="gender">
                                  Gender
                                </Label>
                                <Field
                                  id="gender"
                                  name="gender"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  component="select"
                                  className={`form-control form-control-lg my-2 ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                >
                                  <option value={'default'}>Select gender</option>
                                  <option value='male'>Male</option>
                                  <option value='female'>Female</option>
                                </Field>
                                <ErrorMessage name="gender" component="div" className='invalid-feedback' />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="passwordConfirm">
                                  Password
                                </Label>
                                <Field
                                  id="passwordConfirm"
                                  name="passwordConfirm"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  type="password"
                                  className={`form-control form-control-lg my-2 ${errors.passwordConfirm && touched.passwordConfirm ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="password" component="div" className='invalid-feedback' />
                              </Col>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="age">
                                  Age
                                </Label>
                                <Field
                                  id="age"
                                  name="age"
                                  type="number"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control form-control-lg my-2 ${errors.age && touched.age ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="age" component="div" className='invalid-feedback' />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <Label className='fw-bolder' style={{ marginBottom: 0 }} for="address">
                                  Address
                                </Label>
                                <Field
                                  id="address"
                                  name="address"
                                  type="address"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  // value={address}
                                  className={`form-control form-control-lg my-2 ${errors.address && touched.address ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="address" component="div" className='invalid-feedback' />
                              </Col>
                            </Row>
                            <motion.button
                              whileTap={{ scale: 1.1 }}
                              className="btn btn-dark mt-3 fs-5 fw-bolder w-100"
                              type='submit'
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Loading..." : "Update"}

                            </motion.button>
                          </Container>
                        </Form>
                      )
                    }}
                  </Formik >
                  <h5 className='text-info mx-3 btn' style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => { setVisible(true) }}>
                    Đổi mật khẩu
                  </h5>
                  <Modal
                    title="Đổi mật khẩu"
                    open={visible}
                    onCancel={onCancel}
                    footer={[
                      <Button key="back" onClick={onCancel}>
                        Đóng
                      </Button>,
                      <Button key="submit" type="primary" onClick={() => form.submit()}>
                        Đổi mật khẩu
                      </Button>,
                    ]}
                  >
                    <AntdForm
                      form={form}
                      name="change_password"
                      onFinish={onFinish}
                      layout="vertical"
                      initialValues={{
                        passwordConfirm: '',
                        passwordNew: ''
                      }}
                    >
                      <AntdForm.Item
                        name="passwordConfirm"
                        label="Mật khẩu hiện tại"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu hiện tại',
                          },
                        ]}
                      >
                        <Input.Password />
                      </AntdForm.Item>

                      <AntdForm.Item
                        name="passwordNew"
                        label="Mật khẩu mới"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu mới',
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('old_password') !== value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                'Mật khẩu mới không được giống với mật khẩu hiện tại'
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password />
                      </AntdForm.Item>
                    </AntdForm>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='p-5' style={{ backgroundColor: '#eee', padding: '50px 0 0 0' }}>
        <div className='container bg-white rounded-3 p-3 mb-4'>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
                style={{
                  cursor: 'pointer'
                }}
              >
                Order history
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Size</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProfile?.orders?.length !== 0 ? (
                      <>
                        {displayPage?.map((order, index) => {
                          return (
                            <Fragment key={index}>
                              <tr>
                                <td colSpan={12} className="order__date">
                                  <span>Order date:</span>{" "}
                                  {moment(order.date).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                  <span className='mx-3'>Address:</span>{" "}
                                  {order.address}
                                  <span className='mx-3'>Status:</span>{" "}
                                  {order.status}
                                </td>
                              </tr>
                              <Tr item={order.products} />
                            </Fragment>
                          );
                        })}
                      </>
                    ) : (
                      <tr className='w-100 text-center fs-4 fw-bold' style={{ textDecoration: 'none' }}>
                        <td className='p-5' colSpan={6}>No product founded!!</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div>
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel="Prev"
                    nextLabel="Next"
                    containerClassName="paginationBtns"
                  />
                </div>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </section>
    </>
  )
}
const Tr = ({ item }) => {
  return (
    <>
      {item?.map((detail, index) => {
        const { id, name, price, image, quantity, size } = detail;
        return (
          <tr className="text-center profile__detail" key={index}>
            <td className="cart__img">
              <img src={image} alt="" />
            </td>
            <td>{name}</td>
            <td>
              <Tag color="red">Size: {size}</Tag>
            </td>
            <td>
              <Tag color="red">x{quantity}</Tag>
            </td>
            <td>${price * quantity}</td>
          </tr>
        );
      })}
    </>
  );
};

export default Profile
