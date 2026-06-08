import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)
import { food_list } from "../assets/frontend_assets/assets";
const StoreContextProvider = (props) => {
    const[cartItems,setCartItems]=useState({});
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
  totalAmount
};

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider