import { useContext, useEffect } from 'react'
import { StoreContext } from '../../context/store_context'
import FoodItems  from '../FoodItems/FoodItems'
import './FoodDisplay.css'
import { imageUrl } from "../../config/api";
const normalizeCategory = (value = "") => value.toLowerCase() === "deserts" ? "desserts" : value.toLowerCase();

const FoodDisplay=({category, searchQuery = "", filterCategories = null, highlightedFoodId = ""})=> {
  const { food_list } = useContext(StoreContext)
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleFoods = food_list.filter((item) => {
    const matchesCategory = filterCategories
      ? filterCategories.some((filterCategory) => normalizeCategory(filterCategory) === normalizeCategory(item.category))
      : category === 'All' || normalizeCategory(item.category) === normalizeCategory(category);
    const searchableText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });

  useEffect(() => {
    if (!highlightedFoodId) return;
    document.getElementById(`food-item-${highlightedFoodId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [highlightedFoodId]);

  return (
    <div className='food-display' id='food-display'>
      <h2>
        {normalizedQuery
          ? `Search results for "${searchQuery.trim()}"`
          : highlightedFoodId
            ? "Your surprise pick"
            : filterCategories
              ? "Picked for your mood"
              : 'Top dishes near you'}
      </h2>
      <div className="food-display-list">
        {visibleFoods.map((item) => (
          <FoodItems key={item._id} id={item._id} highlighted={item._id === highlightedFoodId} name={item.name}
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
