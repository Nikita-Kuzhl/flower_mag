import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Spinner, Table } from "react-bootstrap";
import api from "../../api";

const AdminCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/category/get`)
      .then((response) => {
        setData(response.data.values);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const fetchDelCategory = (id) => {
    api
      .post(`/category/del`, JSON.stringify({ id: id }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert('Заявка удалена');
        setData(response.data.values);
      })
      .catch((err) => console.log(err));
  };
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const fetchAddCategory = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    api
      .post(`/category/add`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Категория успешно добавлена");
        setData(response.data.values);
        setShow(false)
        setName('')
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {!loading ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>№</th>
                <th>Название</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <Button
                      onClick={() => fetchDelCategory(item.id)}
                      variant="danger"
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="text-end m-4">
            <Button onClick={() => setShow(true)} variant="success">
              Добавить категорию
            </Button>
          </div>
          <Modal centered show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>Добавить категорию</Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label className="mt-2">Название</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                ></Form.Control>
                <Form.Label className="mt-2">Название</Form.Label>
                <Form.Control
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                ></Form.Control>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={fetchAddCategory} variant="success">
                Добавить
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default AdminCategory;
