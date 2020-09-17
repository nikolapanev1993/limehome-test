import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { HERE_API_KEY, svgMarkup } from '../constants';
import * as actions from '../store/actions';
import HotelList from '../Hotels/HotelList';

const Map = (props) => {
  const mapRef = React.useRef(null);
  const [currentCard, setCurrentCard] = useState({});

  const { onFetchHotels, hotels } = props;

  useEffect(() => {
    onFetchHotels();
  }, [onFetchHotels]);

  const onClickEvent = (hotel) => {
    hotels.results.items.sort(function (x, y) {
      return x == hotel ? -1 : y == hotel ? 1 : 0;
    });

    document.querySelector('.scrollmenu').scrollLeft = 0;
    setCurrentCard(hotel);
  };

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: HERE_API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 50, lng: 5 },
      zoom: 14,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    hotels &&
      hotels.results.items.map((hotel) => {
        const icon = new H.map.Icon(svgMarkup),
          coords = { lat: hotel.position[0], lng: hotel.position[1] },
          marker = new H.map.Marker(coords, { icon: icon });

        hMap.addObject(marker);
        hMap.setCenter(coords);

        marker.addEventListener('tap', () => onClickEvent(hotel), false);
      });

    return () => {
      hMap.dispose();
    };
  }, [mapRef, hotels]);

  return (
    <React.Fragment>
      <div className='map' ref={mapRef} style={{ height: '100vh' }} />
      <HotelList hotels={props.hotels} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    hotels: state.hotels,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHotels: () => dispatch(actions.fetchHotels()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
