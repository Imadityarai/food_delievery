import React from 'react'
import './Header.css'
import Navbar from '../Navbar/navbar'

function Header() {
  return (
    <div>
  
      <div className="header">
        <div className="header-content">
          <h1>Order your food here</h1>
          <p>
            For delicious food, come to our place. Try once and you’ll come every time!
          </p>
          <button>Order Now</button>
        </div>
      </div>
    </div>
  )
}

export default Header
