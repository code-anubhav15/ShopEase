import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assests/images/cart_cross_icon.png'

const CartItems = () => {

    const {all_product,cartItem,addToCart,removeFromCart,getTotalCartAmount} = useContext(ShopContext)

  return (
    <div className='cartitems'>
      <div className="cartitems-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
        if(cartItem[e.id]>0){
            return(
            <div>
                <div className="cartitems-format cartitems-main">
                    <img src={e.image} className='carticon-product' alt="" />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quatity'>{cartItem[e.id]}</button>
                    <p>${e.new_price*cartItem[e.id]}</p>
                    <img className='carticon-remove' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                </div>
                <hr/>
            </div>
            )
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
            <h1>Cart Total</h1>
            <div>
                <div className="cartitems-total-items">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <div className="cartitems-total-items">
                    <p>Shipping Fees</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-items">
                    <h3>Total</h3>
                    <p>${getTotalCartAmount()}</p>
                </div>
            </div>
            <button>Proceed</button>
        </div>
      </div>
    </div>
  )
}

export default CartItems
