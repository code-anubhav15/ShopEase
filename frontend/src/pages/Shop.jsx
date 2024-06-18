import React from 'react'
import Banner from '../components/banner/Banner';
import Popular from '../components/popular/Popular';
import Offer from '../components/offers/Offer';
import NewCollections from '../components/newCollections/NewCollections';

const Shop = () => {
  return (
    <div>
      <Banner/>
      <Popular/>
      <Offer />
      <NewCollections />
    </div>
  )
}

export default Shop;
