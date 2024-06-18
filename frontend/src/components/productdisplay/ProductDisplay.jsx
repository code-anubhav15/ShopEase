import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../context/ShopContext';
const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext)

  return (
    <div className='product-display'>
      <div className="productdisplay-left">
        <div className="prodctdisplay-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
            <img className='productdisplay-main-img' src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">${product.old_price}</div>
            <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem ut sed tenetur! Commodi, deserunt! Totam vitae soluta at. Eum, repudiandae?
        </div>
        <div className="productdisplay-right-size">
            <h1>Select size</h1>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        </div>
        <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
        <p className="productdisplay-right-category">
            <span>Category : </span> Women, T-shirt, Crop-Top
        </p>
        <p className="productdisplay-right-category">
            <span>Tags : </span> Modern, Latest
        </p>
      </div>
    </div>
  )
}

export default ProductDisplay
