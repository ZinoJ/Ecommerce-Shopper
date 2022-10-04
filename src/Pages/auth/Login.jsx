import React from 'react'
import './Login.css'
import loginImg from '../../Assets/login.png'
import { useNavigate } from 'react-router-dom'


function Login() {
   const navigate = useNavigate()
  return (
    <div className="auth">
      <div className="container">
      <div className="image">
         <img src={loginImg} alt="" width={400}/>
      </div>
      <div className="form">
            <h2>Login</h2>
            <form action="">
               <input type="text" placeholder='Email Address' required/>
               <input type="text" placeholder='Password' required/>
               <button className='btn'>Login</button>
               <div className="bottom">
                  <p onClick={() => navigate('/resetpassword')}>Forgot Password</p>
                  <p>-- or --</p>
               </div>
            </form>
            <button className='btn'>Sign In with Google</button>
            <p>Dont have an account? <span onClick={() => navigate('/register')}>Register</span></p>
      </div>
    </div>
    </div>
  )
}

export default Login