import React, { useEffect, useState } from 'react'
import Helmet from '../../../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'
import { productsFake } from '../../../assets/data/products'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';
// css
import "../../../assets/css/hero-section.css";
import "../../../assets/css/home.css";
import { productService } from '../../../service/productService';
import { message } from 'antd';
import ProductCard from '../../../components/ProductCard/ProductCard';
import Service from '../../../components/Service/Service';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../../redux/reducer/productReducer';


const Home = () => {
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([])
  const { totalAmount, productCart } = useSelector(
    (state) => state.products
  );
  const getAllProducts = () => {
    productService.getProductList()
      .then(res => {
        dispatch(getAllProductsAction(res.data))
        localStorage.setItem('productList', JSON.stringify(res.data))
        setProducts(res.data)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  }

  const getAllBrands = () => {
    productService.getBrandList()
      .then(res => {
        setBrands(res.data)
        // console.log(brands)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  }

  const handleGetProductByBrands = (id) => {
    productService.getProductByBrands(id)
      .then(res => {
        // console.log(first)
        setProducts(res.data)
      })
      .catch(err => {
        message.open("Get data failed !!!")
        console.log(err)
      })
  };

  useEffect(() => {
    getAllProducts()
    getAllBrands()
  }, [])

  useEffect(() => {
    localStorage.setItem('productCart', JSON.stringify(productCart))
    localStorage.setItem('totalAmount', totalAmount)
  }, [productCart, totalAmount])

  return (
    <Helmet title={"Home"}>
      <Container>
        <Row>
          <Swiper
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}

            modules={[Autoplay]}
            className="mySwiper">
            {
              productsFake.reverse().map(product => (
                <SwiperSlide>
                  <Col lg="6" md="6" className="hero__container">
                    <div className="hero__content">
                      <h5 className="mb-3">Super charge your progress</h5>
                      <h1 className="mb-4 hero__title">
                        <span>WANNA?</span> Beat the <br /> buzzer{" "}
                        <span> at bellow</span>
                      </h1>
                      <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Beatae at voluptatem aperiam, quod soluta sequi?
                      </p>
                      <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                        <motion.button
                          whileTap={{ scale: 1.1 }}
                          className="order__btn d-flex align-items-center justify-content-between"
                        >
                          Order now
                          <i className="ri-arrow-right-s-line"></i>
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 1.1 }}
                          className="all__products-btn"
                        >
                          <Link to="/products">See all shoes</Link>
                        </motion.button>
                      </div>
                      <div className="d-flex align-items-center gap-5 mt-5 hero__service">
                        <p className="d-flex align-items-center gap-2">
                          <span className="shipping__icon">
                            <i className="ri-car-line"></i>
                          </span>
                          <span> No shipping charge</span>
                        </p>
                        <p className="d-flex align-items-center gap-2">
                          <span className="shipping__icon">
                            <i className="ri-shield-check-line"></i>
                          </span>
                          <span> 100% secure checkout</span>
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6" md="6" className="hero__container">
                    <div className="hero__img">
                      <img
                        src={product.image}
                        alt="hero-img"
                        className="w-100 "
                      />
                    </div>
                  </Col>
                </SwiperSlide>
              ))
            }
          </Swiper>

          {/* ================= Serivce ============= */}
          <section className="pt-0">
            <Service />
          </section>

          <section>
            <Container>
              <Row>
                <Col lg="12" className="text-center">
                  <h5 className="feature__subtitle mb-4">
                    Who are you shopping for?
                  </h5>
                  <h2 className="feature__title">Gift for you, from you</h2>
                  <h2 className="feature__title">
                    You work hard <span>gift hard</span>
                  </h2>
                  <p className="mb-1 mt-4 feature__text">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque,
                    odio?
                  </p>
                  <p className="feature__text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Assumenda, eius.
                  </p>
                </Col>

                <Col lg="4" md="4">
                  <div className="feature__item"></div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* ================= Product List ============= */}
          <section className="pt-0">
            <Container>
              <Row>
                <Col lg="12">
                  <div className="product__category d-flex align-items-center justify-content-center gap-5">
                    <motion.button
                      whileFocus={{
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        color: "#df2020",
                      }}
                      onClick={getAllProducts}
                    >
                      All
                    </motion.button>
                    {brands.map((brand) => {
                      return (
                        <motion.button
                          whileFocus={{
                            backgroundColor: "#fff",
                            borderRadius: "5px",
                            color: "#df2020",
                          }}
                          onClick={() => {
                            handleGetProductByBrands(brand.id);
                          }}
                        >
                          {brand.name}
                        </motion.button>
                      )
                    })}
                  </div>
                </Col>

                {products.length === 0 ? (
                  <Col lg="12" className="mt-5">
                    <h5 className='text-center p-5'>No products found</h5>
                  </Col>
                ) : (
                  products.map((product, index) => (
                    <Col key={index} lg="3" md="4" sm='6' xs='6' className="mt-5">
                      <ProductCard product={product} />
                    </Col>
                  ))
                )}
              </Row>
            </Container>
          </section>
        </Row>
      </Container>
    </Helmet>
  )
}

export default Home
