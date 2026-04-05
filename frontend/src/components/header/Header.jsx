import React from 'react'
import './Header.css'
import Navbar from '../Navbar/navbar'
function Header() {
  return (
 
    <div>   <Navbar/>
      <div className="header">
        <div className="header-content">
            <h1> order your food here </h1>
       
<p>for Delicious food , come to our place . Try 1 time and will come evertime</p> 
     <button>order now</button>   </div>
      </div>
    </div>
  )
}

export default Header
