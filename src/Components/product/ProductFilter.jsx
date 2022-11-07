import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from "../../Redux/slice/filterSlice";
import { selectMaxPrice, selectMinPrice, selectProducts } from "../../Redux/slice/productSlice";
import "./ProductFilter.css";

function ProductFilter({showMenu, setShowMenu}) {
  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(4000)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];
  
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({products,brand}))
  },[dispatch,brand,products])
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({products,price}))
  },[dispatch,brand,price,products])
  const filterProducts = (category) => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({ products, category: category }));
  }

  const clearFilter = (e) => {
    e.preventDefault()
    setBrand('All')
    setCategory('All')
    setPrice(4000)
  }

  return (
    <div className="filter__container">
      <h4>Categories</h4>
      <div className="categoryy">
        {allCategories.map((category, index) => (
          <button
            key={index}
            type="button"
            // className={`${category}` === category ? `active` : null}
            onClick={() => filterProducts(category)}
          >
            {/* </button>/<button key={index} type="button" className="active"> */}
            {category}
          </button>
        ))}
      </div>
      <br />
      <h4>Brands</h4>
      <div className="brand">
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => (
            <option value={brand} key={index}>{brand}</option>
          ))}
        </select>
        <h4>Price</h4>
        <p>{`$${price}`}</p> 
        <div className="price">
          <input type="range"  value={price} onChange={e => setPrice(e.target.value)} min={minPrice} max={maxPrice} />
        </div>
        <button className="filter__button" onClick={clearFilter}>Clear Filter</button>
        <br />
        <button className="closeFilter" onClick={() => setShowMenu(!showMenu)}>Close Filter</button>
      </div>
    </div>
  );
}

export default ProductFilter;
