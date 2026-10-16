import { useContext } from 'react'
import './FoodItems.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/store_context'

const FoodItems = ({ id, name, description, price, image, highlighted = false }) => {
  const { cartItems, addtoCart, removefromCart } = useContext(StoreContext)

  return (
    <article id={`food-item-${id}`} className={`food-item${highlighted ? " food-item-highlighted" : ""}`}>
      <div className="food-item-img-container">
        <img
          src={image}
          className="food-item-image"
          alt={name}
          loading="lazy"
          decoding="async"
          width="360"
          height="280"
        />
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="5 stars" />
        </div>
        <div className="cart-item-count">
          {cartItems[id] > 0 && (
            <>
              <button
                type="button"
                onClick={() => removefromCart(id)}
                className="food-item-action"
                aria-label={`Remove one ${name} from cart`}
              >
                <img src={assets.remove_icon_red} className="food-item-remove-icon" alt="Remove one item" />
              </button>
              <p className="food-item-count">{cartItems[id]}</p>
            </>
          )}
          <button
            type="button"
            onClick={() => addtoCart(id)}
            className="food-item-action"
            aria-label={`Add ${name} to cart`}
          >
            <img src={assets.add_icon_green} className="food-item-add-icon" alt="Add item" />
          </button>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </article>
  )
}

export default FoodItems
