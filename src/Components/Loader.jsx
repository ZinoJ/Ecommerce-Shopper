import React from 'react'
import './Loader.css'
import loaderImg from '../Assets/loader.gif'
import ReactDOM from 'react-dom'

function Loader() {
  return ReactDOM.createPortal (
    <div className="wrapper">
      <div className="loader">
         <img src={loaderImg} alt="Loading" />
      </div>
    </div>,
    document.getElementById("loader")
  )
}

export default Loader