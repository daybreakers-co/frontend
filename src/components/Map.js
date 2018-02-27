import React from "react";
import ReactMapboxGl from 'react-mapbox-gl';

import mapStyle from "../mapbox/style";

const MapBoxMap = ReactMapboxGl({
  accessToken: process.env.MAPBOX_TOKEN
});

class Map extends React.Component {

  render() {
    return (
      <section className="map Container wide">
        <MapBoxMap
          zoom={[10]}
          style={mapStyle}
          containerStyle={{height: "300px"}}
        />
      </section>
    )
  }
}

export default Map
