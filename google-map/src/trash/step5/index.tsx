import React, { useRef } from "react"
import {
  useGoogleMap,
  useMap,
  useDrawMapMarker,
  useMarkerState,
  useMapClickEvent,
  useMapInfoWindow
} from "./hooks"
import styled from "styled-components"

const API_KEY = undefined

const initialConfig = {
  zoom: 12,
  center: { lat: 35.6432027, lng: 139.6729435 }
}

const initialMarkers = [
  { lat: 35.6432027, lng: 139.6729435 },
  { lat: 35.5279833, lng: 139.6989209 },
  { lat: 35.6563623, lng: 139.7215211 },
  { lat: 35.6167531, lng: 139.5469376 },
  { lat: 35.6950961, lng: 139.5037899 }
]

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`

const Cloak = styled.div`
  display: none;
`

const MarkerInfoWindow = ({ googleMap, map, position, marker }) => {
  const windowRef = useRef(null)

  useMapInfoWindow({
    googleMap,
    map,
    marker,
    contentNode: windowRef.current
  })
  return (
    <Cloak>
      <div ref={windowRef}>
        hello, {position.lat}, {position.lng}
      </div>
    </Cloak>
  )
}

const MarkerWithWindow = ({ googleMap, map, position, onClickMarker }) => {
  const marker = useDrawMapMarker({
    googleMap,
    map,
    position,
    onClickMarker
  })

  return (
    <MarkerInfoWindow
      googleMap={googleMap}
      map={map}
      marker={marker}
      position={position}
    />
  )
}

const useMapMarkerSetup = ({ googleMap, map }) => {
  const { addMarker, removeMarker, getMarkers } = useMarkerState(initialMarkers)
  const markers = getMarkers()
  // クリックイベントを追加
  useMapClickEvent({
    onClickMap: ({ lat, lng }) => {
      addMarker({ lat, lng })
    },
    map,
    googleMap
  })
  return { markers, removeMarker }
}

const MapMarkers: React.SFC<any> = ({ map, googleMap }) => {
  const { markers } = useMapMarkerSetup({ map, googleMap })
  return (
    <>
      {markers.map(({ id, position }) => (
        <MarkerWithWindow
          key={id} // hooksがkeyに紐づく。これがないと適切なマーカーが消えなくなる
          position={position}
          map={map}
          onClickMarker={() => {}}
          googleMap={googleMap}
        />
      ))}
    </>
  )
}

const WaitForMap = ({ googleMap, map, children }) => {
  if (!googleMap || !map) {
    return null
  }
  return children
}

export const MapApp = () => {
  const googleMap = useGoogleMap(API_KEY)
  const mapContainerRef = useRef(null)
  const map = useMap({
    googleMap,
    mapContainerRef,
    initialConfig
  })
  return (
    <>
      <MapContainer ref={mapContainerRef} />
      <WaitForMap googleMap={googleMap} map={map}>
        <MapMarkers googleMap={googleMap} map={map} />
      </WaitForMap>
    </>
  )
}
