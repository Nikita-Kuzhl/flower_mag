import React from "react";
import {Container} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import cart from "../store/cart";
import OrderButton from "../components/Cart/OrderButton";
import OrderTable from "../components/Cart/OrderTable";

const Cart = () => {
  return (
    <Container className="text-center min_height">
      <h3 className="pt-4">Корзина</h3>
      <div className="pt-4">
        {cart.cart.length > 0 ? (
          <>
            <OrderTable/>
          <Container className="text-end mb-4">
                <h3>Стоимость - {cart.price} руб.</h3>
                <OrderButton/>
          </Container>
          </>
        ) : (
          <h4>Вы не добавили товар...</h4>
        )}
      </div>
    </Container>
  );
};

export default observer(Cart);
