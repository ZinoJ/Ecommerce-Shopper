import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectUsername } from '../../Redux/slice/authSlice'
import {NavLink} from 'react-router-dom'
import "./Sidebar.css"

function Sidebar() {
  const username = useSelector(selectUsername)
  const activeLink = ({ isActive }) => (isActive ? `active` : "")
  return (
    <div className="sidebar">
      <div className="user">
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/products" className={activeLink}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add_product/add" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>

      </nav>
    </div>
  )
}

export default Sidebar