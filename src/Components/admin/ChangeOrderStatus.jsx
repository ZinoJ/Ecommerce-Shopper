import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../Firebase/firebase'
import Loader from '../Loader'
import './ChangeOrderStatus.css'

function ChangeOrderStatus({order,id}) {
   const [status, setStatus] = useState('')
   const [isloading, setIsLoading] = useState(false)
   const navigate = useNavigate()

   const editOrder = (e,id) => {
       e.preventDefault();
       setIsLoading(true)
       const orderConfig = {
         userID : order.userID,
         userEmail: order.userEmail,
         orderDate: order.orderDate,
         orderTime: order.orderTime,
         orderAmount: order.orderAmount,
         orderStatus: status,
         cartItems: order.cartItems,
         createdAt: order.createdAt,
         
       };
       try {
         setDoc(doc(db, "orders", id), {
           ...orderConfig, editedAt: Timestamp.now().toDate(), 
         });
         toast.success("Order status changed successfully")
         setIsLoading(false)
         navigate('/admin/orders')
       } catch (error) {
         setIsLoading(false)
         console.log(error.message);
         toast.error(error.message);
         
       }
     };
   
  
  return (
    <>
    {isloading && <Loader />}

    <div className="card">
      <h4>Update Status</h4>
      <form onSubmit={e => editOrder(e,id)}>
         <span>
            <select value={status} onChange={e => setStatus(e.target.value)}>
               <option value="" disabled>-- Choose One --</option>
               <option value="Order Placed">Order Placed</option>
               <option value="Processing">Processing</option>
               <option value="Shipped">Shipped</option>
               <option value="Delivered">Delivered</option>
            </select>
         </span>
         <span>
            <button type='submit' className='bot'>Update Status</button>
         </span>
      </form>
    </div>
    </>
  )
}

export default ChangeOrderStatus