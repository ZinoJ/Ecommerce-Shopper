import React from 'react'
import './Header.css'
import {FaShoppingCart} from 'react-icons/fa'
import {HiOutlineMenuAlt3} from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

function Header() {
   const navigate = useNavigate()
  return (
    <div className="header">
      <div className="header__left">
         <h2>E'<span>Shopper</span></h2>
      </div>
      <div className="header__middle">
         <p>Admin</p>
         <p onClick={() => navigate('/')}>Home</p>
         <p>Contact Us</p>
      </div>
      <div className="header__right">
         <p>My Orders</p>
         <p onClick={() => navigate('/login')}>Login</p>
         <p>Cart <FaShoppingCart size={20}/></p>
      </div>
      <div className="header__menu">
      <p>Cart <FaShoppingCart size={18}/></p>
      <HiOutlineMenuAlt3 size={25}/>
      </div>
    </div>
  )
}

export default Header