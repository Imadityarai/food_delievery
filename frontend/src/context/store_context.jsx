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

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addtoCart,
        removefromCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider