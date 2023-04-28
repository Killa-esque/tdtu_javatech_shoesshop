import React from 'react'
import { Container } from 'reactstrap'
import '../../assets/css/common-section.css'
const CommonSection = ({ title }) => {
  return (
    <section className='common__section'>
        <Container>
            <h2 className='text-white text-center'>{title}</h2>
        </Container>
    </section>
  )
}

export default CommonSection
