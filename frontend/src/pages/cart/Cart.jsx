import React, { useContext } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './cart.css';
import { StoreContext } from '../../context/store_context';
import {Link} from "react-router-dom"
function Cart() {
  const { cartItems, food_list, removefromCart,subtotal,deliveryFee,totalAmount } = useContext(StoreContext);
  return (
    <div className="cart">
      <div className="cart-items">
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-item" key={item._id}>
                <img src={ `http://localhost:4000/images/${item.image}`} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-quantity">Qty: {cartItems[item._id]}</p>
                  <p className="cart-item-price">Each: ₹{item.price}</p>
                  <p className="cart-item-total">Total: ₹{cartItems[item._id] * item.price}</p>
                </div>
                <img
                  src={assets.remove_icon_red}
                  onClick={() => removefromCart(item._id)}
                  className="cart-item-remove"
                  alt="Remove item"
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>₹{deliveryFee}</span>
        </div>
        <div className="summary-row total">
          <span>Total Amount:</span>
          <span>₹{totalAmount}</span>
        </div>
   <Link to="/placeorder"> <button className="checkout-btn">Proceed to Checkout</button></Link> 
      </div>
    </div>
  );
}

export default Cart;
