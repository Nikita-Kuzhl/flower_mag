import React from "react";
import { Table, Spinner, CloseButton } from "react-bootstrap";
import api from "../../api";

const NewOrderTable = (props) => {
  const delOrder =(id)=>{
    api.post(`/order/del`,JSON.stringify({id:id}),{
      headers:{
        "Content-Type": "application/json",
        'Authorization':localStorage.getItem('token')
      }
    }).then(()=>{
      return 
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      {props.loading ? (
        <Spinner animation="border" role="status" variant="success"></Spinner>
      ) : (
        <>
          {props.data.length === 0 ? (
            <h4 className="pt-5">Нету заказов...</h4>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>№ Заказа</th>
                  <th>Наименования</th>
                  <th>Статус</th>
                  <th>Отменить</th>
                </tr>
              </thead>
              <tbody>
                {props.data.filter((item) => item.status === "Новый").map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.products.map((val) => (
                        <div key={val.id}>
                          {val.name} - {val.quantity}
                        </div>
                      ))}
                    </td>
                    <td>{item.status}</td>
                    <td>
                      <CloseButton onClick={()=>delOrder(item.id)}></CloseButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default NewOrderTable;
