import React, { useEffect } from 'react'
import Product from '../../Components/product/Product'
// import Slider from '../../Components/Slider'
import './HomePage.css'

function HomePage() {
  const url = window.location.href;
  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes('#products')){
        window.scrollTo({
          top: 670,
          behavior: "smooth"
        })
        return
      }
    }
    scrollToProducts()
  },[url])
  
  return (
    <div className="homepage">
      {/* <Slider /> */}
      <Product />
    </div>
  )
}

export default HomePage