import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";
import api from "../../../api";

const AdminProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get(`/product/get`)
      .then((response) => {
        setData(response.data.values);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const [id, setId] = useState("");
  const [showRead, setShowRead] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // Редактирование продукта
  const fetchReadProduct = () => {
    const dataJson = JSON.stringify({
      id,
      name,
      description,
      price,
      category_id: categoryId,
    });
    api
      .post(`/product/read`, dataJson, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Вы изменили товар");
        setCategoryId("");
        setName("");
        setPrice("");
        setDescription("");
        setData(response.data.values);
        setShowRead(false)
      })
      .catch((err) => console.log(err));
  };
  //Удаление продукта
  const fetchDelProduct = (id) => {
    api
      .post(`/product/del`, JSON.stringify({ id: id }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Продукт успешно удалён");
        setData(response.data.values);
      })
      .catch((err) => console.log(err));
  };
  //Добавление продукта
  const [showAdd, setShowAdd] = useState(false);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState();
  const fetchAddProduct = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    api
      .post(`/product/add`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        alert("Вы добавили продукт");
        setData(response.data.values);
        setCategoryId("");
        setFile();
        setName("");
        setPrice("");
        setDescription("");
        setShowAdd(false);
      })
      .catch((err) => {
        alert(err.response.data.values.message);
      });
  };
  useEffect(() => {
    api
      .get(`/category/get`)
      .then((response) => {
        setCategory(response.data.values);
      })
      .catch((error) => {
        console.log(`Ошибка - ${error}`);
      });
  }, []);
  return (
    <>
      {!loading ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>№</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Цена</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setShowRead(true);
                        setId(item.id);
                      }}
                      variant="secondary"
                    >
                      Редактировать
                    </Button>
                    <Button
                      className="ms-1"
                      onClick={() => fetchDelProduct(item.id)}
                      variant="danger"
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
              <Modal centered show={showRead} onHide={() => setShowRead(false)}>
                <Modal.Header closeButton>Редактировать товар</Modal.Header>
                <Modal.Body>
                  <FormGroup>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      as="textarea"
                    ></Form.Control>
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-2">Категория</Form.Label>
                    <Form.Select
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      {category.map((i) => (
                        <option value={i.id} key={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </Form.Select>
                  </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => fetchReadProduct()} variant="success">
                    Изменить
                  </Button>
                </Modal.Footer>
              </Modal>
            </tbody>
          </Table>
          <div className="mt-5 mb-3 text-end me-5">
            <Button onClick={() => setShowAdd(true)} variant="success">
              Добавить продукт
            </Button>
          </div>
          <Modal centered show={showAdd} onHide={() => setShowAdd(false)}>
            <Modal.Header closeButton>Добавление продукт</Modal.Header>
            <Modal.Body>
              <FormGroup>
                <Form.Label className="mt-2">Название</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Описание</Form.Label>
                <Form.Control
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Цена</Form.Label>
                <Form.Control
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
                <Form.Label className="mt-2">Категория</Form.Label>
                <Form.Select onChange={(e) => setCategoryId(e.target.value)}>
                  {category.map((i) => (
                    <option value={i.id} key={i.id}>
                      {i.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Label className="mt-2">Фото</Form.Label>
                <Form.Control
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={fetchAddProduct}>
                Добавить продукт
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

export default AdminProduct;
