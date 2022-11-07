import React, { useState } from "react";
import "./Login.css";
import loginImg from "../../Assets/login.png";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import Loader from "../../Components/Loader";
import { useSelector } from "react-redux";
import { selectPreviousURL } from "../../Redux/slice/cartSlice";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const previousURL = useSelector(selectPreviousURL)
  const redirectUser = () => {
    if (previousURL.includes('cart')) {
      return navigate('/cart')
    }
    else {
      navigate('/')
    }
  }

  const loginUser =(e) => {
   e.preventDefault()
   setIsLoading(true)
   signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    // Signed in 
    // const user = userCredential.user;
    // console.log(user);
    toast.success('Login Succesful')
    setIsLoading(false)
    redirectUser()
  })
  .catch((error) => {
    toast.error(error.message)
    setIsLoading(false)
  });
  }
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = (e) => {
   e.preventDefault()
   signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    console.log(user)
    toast.success('Login Successsful')
   //  setIsLoading(false)
    redirectUser()
  }).catch((error) => {
    toast.error(error.message)
  })
  }
  return (
    <>
    {isLoading && <Loader />}
    <div className="auth">
      <div className="container">
        <div className="image">
          <img src={loginImg} alt="" />
        </div>
        <div className="form">
          <h2>Log into your account</h2>
          <form onSubmit={loginUser}>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" type="submit">Login</button>
            <div className="bottom">
              <p onClick={() => navigate("/resetpassword")} style={{cursor: 'pointer'}}>Forgot Password ?</p>
              <p>----- or -----</p>
            </div>
          </form>
          <button className="btn" onClick={loginWithGoogle}>Sign In with Google</button>
          <br />
          <p className="wrap">
            Dont have an account?
            <span onClick={() => navigate("/register")} style={{cursor: 'pointer'}}> Register</span>
          </p>
        </div>
      </div>
    </div></>
  );
}

export default Login;
