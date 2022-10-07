import React, { useEffect, useState } from 'react'
import './Slider.css'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { sliderData } from './sliderdata'

function Slider() {
   const [currentSlide, setCurrentSlide] = useState(0)
   const slideLength = sliderData.length
   const autoScroll = true
   let slideInterval;
   let intervalTime = 5000
   const nextSlide =() => {
      setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1)
   }
   const previousSlide = () => {
      setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1)
   }

   useEffect(() => {
     setCurrentSlide(0)
   }, [])

   const auto = () => {
      slideInterval = setInterval(nextSlide, intervalTime)
   }

   useEffect(() => {
      if (autoScroll) {
         auto()
      }
      return () => clearInterval(slideInterval)
    }, [currentSlide])
   
  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={previousSlide}/>
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide}/>
      {sliderData.map((slide, index) =>
         (<div className={index === currentSlide ? "slide current" : "slide"} key={index}>
            {index === currentSlide && (
               <>
                  <img src={slide.image} alt="" />
                  <div className="content">
                     <h2>{slide.heading}</h2>
                     <p>{slide.desc}</p>
                     <hr />
                     <a href="#product" className='btn'>Shop Now</a>
                  </div>
               </>
            )}
         </div>)
      )}
    </div>
  )
}

export default Slider