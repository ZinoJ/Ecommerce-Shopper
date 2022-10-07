import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFetchCollection from '../../CustomHooks/useFetchCollection';
import { selectProducts, STORE_PRODUCTS } from '../../Redux/slice/productSlice';
import './Product.css'
import ProductFilter from './ProductFilter'
import ProductList from './ProductList'
import spinnerImg from '../../Assets/spinner.jpg'

function Product() {
  const { data, isLoading } = useFetchCollection("products");
  // const navigate = useNavigate();
  const products = useSelector(selectProducts)
  // console.log(products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
  },[dispatch, data]);
  return (
    <section>
      <div className="container product">
        <aside className='filter'>
        {isLoading ? null : <ProductFilter /> }
          
        </aside>
        <div className="product__content">
          {isLoading ? <img src={spinnerImg} alt="Loading .." style={{width: "50px"}} className="center-all"/> : <ProductList products={products}/> }
          
        </div>
      </div>
    </section>
  )
}

export default Product