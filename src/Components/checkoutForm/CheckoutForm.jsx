import React, { useEffect, useState } from "react";
import "./CheckoutForm.css";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { selectBillingAddress } from "../../Redux/slice/checksoutSlice";
import CheckoutSummary from "../../Pages/checkout/CheckoutSummary";
import spinnerImage from "../../Assets/spinner.jpg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../Redux/slice/cartSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../Redux/slice/authSlice";
import { PaystackButton } from 'react-paystack';

const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
export default function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const stripe = useStripe();
  const elements = useElements();
  const billingAddress = useSelector(selectBillingAddress);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const saveOrder = () => {
    //  e.preventDefault();
     const today = new Date();
     const date = today.toDateString();
     const time = today.toLocaleTimeString();
     const orderConfig = {
       userID,
       userEmail,
       orderDate: date,
       orderTime: time,
       orderAmount: cartTotalAmount,
       orderStatus: "Order Placed ...",
       cartItems,
     };
     try {
       addDoc(collection(db, "orders"), {
         ...orderConfig,createdAt: Timestamp.now().toDate(),
       });
       dispatch(CLEAR_CART());
       toast.success("Order Saved")
       navigate('/checkout_success')
     } catch (error) {
       toast.error(error.message);
     }
   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // eslint-disable-next-line no-unused-vars
    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout_success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment Successful");
            navigate("/checkout_success");
            saveOrder();
          }
        }
      });
    setIsLoading(false);
  };

  const componentPropsPayStack = {
    email: userEmail,
    amount: cartTotalAmount * 100,
    metadata: {
      name: billingAddress.name,
      phone: billingAddress.phone
    },
    publicKey,
    text: "Pay with PayStack",
    onSuccess: ({ reference }) => {
      toast.success(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
      saveOrder()
      navigate("/checkout_success");

      // resetForm();
    },
    // onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };
  
  return (
    <div className="container">
      <div className="checkout">
      <h2>Checkout</h2>
      <br />
      <div className="formContainer">
        <div className="width">
          <CheckoutSummary />
          <PaystackButton className="paystack-button" {...componentPropsPayStack} />
        </div>
        <div className="width pay">
          <h3>Stripe Checkout</h3>
          <PaymentElement id="payment-element" />
          <button
            disabled={isLoading || !stripe || !elements}
            id="submit"
            className="button"
            onClick={handleSubmit}
          >
            <span id="button-text">
              {isLoading ? (
                <img
                  src={spinnerImage}
                  alt="loading"
                  style={{ width: "20px" }}
                />
              ) : (
                "PAY WITH STRIPE"
              )}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </div>
      </div>
    </div>
    </div>
  );
}
