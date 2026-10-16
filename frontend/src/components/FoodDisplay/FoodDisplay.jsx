import { useContext } from 'react'
import React from 'react'
import { StoreContext } from '../../context/store_context'
import FoodItems  from '../FoodItems/FoodItems'
import './FoodDisplay.css'
import { imageUrl } from "../../config/api";
const FoodDisplay=({category, searchQuery = ""})=> {
  const { food_list } = useContext(StoreContext)
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleFoods = food_list.filter((item) => {
    const matchesCategory = category === 'All'
      || item.category?.toLowerCase() === category.toLowerCase();
    const searchableText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>{normalizedQuery ? `Search results for "${searchQuery.trim()}"` : 'Top dishes near you'}</h2>
      <div className="food-display-list">
        {visibleFoods.map((item) => (
          <FoodItems key={item._id} id={item._id} name={item.name}
            description={item.description} price={item.price} image={imageUrl(item.image)} category={item.category} />
        ))}
      </div>
      {visibleFoods.length === 0 && (
        <p className="food-display-empty" role="status">
          {normalizedQuery ? "No dishes match your search. Try another name or category." : "No dishes are available in this category yet."}
        </p>
      )}
    </div>
  )
}

export default FoodDisplay
