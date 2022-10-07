import React from 'react'
import Product from '../../Components/product/Product'
import Slider from '../../Components/Slider'
import './HomePage.css'

function HomePage() {
  return (
    <div className="homepage">
      {/* <Slider /> */}
      <Product />
    </div>
  )
}

export default HomePage