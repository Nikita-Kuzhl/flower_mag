import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import api from "../../api";

const Client = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/user/order/get`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.values);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container className="text-center pt-4 min_height">
      <h2 className="pb-3">Заказы</h2>
      {loading ? (
        <Spinner animation="border" role="status" variant="success"></Spinner>
      ) : (
        <Table>
          {data.length === 0 ? (
            <h4 className="pt-5">Нету заказов...</h4>
          ) : (
            <>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Наименования</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>
                    {item.products.map(val=>(
                      <div>{val.name} - {val.quantity}</div>
                    ))}
                    </td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </Table>
      )}
    </Container>
  );
};

export default Client;
