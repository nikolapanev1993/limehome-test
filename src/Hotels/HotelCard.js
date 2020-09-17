import React from 'react';

import './Hotels.css';

const HotelCard = (props) => {
  return props.hotel ? (
    <div className='center'>
      <div className='property-card'>
        <div className='property-card-top'>
          <img
            className='property-image'
            src='https://img-aws.ehowcdn.com/560x560p/photos.demandstudios.com/getty/article/99/213/186408562.jpg'
            alt=''
          />
          <div className='property-details'>
            <p className='property-title'>{props.hotel.title}</p>
            <p className='property-location-details'>
              {props.hotel.distance} M FROM THE CITY CENTER
            </p>
            <p className='property-price'>&pound;98</p>
          </div>
        </div>
        <div className='property-card-bottom'>
          <button className='property-card-button'>Book</button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HotelCard;
