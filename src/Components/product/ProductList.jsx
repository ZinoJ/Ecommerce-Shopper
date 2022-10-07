import React, { useState } from 'react'
import './ProductList.css'
import {BsFillGridFill} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { FaListAlt } from 'react-icons/fa'
import Search from '../Search'
import ProductItem from './ProductItem'

function ProductList({products}) {
  // const navigate = useNavigate()
  const [grid, setGrid] = useState(true)
  const [search, setSearch] = useState('')
  return (
    <div className="product-list" id='product'>
      <div className="top">
        <div className="icons">
          <BsFillGridFill size={22} color="orangered" onClick={() => setGrid(true)}/>
          <FaListAlt size={22} color="#0066d4" onClick={() => setGrid(false)}/>
          <p>10 Products found</p>
        </div>
        <div>
          <Search value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <div className="sort">
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? 'grids' : 'lists' }>
        {products.lenght === 0 ? (<p>No Product Found</p>) :
        <>
        {products.map((product) => (
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