import React, { useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import api from "../../api";
import { observer } from "mobx-react-lite";
import user from "../../store/user";
import role from "../../store/role";

// const ErrorsForm = () => {

// }

const ModalAuth = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [textError, setTextError] = useState("");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fio, setFio] = useState("");
  const [email, setEmail] = useState("");
  const [repPassword, setRepPassword] = useState("");

  const fetchSignIn = async () => {
    let data_body = JSON.stringify({ login, password });
    api
      .post(`/signin`, data_body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        user.setAuth(response.data.values.token);
        setShowSignIn(false);
        setShowError(false);
        setLogin("");
        setPassword("");
        role.getRole();
      })
      .catch((err) => {
        setTextError(err.response.data.values.message);
        setShowError(true);
      });
  };
  const fetchSignUp = async() => {
    if(password!==repPassword){
      return alert('Разные пароли')
    }
    let data = JSON.stringify({login,password,fio,email})
    api.post(`/signup`,data,{
      headers:{
        "Content-Type": "application/json",
      }
    }).then(response=>{
      alert(response.data.values.message)
    }).catch(err=>{
      alert(err.response.data.values.message)||alert(err)
    })
  }

  return (
    <div>
      <Button onClick={() => setShowSignIn(true)} type="button" variant="light">
        Авторизация
      </Button>
      <Button
        onClick={() => setShowSignUp(true)}
        type="button"
        className="ms-3"
        variant="success"
      >
        Регистрация
      </Button>
      <Modal centered show={showSignIn} onHide={() => setShowSignIn(false)}>
        <Modal.Header closeButton>
          <h3 className="m-auto ps-5">Авторизация</h3>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label className="mt-3">Логин</Form.Label>
            <Form.Control
              type="login"
              placeholder="Введите логин"
              autoFocus
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <Form.Label className="mt-3">Пароль</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="success" className="mt-3" onClick={fetchSignIn}>
              Авторизироваться
            </Button>
          </div>
          {showError ? (
            <Alert
              variant="danger"
              onClose={() => setShowError(false)}
              dismissible
              className="mt-4"
            >
              <Alert.Heading className="text-center fs-5">
                {textError}
              </Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
        </Modal.Body>
      </Modal>

      <Modal centered show={showSignUp} onHide={() => setShowSignUp(false)}>
        <Modal.Header closeButton>
          <h2>Регистрация</h2>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              type="login"
              placeholder="Введите логин"
            />
            <Form.Label className="mt-3">ФИО</Form.Label>
            <Form.Control
              value={fio}
              onChange={(e) => setFio(e.target.value)}
              type="name"
              placeholder="Введите ФИО"
            />
            <Form.Label className="mt-3">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              minLength={5}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label className="mt-3">Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите пароль"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label className="mt-3">Повторите пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите потворно пароль"
              minLength={8}
              value={repPassword}
              onChange={(e) => setRepPassword(e.target.value)}
            />
            <Form.Check className="mt-3" label="Подтвердите регистрацию" />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button onClick={fetchSignUp}  variant="success" className="mt-3">
              Зарегестрироваться
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default observer(ModalAuth);
