import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "../../Redux/slice/cartSlice";
import "./CheckoutSummary.css";

function CheckoutSummary() {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  
  return (
    <div className="checkout__summary">
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No item in your cart</p>
            <p
              onClick={() => navigate("/#products")}
              style={{ cursor: "pointer" }}
            >
              &larr; Back to Shop
            </p>
          </>
        ) : (
          <>
            <p>
              <b>Cart item(s): {cartTotalQuantity}</b>
            </p>
            <div className="checkoutsummary__text">
              <h4>Subtotal:</h4>
              <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <div className="checkoutsummary__card" key={id}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit Price: ${price}</p>
                  <p>Set Price: ${price * cartQuantity}</p>
                </div>
              );
            })}
            
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummary;
