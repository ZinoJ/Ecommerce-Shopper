import React, { useEffect, useState } from 'react'
import './ProductList.css'
import Search from '../Search'
import ProductItem from './ProductItem'
import { useDispatch, useSelector } from 'react-redux'
import { FILTER_BY_SEARCH, selectFilteredProducts, SORT_PRODUCTS } from '../../Redux/slice/filterSlice'

function ProductList({products}) {
  // const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const dispatch = useDispatch()
  const filteredProducts = useSelector(selectFilteredProducts)

 
  useEffect(() => {
    dispatch(SORT_PRODUCTS({
      products: products,
      sort
    }))
  },[sort,dispatch,products])
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({
      products: products,
      search
    }))
  },[search,dispatch,products])
  return (
    <div className="product-list" id='product'>
      <div className="top">
        {/* <div className="icons">
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)}/>
          <FaListAlt size={22} color="#0066d4" onClick={() => setGrid(false)}/>
          <p>{filteredProducts.length} Products found</p>
        </div> */}
        <div>
          <Search value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="sort">
          <label>Sort by :</label>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? 'grids' : 'lists' }>
        {products.length === 0 ? (<p>No Product Found</p>) :
        <>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <ProductItem {...product} grid={grid} product={product}/>
          </div>
        ))}
        </>
        }
      </div>
    </div>
  )
}

export default ProductList