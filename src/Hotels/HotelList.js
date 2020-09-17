import React from 'react';

import './Hotels.css';
import HotelCard from './HotelCard';

const HotelList = (props) => {
  return (
    <div className='scrollmenu'>
      {props.hotels &&
        props.hotels.results.items.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
    </div>
  );
};

export default HotelList;
