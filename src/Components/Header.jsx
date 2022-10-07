import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  selectIsLoggedIn,
  selectEmail,
  SET_ACTIVE_USER,
} from "../Redux/slice/authSlice";

function Header() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const userEmail = useSelector(selectEmail)
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //   const uid = user.uid;
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUsername(uName);
        } else {
          setUsername(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            username: user.displayName ? user.displayName : username,
            userID: user.uid,
          })
        );
      } else {
        setUsername("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, username]);

  const logoutUser = () => {
   signOut(auth)
     .then(() => {
       // Sign-out successful.
       toast.success("Successfully SignedOut");
      //  dispatch(REMOVE_ACTIVE_USER()); 
     })
     .catch((error) => {
       toast.error(error.message);
     });
     navigate("/login");
 };
//  console.log(isLoggedIn)

  return (
    <div className="header">
      <div className="header__left">
        <h2 onClick={() => navigate('/')}>
          E<span>Shopper</span>
        </h2>
      </div>
      <div className="header__middle">
        {userEmail === "joshuaubiri@gmail.com" && <button className="btn" onClick={() => navigate('/admin/home')}>Admin</button>}
        <p onClick={() => navigate("/")}>Home</p>
        <p>Contact Us</p>
      </div>
      <div className="header__right">
        {!isLoggedIn && <p onClick={() => navigate("/login")}>Login</p>}
        {isLoggedIn && <span>
          <FaUserCircle size={16} /> Hi, {username}
        </span>}
        {isLoggedIn && <p>My Orders</p>}
        {isLoggedIn && <p onClick={logoutUser}>Logout</p>}
        <p>
          Cart <FaShoppingCart size={20} />
        </p>
      </div>
      <div className="header__menu">
        <p>
          Cart <FaShoppingCart size={18} />
        </p>
        <HiOutlineMenuAlt3 size={25} />
      </div>
    </div>
  );
}

export default Header;
