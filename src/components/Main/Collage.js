import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Collage = () => {
  return (
    <div>
      <Container className='mt-3'>
        <Row sm={1} xs={1} md={1} lg={3} className='d-flex flex-row w-100 m-auto mb-5'>
          <Col className='mt-5 justify-content-center d-flex'><img className='shadow-lg circle rounded' width={300} height={300}  src='/img/cvet3.jpg' alt='collage'/></Col>
          <Col className='mt-5 justify-content-center d-flex'><img className='shadow-lg circle rounded' width={300} height={300}  src='/img/cvet4.jpg' alt='collage'/></Col>
          <Col className='mt-5 justify-content-center d-flex'><img className='shadow-lg circle rounded' width={300} height={300}  src='/img/cvet5.jpg' alt='collage'/></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Collage