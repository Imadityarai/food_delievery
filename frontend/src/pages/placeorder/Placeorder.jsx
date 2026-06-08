import React, { useContext, useState } from 'react';
import './Placeorder.css';
import { StoreContext } from '../../context/store_context';

function Placeorder() {
  const { subtotal, deliveryFee, totalAmount } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    street: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully!\nName: ${formData.name}\nAmount Paid: ₹${totalAmount}`);
  };

  return (
    <div className="placeorder">
      <h2>Place Your Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label>
        <label>
          Street:
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </label>
        <label>
          Pincode:
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </label>

        <div className="amount">
          <p>Subtotal: ₹{subtotal}</p>
          <p>Delivery Fee: ₹{deliveryFee}</p>
          <h3>Total Amount: ₹{totalAmount}</h3>
        </div>

        <button type="submit" className="confirm-btn">Confirm Order</button>
      </form>
    </div>
  );
}

export default Placeorder;
