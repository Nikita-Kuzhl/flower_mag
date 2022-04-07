import React from 'react'
import {
  Table,
  Spinner
} from "react-bootstrap";

const AllOrderTable = (props) => {
  console.log(props.data);
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
                  {props.data.some(item=>item.status==="Отказ")?<th>Комментарий</th>:<></>}
                </tr>
              </thead>
              <tbody>
                {props.data.map((item) => (
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
                    {item.status==="Отказ"?<td>{item.comment}</td>:<td></td>}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  )
}

export default AllOrderTable