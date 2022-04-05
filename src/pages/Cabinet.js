import React, { useEffect, useState } from "react";
import {
  Container,
  Tab,
  Tabs,
} from "react-bootstrap";
import api from "../api";
import AllOrderTable from "../components/Cabinet/AllOrderTable";
import NewOrderTable from "../components/Cabinet/NewOrderTable";


const Client = () => {
  const [data,setData] = useState(true)
  const [loading,setLoading] = useState([])
  const fetchData = () => {
    api
    .get(`/user/order/get`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setData(response.data.values)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{fetchData()},[])
  return (
    <Container className="text-center pt-4 min_height">
      <h2 className="pb-3">Заказы</h2>

      <Tabs
        defaultActiveKey="profile"
        className="mb-3"
      >
        <Tab eventKey="home" title="Все заказы">
          <AllOrderTable data = {data} loading={loading} />
        </Tab>
        <Tab eventKey="profile" title="Новые заказы">
        <NewOrderTable data = {data} loading={loading}/>
        </Tab>
      </Tabs>


    </Container>
  );
};

export default Client;
