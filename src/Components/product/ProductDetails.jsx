import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import useFetchCollection from "../../CustomHooks/useFetchCollection";
import useFetchDocument from "../../CustomHooks/useFetchDocument";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_QUANTITY,
  DECREASE_CART,
  selectCartItems,
} from "../../Redux/slice/cartSlice";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cart = cartItems.find((cartItem) => cartItem.id === id);
  const isCartAdded = cartItems.findIndex((cart) => cart.id === id);
  const { document } = useFetchDocument("products", id);
  const { data } = useFetchCollection("reviews");
  const filteredReviews = data.filter((review) => review.productID === id);

  //Get Single Product
  // const getProduct = async () => {
  //   const docRef = doc(db, "products", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const obj = {
  //       id: id,
  //       ...docSnap.data(),
  //     };
  //     setProduct(obj);
  //   } else {
  //     toast.error("Product not found");
  //   }
  // };

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <div className="productDetails__container">
      <div className="productDetails">
        <h2>Product Details</h2>
        <div>
          <p
            onClick={() => navigate("/#products")}
            style={{ cursor: "pointer" }}
          >
            &larr; Back to Products
          </p>
        </div>
        {product === null ? (
          <p>Loading</p>
        ) : (
          <>
            <div className="product__details">
              <div className="img">
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="productDetails__content">
                <h3>{product.name}</h3>
                <h4 className="price" style={{ color: "#0d1b2a" }}>
                  Price: ${product.price}
                </h4>
                <p className="wrap">{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className="count">
                  {isCartAdded < 0 ? null : (
                    <div className="left">
                      <button
                        className="btn"
                        onClick={() => decreaseCart(product)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                    </div>
                  )}
                  <button onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        <br />
        <div className="card">
          <h3>Product Reviews</h3>
          <div>
            {filteredReviews.length === 0 ? (
              <p>There is no reviews for this product yet.</p>
            ): (
             <>
              {filteredReviews.map((filteredReview,index) => {
                const {rate,review, reviewDate, username} = filteredReview
                return (
                  <div className="review" key={index}>
                    <StarsRating value={rate} />
                    <p>{review}</p>
                    <span><b>{reviewDate}</b></span>
                    <br />
                    <span><b> by {username}</b></span>
                  </div>
                )
              })}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
