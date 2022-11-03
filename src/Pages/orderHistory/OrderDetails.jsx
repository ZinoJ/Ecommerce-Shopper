import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import spinnerImg from "../../Assets/spinner.jpg"
import useFetchDocument from '../../CustomHooks/useFetchDocument'

function OrderDetails() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [order,setOrder] = useState(null)
  const {document} = useFetchDocument('orders', id)
  useEffect(() => {
    setOrder(document)
  },[document])
  
  return (
    <div className="checkout__details table" >
      <h2>Order Details</h2>
      <div>
        <p onClick={() => navigate('/order_history')} style={{cursor: 'pointer'}}>&larr; Back to Orders</p>
      </div>
      <br />
      {order === null ? (
        <img src={spinnerImg} alt="Loading ..." width={50}/>
      ) : (
        <>
        <p><b>Order ID :</b> {order.id}</p>
        <p><b>Order Amount :</b> ${order.orderAmount}</p>
        <p><b>Order Status :</b>{order.orderStatus}</p>
        <br />
        <table>
          <thead>
            <tr>
              <th>s/n</th>
              <th>Prdouct</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {order.cartItems.map((cart,index) => {
              const {id,name,price,imageURL,cartQuantity} = cart
              return (
                <tr key={id}>
                  <td><b>{index + 1}</b></td>
                  <td><p>{name}</p>
                  <img src={imageURL} alt={name} width={80}/></td>
                  <td>${price}</td>
                  <td>{cartQuantity}</td>
                  <td>{(price * cartQuantity).toFixed(2)}</td>
                  <td className='icons'>
                    <Link to={`/review_product/${id}`}><button className="bot">Review Product</button></Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </>
      )}

    </div>
  )
}

export default OrderDetails