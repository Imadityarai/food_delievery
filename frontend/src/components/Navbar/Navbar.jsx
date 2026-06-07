import React from 'react'
import { useState } from  'react'
import  './Navbar.css' 
import { assets } from '../../assets/frontend_assets/assets.js'
import {Link} from 'react-router-dom'
import setShowLoginPop from '../../App'
const Navbar = ({setShowLoginPop}) => {
let [menu,setMenu]=useState("home")   
  return (
    <div className='navbar'>
     <Link to="/"> <img src={assets.logo} alt="" className='logo'/></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <li onClick={()=>setMenu("mobile-app")}  className={menu==="mobile-app"?"active":""}>mobile-app</li>
        <a href='#footer' onClick={()=>setMenu("contact-us")}  className={menu==="contact-us"?"active":""}>contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
         <Link to="/cart">   <img src={assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
          </div>
          <button onClick={()=> setShowLoginPop(true)}>sign in</button>
           </div>

    </div>
  )
}

export default Navbar
