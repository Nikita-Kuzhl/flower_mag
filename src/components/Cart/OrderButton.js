import React, {  useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import api from "../../api"
import cart from '../../store/cart'

const OrderButton = () => {
  const [show,setShow] = useState(false)
  const [password,setPassword] = useState('')
  const fetchOrder = () => {
    let data = JSON.stringify({password,products:cart.cart})
    api.post(`/order/add`,data,{
      headers:{
        "Content-Type": "application/json",
        'Authorization':localStorage.getItem('token')
      }
    }).then(response=>{
      alert(response.data.values.message)
      cart.addOrder()
      setShow(false)
    }).catch(err=>{
      alert(err.response.data.values.message)
    })
  }

  return (
    <>
      <Button onClick={()=>setShow(true)} size="lg" variant="success" className="mt-4 me-5">Заказать</Button>
      <Modal centered show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>Заказ</Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Введите пароль для подтверждения</Form.Label>
              <Form.Control
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                type="password"
                autoFocus
              />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={fetchOrder} variant='success'>Подтвердить</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default observer(OrderButton)