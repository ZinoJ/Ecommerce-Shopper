import React from 'react'
import { useNavigate } from 'react-router-dom'
import loginImg from '../../Assets/login.png'

function Registerpage() {
   const navigate = useNavigate()
  return (
   <div className="auth">
   <div className="container">
   <div className="image">
      <img src={loginImg} alt="" width={400}/>
   </div>
   <div className="form">
         <h2>Create an account</h2>
         <form action="">
            <input type="text" placeholder='Email Address' required/>
            <input type="text" placeholder='Password' required/>
            <input type="text" placeholder='Confirm Password' required/>
            <button className='btn'>Register</button>  
         </form>
         <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span></p>
   </div>
 </div>
 </div>
  )
}

export default Registerpage