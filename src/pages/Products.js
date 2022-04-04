import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import api from "../api";
import cart from "../store/cart";
import user from "../store/user";

const ProductsCatList = () => {
  const location = useLocation();
  let obj = location.state;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/product/get/category/${obj.id}`).then((response) => {
      setData(response.data.values);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min_height">
      <h2 className="text-center pt-4">{obj.name}</h2>
      {loading ? (
        <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="success"></Spinner>
        </div>
      ) : (
        <Container>
          {data.length > 0 ? (
            <Row className="m-5" sm={1} md={2}>
              {data.map((item) => (
                <Col key={item.id} className="pt-3">
                  <Card className=" shadow-lg" >
                    <Card.Img
                      className="img_max_w"
                      variant="top"
                      src={item.photoUrl}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Цена: {item.price} руб.</ListGroup.Item>
                    </ListGroup>
                    <Card.Footer>
                      {user.auth ? (
                          <Button variant="success" onClick={()=>cart.addProduct(item)}>Добавить</Button>
                      ) : (
                        <h5>Авторизируйтесь что бы закать цветы</h5>
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <Alert variant="success" className="m-5">
              <Alert.Heading>
                Ой, извините, мы ещё не добавили товар
              </Alert.Heading>
              <p>В скором времени всё будет...</p>
            </Alert>
          )}
        </Container>
      )}
    </div>
  );
};

export default observer(ProductsCatList);
