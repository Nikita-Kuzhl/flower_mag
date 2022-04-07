import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import api from "../../api";

const AdminTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchGetOrder = async () => {
    api
      .get(`/order/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.values);
        setSortData(response.data.values);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchGetOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [sortType, setSortType] = useState("all");
  const [sortData, setSortData] = useState([]);
  const sortArray = (type) => {
    const types = {
      all: "Все",
      new: "Новый",
      success: "Подтверждено",
      cancel: "Отказ",
    };
    const sortProperty = types[type];
    let sorted = [];
    sortProperty === "Все"
      ? (sorted = [...data])
      : (sorted = [...data].filter((a) => a.status === sortProperty));
    setSortData(sorted);
    setLoading(false);
  };
  useEffect(() => {
    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  //Отказ

  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");

  const fetchCanOrder = async (id) => {
    let body_data = JSON.stringify({ id: id, comment });
    await api
      .post(`/admin/order/refusal`, body_data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert('Вы отменили заказ');
        setData(response.data.values)
        setComment("");
      })
      .catch((err) => console.log(err));
  };
  //Подтверждение
  const fetchSucOrder = async (id) => {
    await api
      .post(`/admin/order/confirm`, JSON.stringify({ id: id }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert('Вы подтвердили заказ');
        setData(response.data.values)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!loading ? (
        <>
          {sortData.length >= 0 ? (
            <>
              <div className="d-flex justify-content-end">
                <Form.Select
                  onChange={(e) => setSortType(e.target.value)}
                  style={{ minWidth: "150px" }}
                  className="w-25"
                >
                  <option value="all">Все заказы</option>
                  <option value="new">Новые</option>
                  <option value="success">Подтвержденные</option>
                  <option value="cancel">Отмененные</option>
                </Form.Select>
              </div>

              <Table className="mt-4">
                <thead>
                  <tr>
                    <th>№</th>
                    <th>Время</th>
                    <th>ФИО</th>
                    <th>Товары</th>
                    {sortType === "new" ? <th>Действия</th> : <></>}
                  </tr>
                </thead>
                <tbody>
                  {sortData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.date}</td>
                      <td>{item.FIO || ""}</td>
                      <td>
                        {item.products.map((i) => (
                          <div key={i.id}>
                            {i.name} - {i.quantity}
                          </div>
                        ))}
                      </td>
                      {sortType === "new" ? (
                        <td>
                          <Button
                            variant="success"
                            onClick={() => fetchSucOrder(item.id)}
                          >
                            Подтвердить
                          </Button>
                          <Button
                            onClick={() => setShow(true)}
                            variant="danger"
                          >
                            Отменить
                          </Button>
                        </td>
                      ) : (
                        <></>
                      )}
                      <Modal centered show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>Отменить заказ</Modal.Header>
                        <Modal.Body>
                          <FormGroup>
                            <Form.Label>Введить причину отказа</Form.Label>
                            <Form.Control
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              as="textarea"
                            ></Form.Control>
                          </FormGroup>
                        </Modal.Body>
                        <Modal.Footer>
                          <div className="text-end">
                            <Button
                              variant="danger"
                              onClick={() => fetchCanOrder(item.id)}
                            >
                              Отменить
                            </Button>
                          </div>
                        </Modal.Footer>
                      </Modal>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <h3>Нету заказов</h3>
          )}
        </>
      ) : (
        <>
          <Spinner animation="border" role="status" />
        </>
      )}
    </>
  );
};

export default AdminTable;
