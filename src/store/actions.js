import axios from 'axios';

import { HERE_API_KEY, HERE_API_URL } from '../constants';

export const FETCH_HOTELS_START = 'FETCH_HOTELS_START';
export const FETCH_HOTELS_SUCCESS = 'FETCH_HOTELS_SUCCESS';
export const FETCH_HOTELS_FAIL = 'FETCH_HOTELS_FAIL';

export const fetchHotelsStart = () => {
  return {
    type: FETCH_HOTELS_START,
  };
};

export const fetchHotelsSuccess = (hotels) => {
  return {
    type: FETCH_HOTELS_SUCCESS,
    hotels: hotels,
  };
};

export const fetchHotelsFail = (error) => {
  return {
    type: FETCH_HOTELS_FAIL,
    error: error,
  };
};

export const fetchHotels = () => {
  return (dispatch) => {
    dispatch(fetchHotelsStart());

    let url = `${HERE_API_URL}/places/v1/discover/around?at=40.7143528,-74.0059731&cat=Hotel&apiKey=${HERE_API_KEY}`;

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        dispatch(fetchHotelsSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchHotelsFail(error));
      });
  };
};
