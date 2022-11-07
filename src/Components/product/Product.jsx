import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../CustomHooks/useFetchCollection';
import { GET_PRICE_RANGE, selectProducts, STORE_PRODUCTS } from '../../Redux/slice/productSlice';
import './Product.css'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import spinnerImg from '../../Assets/spinner.jpg'

function Product() {
  const [showMenu, setShowMenu] = useState(false);
  const { data, isLoading } = useFetchCollection("products");
  // const navigate = useNavigate();
  const products = useSelector(selectProducts)
  // console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data}));
    dispatch(GET_PRICE_RANGE({products: data}))
  },[dispatch, data]);
  return (
    <div className='container'>
      {showMenu && <aside className='hiddenFilter'>
        {isLoading ? null : <ProductFilter showMenu= {showMenu} setShowMenu= {setShowMenu} /> }
        </aside>}
      <div className="product">
        <aside className='filter'>
        {isLoading ? null : <ProductFilter /> }
        </aside>
        
        <div className="product__content">
        <h3 className='showFilter' onClick={() => setShowMenu(!showMenu)}style={{ cursor: "pointer" }}>{showMenu ? 'Hide filter' : "Show Filter"}</h3>
          {isLoading ? <img src={spinnerImg} alt="Loading .." style={{width: "50px"}} className="center-all"/> : <ProductList products={products}/> }
        </div>
      </div>
    </div>
  )
}

export default Product