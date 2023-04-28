import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import serviceData from '../../assets/data/serviceData'
import '../../assets/css/service.css'
const Service = () => {
  return (
    <Container>
        <Row>
            {
                serviceData.map((data, index) => {
                    return (
                        <Col lg='3' md='6' sm='6' xs='6' className='mb-3' key={index}>
                        <div className="service__item">
                            <motion.span whileTap={{scale: 1.1}}><i className={data.icon}></i></motion.span>
                            <div>
                                <h3>{data.title}</h3>
                                <p>{data.subtitle}</p>
                            </div>
                        </div>
                    </Col>
                    )
                })
            }
        </Row>
    </Container>
  )
}

export default Service
