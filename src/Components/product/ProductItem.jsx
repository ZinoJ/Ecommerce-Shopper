import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../Redux/slice/cartSlice";
import "./ProductItem.css";

function ProductItem({ grid, product, id, name, price, imageURL, desc }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const shortenText = (text) => {
    if(text.length > 200) {
      const shortenedText = text.substring(0,15).concat("...")
      return shortenText
    }
    return text
  }

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }
  return (
  
      <div className={grid ? "grid" : "list"}>
        <div className="product_img" onClick={() => navigate(`/product_details/${id}`)}>
          <img src={imageURL} alt={name} />
        </div>
        <div className="content__product">
          <div className="details">
            <p><strong>{`$${price}`}</strong></p>
            <h5>{name}</h5>
          </div>
          
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      </div>
  );
}

export default ProductItem;
