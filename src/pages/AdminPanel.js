import React from "react";
import { Container, Tab, Tabs} from "react-bootstrap";
import AdminCategory from "../components/AdminPanel/AdminCategory";
import AdminProduct from "../components/AdminPanel/AdminProduct";
import AdminTable from "../components/AdminPanel/AdminTable";

const AdminPanel = () => {


  return (
    <Container className="min_height text-center pt-4">
      <h2 className="pb-3">Админ панель</h2>

      <Tabs
        defaultActiveKey="table"
        className="mb-3"
      >
        <Tab eventKey="table" title="Заказы">
          <AdminTable />
        </Tab>
        <Tab eventKey="product" title="Товары">
        <AdminProduct/>
        </Tab>
        <Tab eventKey="category" title="Категории">
        <AdminCategory/>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AdminPanel;
