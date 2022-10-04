import React from 'react'
import { useNavigate } from 'react-router-dom'
import loginImg from '../../Assets/login.png'

function ResetPassword() {
   const navigate = useNavigate()
  return (
   <div className="auth">
   <div className="container">
   <div className="image">
      <img src={loginImg} alt="" width={400}/>
   </div>
   <div className="form">
         <h2>Reset Password</h2>
         <form action="">
            <input type="text" placeholder='Email Address' required/>
            <button className='btn'>Reset</button>  
         </form>
         <p>Already have an account? <span onClick={() => navigate('/login')}>Sign In</span></p>
   </div>
 </div>
 </div>
  )
}

export default ResetPassword