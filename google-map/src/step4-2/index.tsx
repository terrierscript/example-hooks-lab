import React, { useRef } from "react"
import {
  useGoogleMap,
  useMap,
  useDrawMapMarker,
  useMarkerState,
  useMapClickEvent
} from "./hooks"
import styled from "styled-components"
import { useDrawMapMarkers } from "step3/hooks";

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

const Marker = ({ googleMap, map, position, id ,removeMarker }) => {
  useDrawMapMarker({ 
    googleMap,
    map,
    position,
    onClickMarker: (markerObjRef) => {
      markerObjRef.setMap(null)
      removeMarker(id)
    }})
  return null
}

const MapMarkers = ({map, googleMap}) => {
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
  return markers.map( ({id, position}) => (
    <Marker id={id} position={position} removeMarker={removeMarker} map={map} googleMap={googleMap}  />
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
