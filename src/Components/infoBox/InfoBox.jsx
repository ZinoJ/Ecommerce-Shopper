import React from 'react'
import './InfoBox.css'

function InfoBox({cardclass, title, count, icon}) {
  return (
    <div className="info-box">
      <div className='card'>
         <h4>{title}</h4>
         <span><h3>{count}</h3> {icon}</span>

      </div>
    </div>
  )
}

export default InfoBox