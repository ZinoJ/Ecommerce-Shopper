import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
   const navigate = useNavigate()
  return (
    <div className='not-found'>
      <h2>404</h2>
      <p>Oppppppsssss, page not found.</p>
      <button className="bot" onClick={() => navigate('/')}>&larr;    Back to Home</button>
    </div>
  )
}

export default NotFound