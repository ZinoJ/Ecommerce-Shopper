import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";
import useFetchDocument from "../CustomHooks/useFetchDocument";
import { db } from "../Firebase/firebase";
import { selectUserID, selectUsername } from "../Redux/slice/authSlice";
import spinnerImg from "../Assets/spinner.jpg";

function ReviewProducts() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { document } = useFetchDocument("products", id);
  const [value, setValue] = useState(0);
  const [review, setReview] = useState("");
  const userID = useSelector(selectUserID);
  const username = useSelector(selectUsername);
  // const product = products.find((item) => item.id === id);
  useEffect(() => {
    setProduct(document);
  }, [document]);
  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      username,
      productID: id,
      rate: value,
      review,
      reviewDate: date,
      
    };
    try {
      addDoc(collection(db, "reviews"), {
        ...reviewConfig, createdAt: Timestamp.now().toDate()
      });
      toast.success("Review submitted successfully");
      setReview("");
      setValue(0);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="checkout__details review">
      <h2>Review Products</h2>
      {product === null ? (
        <img src={spinnerImg} alt="Loading ..." width={50}/>
      ) : (
        <>
          <p>
            <b>Product name: </b>
            {product.name}
          </p>
          <img src={product.imageURL} alt={product.name} width={100} />
        </>
      )}

      <div>
        <form onSubmit={(e) => submitReview(e)}>
          <h4>Rating</h4>
          {/* <br /> */}
          <StarsRating
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
          />
          <br />
          <br />
          <h4>Review</h4>
          <textarea
            name=""
            value={review}
            required
            onChange={(e) => setReview(e.target.value)}
            cols="30"
              rows="10"
              style={{ width: "450px" }}
          ></textarea>
          <button type="submit" className="bot">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewProducts;
