import React, { useRef, useState, useEffect, useLayoutEffect } from "react"
import {
  useGoogleMap,
  useMap,
  useDrawMapMarker,
  useMarkerState,
  useMapClickEvent,
  useMapInfoWindow,
  useMarkerClickEvent,
  useMarkerEvent
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

const MarkerInfoWindow = ({
  googleMap,
  map,
  marker,
  position,
  onDoubleClick
}) => {
  const contentRef = useRef(null)
  const infoWindow = useMapInfoWindow({
    googleMap,
    marker,
    contentNode: contentRef.current
  })
  useMarkerEvent({
    marker,
    eventName: "click",
    eventHandler: () => {
      infoWindow.open(map, marker)
    }
  })
  useMarkerEvent({
    marker,
    eventName: "dblclick",
    eventHandler: onDoubleClick
  })
  return (
    <Cloak>
      <div ref={contentRef}>
        hello, {position.lat}, {position.lng}
      </div>
    </Cloak>
  )
}

const Marker = ({ googleMap, map, position }) => {
  const marker = useDrawMapMarker({
    googleMap,
    map,
    position
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
  const { markers, removeMarker } = useMapMarkerSetup({ map, googleMap })
  return (
    <>
      {markers.map(({ id, position }) => (
        <Marker
          key={id} // hooksがkeyに紐づく。これがないと適切なマーカーが消えなくなる
          position={position}
          map={map}
          onClickMarker={() => {
            removeMarker(id)
          }}
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
