import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginImg from "../../Assets/login.png";
import Loader from "../../Components/Loader";
import { auth } from "../../Firebase/firebase";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false)
        toast.success('Check your email for password reset link')
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.message)
      });
  };
  return (
   <>
   {isLoading && <Loader />}
    <div className="auth">
      <div className="container">
        <div className="image">
          <img src={loginImg} alt="" width={400} />
        </div>
        <div className="form">
          <h2>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn" type="submit">
              Reset Password
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{cursor: 'pointer'}}>Sign In</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ResetPassword;
