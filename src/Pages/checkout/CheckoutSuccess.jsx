import React from 'react'
import { useNavigate } from 'react-router-dom'

function CheckoutSuccess() {
  const navigate = useNavigate()
  return (
    <div className="checkout__details succ">
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>
      <br />
      <button className='bot' onClick={() => navigate('/order_history')}>View Order Status</button>
    </div>
  )
}

export default CheckoutSuccess