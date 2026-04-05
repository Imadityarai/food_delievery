import { useContext } from 'react'
import React from 'react'
import { StoreContext } from '../../context/store_context'
import FoodItems  from '../FoodItems/FoodItems'
import './FoodDisplay.css'
const FoodDisplay=({category})=> {
  const { food_list } = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category==='All'||category==item.category){
           return <FoodItems key={index} id={item._id} name={item.name}
           description={item.description} price={item.price} image={item.image} category={item.category}></FoodItems>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
