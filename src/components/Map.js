import React from "react";
import {
  ComposableMap,
  Geographies,
  ZoomableGroup,
  Geography,
  Markers,
  Marker
} from "react-simple-maps"

import './Map.css'

class Map extends React.Component {

  render() {
    const { locations } = this.props

    let width = 800
    let height = 450

    let lats = locations.map(l => l.lat)
    let lngs = locations.map(l => l.lng)
    let markers = locations.map(l => ({ markerOffset: 20, name: l.title, coordinates: [l.lng, l.lat] }))

    const dx = Math.max(...lngs) - (Math.max(...lngs) - Math.min(...lngs)) / 2
    const dy = Math.max(...lats) - (Math.max(...lats) - Math.min(...lats)) / 2

    return (
      <section className="Map Container narrow">
        <ComposableMap>
          <ZoomableGroup center={[dx, dy]} disablePanning>
          <Geographies geography={"/world-50m.json"}>
            {(geographies, projection) => geographies.map(geography => (
              <Geography
                key={geography.id}
                geography={geography}
                projection={projection}
              />
            ))}
          </Geographies>
            <Markers>
              {markers.map((marker, i) => (
                <Marker
                  key={i}
                  marker={marker}
                >
                  <circle
                    cx={0}
                    cy={0}
                    r={5}
                  />
                  <text
                    textAnchor="middle"
                    y={marker.markerOffset}
                  >
                    {marker.name}
                  </text>
                </Marker>
              ))}
            </Markers>
          </ZoomableGroup>
        </ComposableMap>
      </section>
    )
  }
}

export default Map
