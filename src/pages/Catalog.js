import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../api";

const Catalog = () => {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    api
      .get(`/category/get`)
      .then((response) => {
        setData(response.data.values);
        setLoading(false)
      })
      .catch((error) => {
        alert(`Ошибка - ${error}`);
      });
  }, []);

  return (
    <div style={{minHeight:'680px'}}>
      <Container className="pt-5 pb-5">
        <h2 className="text-center">Каталог</h2>
        {loading ? (
        <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="success"></Spinner>
        </div>
      ) :(
        <Row
          lg={3}
          md={2}
          sm={1}
          xs={1}
          className="d-flex justify-content-center flex-row"
        >
          {data.map((item) => (
            <Col key={item.id} className="m-5">
              <Link to={`/category/${item.id}`} state={item}>
                <img className=" shadow-lg" alt="" src={item.photoUrl} />
              </Link>
            </Col>
          ))}
        </Row>
      )}
      </Container>
    </div>
  );
};

export default Catalog;
