import React, { createContext, useState, useEffect } from "react";
import all_product from "../components/assests/data/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for(let i=0; i<all_product.length+1; i++){
        cart[i] = 0;
    }
    return cart;
}


const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(getDefaultCart())
    
    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            fetch('https://shopease-g13m.onrender.com/getcart',{
                method: "POST",
                headers: {
                Accept: "application/form-data",
                "auth-token": `${localStorage.getItem('auth-token')}`,
                "Content-Type":"application/json"
                },
                body: ""
            })
            .then((res) => res.json())
            .then((data) => setCartItem(data));
        }
    })

    const addToCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://shopease-g13m.onrender.com/addtocart',{
                method: "POST",
                headers: {
                  Accept: "application/form-data",
                  "auth-token": `${localStorage.getItem('auth-token')}`,
                  "Content-Type":"application/json"
                },
                body: JSON.stringify({"itemId":itemId})
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) =>({ ...prev, [itemId]: prev[itemId] - 1 }));
            if (localStorage.getItem('auth-token')) {
                fetch('https://shopease-g13m.onrender.com/removefromcart', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "auth-token": `${localStorage.getItem('auth-token')}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "itemId": itemId })
                })
                .then((res) => res.json())
                .then((data) => console.log("Item removed from cart"))
                .catch((err) => console.error(err));
        }
    };
    

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = all_product.find((prod)=>prod.id===Number(item))
                totalAmount += itemInfo.new_price * cartItem[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                totalItems += cartItem[item];
            }
        }
        return totalItems;
    }

    const contextValue = {all_product,cartItem,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
