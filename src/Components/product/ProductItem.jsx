import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductItem.css";

function ProductItem({ grid, product, id, name, price, imageURL, desc }) {
  const navigate = useNavigate();
  const shortenText = (text) => {
    if(text.length > 200) {
      const shortenedText = text.substring(0,15).concat("...")
      return shortenText
    }
    return text
  }
  return (
  
      <div className={grid ? "grid" : "list"}>
        <div className="product_img" onClick={() => navigate("/product_details")}>
          <img src={imageURL} alt={name} />
        </div>
        <div className="content__product">
          <div className="details">
            <p><strong>{`$${price}`}</strong></p>
            <h5>{name}</h5>
          </div>
          {/* {!grid && <p className="desc">{desc}</p>} */}
          <button>Add to cart</button>
        </div>
      </div>
  );
}

export default ProductItem;
