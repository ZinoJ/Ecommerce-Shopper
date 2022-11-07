import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../Redux/slice/authSlice";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../Redux/slice/cartSlice";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  }
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart))
  }
  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  }
  const clearCart = () => {
    dispatch(CLEAR_CART())
  }
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(SAVE_URL(""))
  },[dispatch,cartItems])
  // console.log(cartTotalAmount)

  //track URL
  const url = window.location.href
  const checkout = () => {
    if(isLoggedIn){
      navigate('/checkout_details')
    } else {
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }
  return (
    <div className="cart">
      <div className="table">
        <h3>Shopping Cart</h3>
        {cartItems.length === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <p onClick={() => navigate("/#products")} style={{cursor: 'pointer'}}>
              &larr; Continue Shopping
            </p>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} width={100} />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className="cart__count">
                          <button onClick={() => decreaseCart(cart)}>-</button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button onClick={() => increaseCart(cart)}>+</button>
                        </div>
                      </td>
                      <td>{(price * cartQuantity).toFixed(2)}</td>
                      <td className="icons">
                        <FaTrashAlt size={18} color="red" onClick={() => removeFromCart(cart)}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <br />
            <button onClick={clearCart}className="clearcart">Clear Cart</button>
               
               <div className="checkout">
                  <p onClick={() => navigate('/#products')} style={{cursor: 'pointer'}}>&larr; Continue Shopping</p>
                  <br />
                  <div className="cart__card">
                     <p>Cart Item(s): <b>{cartTotalQuantity}</b></p>
                     <div className="text">
                        <h4>Subtotal</h4>
                        <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                     </div>
                     <h6>Tax and Shipping calculated at checkout</h6>
                     <br />
                     <button className="bot" onClick={checkout}>Checkout</button>
                  </div>
               </div>
            
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
