import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/admin/AddProduct'
import Home from '../../Components/admin/Home'
import OrderDetails from '../../Components/admin/OrderDetails'
import Orders from '../../Components/admin/Orders'
import Sidebar from '../../Components/admin/Sidebar'
import ViewProducts from '../../Components/admin/ViewProducts'
import './Admin.css'

function Admin() {
  return (
    <div className="admin">
      <div className="sidebarr">
         <Sidebar />
         
      </div>
      <div className="contentt">
      {/* <AddProduct /> */}
         <Routes>
            <Route path='home' element={<Home />} />
            <Route path='products' element={<ViewProducts />} />
            <Route path='add_product/:id' element={<AddProduct />} />
            <Route path='orders' element={<Orders />} />
            <Route path='order_details/:id' element={<OrderDetails />} />
         </Routes>
      </div>
    </div>
  )
}

export default Admin