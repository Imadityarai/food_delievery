import { createContext, useEffect, useState } from "react";
import axios from "axios"
export const StoreContext = createContext(null)
const StoreContextProvider = (props) => {
    const[cartItems,setCartItems]=useState({});
    const [token,setToken]=useState("");
    const [food_list,setFoodlist]=useState([]);
    const get_data= async()=>{
const response =await axios.get("http://localhost:4000/api/food/list");
setFoodlist(response.data.data);
    }
    get_data()
    const addtoCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({
                ...prev,[itemId]:1
            }))
        }
        else {
            setCartItems((prev)=>
                ({...prev,[itemId]:prev[itemId]+1

                  }
        )) 
        console.log('Adding item:', itemId);}
    }
const removefromCart=(itemId)=>{
    setCartItems((prev)=>({
        ...prev,[itemId]:prev[itemId]-1
    }))
}
useEffect(()=>{
    console.log(cartItems);

},[cartItems])

const subtotal = food_list.reduce((acc, item) => {
  return acc + (cartItems[item._id] ? cartItems[item._id] * item.price : 0);
}, 0);

const deliveryFee = subtotal > 0 ? 50 : 0;
const totalAmount = subtotal + deliveryFee;

const contextValue = {
  food_list,
  cartItems,
  addtoCart,
  removefromCart,
  subtotal,
  deliveryFee,
  totalAmount,
  token,
  setToken
};

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider