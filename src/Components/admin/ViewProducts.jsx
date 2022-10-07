import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCollection from "../../CustomHooks/useFetchCollection.js";
import { db, storage } from "../../Firebase/firebase.js";
import { selectProducts, STORE_PRODUCTS } from "../../Redux/slice/productSlice.js";
import Loader from "../Loader.jsx";
import "./ViewProducts.css";

function ViewProducts() {
  const { data, isLoading } = useFetchCollection("products");
  const navigate = useNavigate();

  const products = useSelector(selectProducts)
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
  },[dispatch, data]);

  // useEffect(() => {
  //   getProducts();
  // }, []);
  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     setIsLoading(false);
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProducts(allProducts);
  //       dispatch(STORE_PRODUCTS({products: allProducts,}))
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "Are you sure?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("");
      },
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        // etc...
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const desertRef = ref(storage, imageURL);
      await deleteObject(desertRef);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="table">
        <h3>All Products</h3>
        {products.length === 0 ? (
          <p>No Product Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt="name"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className="icons">
                      <FaEdit
                        onClick={() => navigate(`/admin/add_product/${id}`)}
                        size={20}
                        color="red"
                      />
                      &nbsp;
                      <FaTrashAlt
                        onClick={() => confirmDelete(id, imageURL)}
                        size={20}
                        color="green"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ViewProducts;
