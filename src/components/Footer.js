import React from 'react'
import {Navbar,Row,Col,Container,Nav} from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Navbar className='color_default p-5' variant='dark'>
        <Container>
        <Row xs={1} sm={1} lg={3} className='w-100'>
          <Col className='d-flex justify-content-center align-middle'>
            <img className='icon_size' alt='geo' src='/img/geo-alt-fill.svg'/>
            <h5 className='ms-3 mt-2 no_transfer'>г. Иваново, ул. Шевченко, д. 2.</h5>
          </Col>
          <Col className='d-flex justify-content-center align-middle'>
            <Nav.Link href='https://vk.com/roza5080'><img src='/img/vc.png' alt=''/></Nav.Link>
            <Nav.Link href='https://www.instagram.com/cvetochnidomik/'><img src='/img/insta.png' alt=''/></Nav.Link>
          </Col>
          <Col className='d-flex justify-content-center text-center'>
          <img className='icon_size' alt='telephone' src='/img/telephone.svg'/>
          <h5 className=' ms-3 mt-2 no_transfer'>+7 (930) 234-84-61</h5>
          </Col>
        </Row>
        </Container>
      </Navbar>
    </footer>
  )
}

export default Footer