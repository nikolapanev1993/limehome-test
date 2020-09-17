import {
  FETCH_HOTELS_START,
  FETCH_HOTELS_SUCCESS,
  FETCH_HOTELS_FAIL,
} from './actions';
import { updateObject } from './utility';

const initialState = {
  hotels: null,
  error: null,
  loading: false,
};

const fetchHotelsStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchHotelsSuccess = (state, action) => {
  return updateObject(state, {
    hotels: action.hotels,
    error: null,
    loading: false,
  });
};

const fetchHotelsFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOTELS_START:
      return fetchHotelsStart(state, action);
    case FETCH_HOTELS_SUCCESS:
      return fetchHotelsSuccess(state, action);
    case FETCH_HOTELS_FAIL:
      return fetchHotelsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
