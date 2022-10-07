import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../../Assets/login.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import Loader from "../../Components/Loader";

function Registerpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setConfirmpassword("");
  };
  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        setIsLoading(false)
        toast.success("Registration Successful")
        navigate('/login')
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
        // ..
      });
    clearFields();
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
            <h2>Create an account</h2>
            <form onSubmit={registerUser}>
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <button className="btn" type="submit">
                Register
              </button>
            </form>
            <p>
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registerpage;
