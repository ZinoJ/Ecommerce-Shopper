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
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../Redux/slice/cartSlice";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const userEmail = useSelector(selectEmail);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 800) {
        setShowMenu(true);
      } else {
        setShowMenu(false)
      }
      
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
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

  return (
    <div className="header">
      <div className={showMenu ? 'nav-wrapper' : 'hide'} onClick={hideMenu}> </div>
      <div className={showMenu ? 'hiddenNav' : 'hide'} onClick={hideMenu} >
        {userEmail === process.env.REACT_APP_ADMIN_USER && (
          <button className="btn" onClick={() => navigate("/admin/home")}>
            Admin
          </button>
        )}
        <p onClick={() => navigate("/")}>Home</p>
        <p onClick={() => navigate("/contact")}>Contact Us</p>
        {!isLoggedIn && <p onClick={() => navigate("/login")}>Login</p>}
        {isLoggedIn && (
          <span>
            <FaUserCircle size={16} /> Hi, {username}
          </span>
        )}
        {isLoggedIn && (
          <p onClick={() => navigate("/order_history")}>My Orders</p>
        )}
        {isLoggedIn && <p onClick={logoutUser}>Logout</p>}
      </div>
      
      <div className="container">
        <div className="header__left">
          <h2
            onClick={() => navigate("/#products")}
            style={{ cursor: "pointer" }}
          >
            E<span>Shopper</span>
          </h2>
        </div>
        <div className="header__middle">
          {userEmail === process.env.REACT_APP_ADMIN_USER && (
            <button className="btn" onClick={() => navigate("/admin/home")}>
              Admin
            </button>
          )}
          <p onClick={() => navigate("/")}>Home</p>
          <p onClick={() => navigate("/contact")}>Contact Us</p>
        </div>
        <div className="header__right">
          {!isLoggedIn && <p onClick={() => navigate("/login")}>Login</p>}
          {isLoggedIn && (
            <span>
              <FaUserCircle size={16} /> Hi, {username}
            </span>
          )}
          {isLoggedIn && (
            <p onClick={() => navigate("/order_history")}>My Orders</p>
          )}
          {isLoggedIn && <p onClick={logoutUser}>Logout</p>}
          <p onClick={() => navigate("/cart")} style={{ cursor: "pointer" }}>
            Cart <FaShoppingCart size={20} />
            <sup>{cartTotalQuantity}</sup>
          </p>
        </div>

        <div className="header__menu">
          <p>
            Cart <FaShoppingCart size={18} /> <sup>{cartTotalQuantity}</sup>
          </p>

          <HiOutlineMenuAlt3 size={25} onClick={toggleMenu}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
