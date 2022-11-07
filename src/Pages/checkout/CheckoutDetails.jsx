import React, { useState } from "react";
import "./CheckoutDetails.css";
import { CountryDropdown } from "react-country-region-selector";
import { useDispatch} from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../Redux/slice/checksoutSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";

function CheckoutDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
  };
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
    const handleSubmit = (e) => {
     e.preventDefault()
     dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
     dispatch(SAVE_BILLING_ADDRESS(billingAddress))
     navigate('/checkout')
    };
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };


  
  return (
     <div className="container">
      <div className="checkout__details">
       <h2 style={{marginBottom: "0.4rem"}}>Checkout Details</h2>
       <form onSubmit={handleSubmit}><div>
          <div className="card">
             <h3>Shipping Address</h3>
             <label>Recipient Name</label>
             <input type="text" placeholder="Recipient Name" required name="name" value={shippingAddress.name} onChange={(e) => handleShipping(e)}/>
             <label>Address Line 1</label>
             <input type="text" placeholder="Address Line 1" required name="line1" value={shippingAddress.line1} onChange={(e) => handleShipping(e)}/>
             <label>Address Line 2</label>
             <input type="text" placeholder="Address Line 2" name="line2" value={shippingAddress.line2} onChange={(e) => handleShipping(e)}/>
             <label>City</label>
             <input type="text" placeholder="City" required name="city" value={shippingAddress.city} onChange={(e) => handleShipping(e)}/>
             <label>State</label>
             <input type="text" placeholder="state" required name="state" value={shippingAddress.state} onChange={(e) => handleShipping(e)}/>
             <label>Postal Code</label>
             <input type="text" placeholder="Postal Code" required name="postal_code" value={shippingAddress.postal_code} onChange={(e) => handleShipping(e)}/>
             <CountryDropdown valueType="short" className="select" value={shippingAddress.country} onChange={(val) => handleShipping({
                target: {
                   name: "country",
                   value: val
                }
             }) }/>
             <label>Phone</label>
             <input type="text" placeholder="Phone" required name="phone" value={shippingAddress.phone} onChange={(e) => handleShipping(e)}/>
          </div>
          <br />
          {/* //billingAddress */}
          <div className="card">
             <h3>Billing Address</h3>
             <label>Name</label>
             <input type="text" placeholder="Name" required name="name" value={billingAddress.name} onChange={(e) => handleBilling(e)}/>
             <label>Address Line 1</label>
             <input type="text" placeholder="Address Line 1" required name="line1" value={billingAddress.line1} onChange={(e) => handleBilling(e)}/>
             <label>Address Line 2</label>
             <input type="text" placeholder="Address Line 2" name="line2" value={billingAddress.line2} onChange={(e) => handleBilling(e)}/>
             <label>City</label>
             <input type="text" placeholder="City" required name="city" value={billingAddress.city} onChange={(e) => handleBilling(e)}/>
             <label>State</label>
             <input type="text" placeholder="state" required name="state" value={billingAddress.state} onChange={(e) => handleBilling(e)}/>
             <label>Postal Code</label>
             <input type="text" placeholder="Postal Code" required name="postal_code" value={billingAddress.postal_code} onChange={(e) => handleBilling(e)}/>
             <CountryDropdown valueType="short" className="select" value={billingAddress.country} onChange={(val) => handleBilling({
                target: {
                   name: "country",
                   value: val
                }
             }) }/>
             <label>Phone</label>
             <input type="text" placeholder="Phone" required name="phone" value={billingAddress.phone} onChange={(e) => handleBilling(e)}/>
             <button type="submit" className="btn checkout__button ">Proceed to Checkout</button>
          </div>
       </div>
       <div><CheckoutSummary /></div>

       </form>

     </div>
     </div>
  
  );
}

export default CheckoutDetails;
