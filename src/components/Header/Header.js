import React, { useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cart from "./CartButton";
import ModalAuth from "./ModalAuth";
import { observer } from "mobx-react-lite";
import user from "../../store/user";
import ExitButton from "./ExitButton";
import role from "../../store/role";

const Header = () => {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="md"
        variant="dark"
        className="color_default no_transfer"
      >
        <Container>
          <Navbar.Brand>
            <img alt="" src="/img/logo.png" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/"
                className="ps-3 text-dark text-decoration-none text-center fs-5"
              >
                О нас
              </Link>
              <Link
                to="/catalog"
                className="ps-3 text-dark text-decoration-none text-center fs-5"
              >
                Каталог
              </Link>
              <Link
                to="/about"
                className="ps-3 text-dark text-decoration-none text-center fs-5"
              >
                Где нас найти
              </Link>
            </Nav>
            <div className="text-center">
              {!user.auth ? (
                <ModalAuth />
              ) : (
                <>
                  <Cart />
                  {role.isAdmin ? (
                    <Link to="/admin" className="ms-4">
                      <Button variant="success">Админ панель</Button>
                    </Link>
                  ) : (
                    <Link to="/cabinet" className="ms-4">
                      <Button variant="success">Личный кабинет</Button>
                    </Link>
                  )}
                  <ExitButton />
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default observer(Header);
