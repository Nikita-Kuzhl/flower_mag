import React from "react";
import { Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const Slider = () => {
  return (
    <div>
      {" "}
      <Container>
        <Carousel className="mb-5 mt-5 shadow-lg">
          <Carousel.Item>
            <Link to="/catalog" className="m-0 p-0">
              <img
                className="d-block w-100"
                src="/img/slider.jpg"
                alt="slider"
              />
            </Link>
          </Carousel.Item>
          <Carousel.Item>
            <Link to="/catalog" className="m-0 p-0">
              <img
                className="d-block w-100"
                src="/img/slider.jpg"
                alt="slider"
              />
            </Link>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  );
};

export default Slider;
