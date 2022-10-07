import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../Firebase/firebase";
import { selectProducts } from "../../Redux/slice/productSlice";
import Loader from "../Loader";
import "./AddProduct.css";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

function AddProduct() {
  const { id } = useParams();
  const detectForm = (id, f1, f2) => {
    if (id === "add") {
      return f1;
    }
    return f2;
  };
  const navigate = useNavigate();
  const initialState = {
    name: "",
    imageURL: "",
    price: "",
    category: "",
    brand: "",
    desc: "",
  };
  const products = useSelector(selectProducts);
  const productEdit = products.find((product) => product.id == id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit)
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `shoppers/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });

          toast.success("Image uploaded successfully");
        });
      }
    );
  };
  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        ...product,
        price: Number(product.price),
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product Uploaded Successfully");
      navigate("/admin/products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage, productEdit.imageURL)
      deleteObject(storageRef)
    }
    try {
      setDoc(doc(db, "products", id), {
        ...product,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      toast.success("Edited Successsfully")
      navigate('/admin/products')
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isloading && <Loader />}
      <div className="product">
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <div className="card">
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label htmlFor="">Product name</label>
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              required
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Image</label>
            <div className="group">
              {uploadProgress === 0 ? null : (
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading  ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}`}
                  </div>
                </div>
              )}

              <input
                className="bottom"
                type="file"
                placeholder="Product Image"
                accept="image/*"
                name="imageURL"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  className="bottom"
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  onChange={(e) => handleImageChange(e)}
                  disabled
                />
              )}
            </div>
            <label htmlFor="">Product price</label>
            <input
              type="number"
              placeholder="Product Price"
              name="price"
              required
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Category</label>
            <select
              name="category"
              required
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                Choose product category
              </option>
              {categories.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="">Product Company/Brand</label>
            <input
              type="text"
              placeholder="Product Brand"
              name="brand"
              required
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Product Description</label>
            <textarea
              type="text"
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
              style={{ width: "480px" }}
            />
            <button
              className="btn"
              style={{
                backgroundColor: "#0d1b2a",
                color: "#fff",
                fontSize: "16px",
              }}
              type="submit"
            >
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
