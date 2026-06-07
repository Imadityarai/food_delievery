import React from 'react'
import './ExploreMenu.css'
import  {menu_list} from '../../assets/frontend_assets/assets'
import { useState } from 'react'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>EXplore our menu</h1>
        <div className='explore-menu-text'>Choose from a diverse 
            menu featuring a wide range of delicious dishes
       <div className="explore-menu-list">
      {menu_list.map((item,index)=>{
return(
    <div key={index} onClick={()=>setcategory(item.menu_name)} className="explore-menu-list-item">
        <img src={item.menu_image} alt="" className={item.menu_name===category?"active":""}{...console.log(category)}/>
        <p>{item.menu_name}</p>
    </div>
)
      })}
        </div> </div>
      
    </div>
  )
}

export default ExploreMenu
