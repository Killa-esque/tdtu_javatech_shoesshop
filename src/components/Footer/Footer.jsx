// library
import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem} from 'reactstrap'
import { Link } from 'react-router-dom';
// logo
import logo from "../../assets/img/logo.png";
// css
import '../../assets/css/footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3' md='4' sm='6'>
            <div className="footer__logo text-start">
              <img src={logo} alt="logo" />
              <h5>Shoes Store</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Vel ad explicabo.
              </p>
            </div>
          </Col>
          <Col lg='3' md='4' sm='6'>
            <h5 className='footer__title'>Delivery Time</h5>
            <ListGroup className='delivery__time-list'>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Sunday - Thursday </span>
                <p>10:00am - 11:00pm</p>
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Friday - Saturday </span>
                <p>Off day</p>
              </ListGroupItem>
              
            </ListGroup>
          </Col>
          <Col lg='3' md='4' sm='6'>
          <h5 className='footer__title'>Delivery Time</h5>
            <ListGroup className='delivery__time-list'>
            <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Location: District 2, Hcm City, VN </span>
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Phone: 012345678 </span>
              </ListGroupItem>
              <ListGroupItem className='delivery__time-item border-0 ps-0'>
                <span>Email: email@gmail.com</span>
              </ListGroupItem>
              
            </ListGroup>
          </Col>
          <Col lg='3' md='4' sm='6'>
          <h5 className='footer__title'>Newsletter</h5>
            <p>Subcribe our newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder='Enter your email'/>
              <span><i className="ri-send-plane-line"></i></span>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col lg='6' md='6' >
            <p className='copyright__text'>Copyright - 2022, website made by Group 9. All Rights Reserved.</p>
          </Col>
          <Col lg='6' md='6'>
            <div className="social__links d-flex align-items-center gap-4 justify-content-end">
              <p className='mb-0'>Follow: </p>
              <span>
                <Link to='https://www.facebook.com/'><i className='ri-facebook-line'></i></Link>
              </span>
              <span>
                <Link to='https://www.github.com/'><i className='ri-github-line'></i></Link>
              </span>
              <span>
                <Link to='https://www.youtube.com/'><i className='ri-youtube-line'></i></Link>
              </span>
              <span>
                <Link to='https://www.linkedin.com/'><i className='ri-linkedin-line'></i></Link>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
