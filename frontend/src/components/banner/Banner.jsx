import React from 'react'
import './Banner.css'
import hand_icon from '../assests/images/hand_icon.png';
import arrow_icon from '../assests/images/arrow.png';
import hero_image from '../assests/images/hero_image.png';

const Banner = () => {
  return (
    <div>
      <div className="banner">
        <div className="banner-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="banner-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>for Everyone</p>
            </div>
            <div className="banner-latest-btn">
                <div>Latest Collections</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="banner-right">
            <img src={hero_image} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Banner
