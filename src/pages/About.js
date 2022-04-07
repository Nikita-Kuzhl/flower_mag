import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";

const About = () => {
  return (
    <div className="mb-5">
      <h2 className="text-center mt-5">Где нас найти</h2>
      <Container className="mt-5 ps-5 pt-5 pb-5 border border-success">
        <Row md={1} lg={2}>
          <Col>
            <h5 className="pt-5">Адрес:</h5>
            <h6>г. Иваново, ул. Шевченко, д. 2.</h6>
            <h5 className="pb-2">Телефон:</h5>
            <h6 className="pb-2"> +7 930 341 84 61</h6>
            <h5 className="pb-2">Email:</h5>
            <h6 className="pb-2">Marya.ivanova.17@inbox.ru</h6>
            <h5 className="pb-2">Соц. сети:</h5>
            <div className="d-flex pb-5 mb-2">
              <Nav.Link href="https://vk.com/roza5080">
                <img src="/img/vc.png" alt="" />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/cvetochnidomik/">
                <img src="/img/insta.png" alt="" />
              </Nav.Link>
            </div>
          </Col>
          <Col>
          <div className=" d-flex justify-content-center text-center">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4b4239ceaa99714197012b7e37858d4a1d55f32b0ff50bd07edfbb05bb466f4e&amp;source=constructor"
              width="500"
              height="400"
              className=" shadow-sm border rounded"
              title="Map"
            ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
