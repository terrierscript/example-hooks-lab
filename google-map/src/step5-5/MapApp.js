import React, { useRef, useContext, useCallback } from "react"
import { useGoogleMap, useMap, useMapClickEvent } from "./hooks/mapHooks"
import { useMapInfoWindow } from "./hooks/infoWindowHooks"
import { useDrawMapMarker, useMarkerEvent } from "./hooks/markerHooks"
import { useMarkerState } from "./hooks/markerStateHooks"
import styled from "styled-components"
import { MapContext, MarkerContext } from "./context"

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

const MarkerInfoWindow = ({ marker, position }) => {
  const { map } = useContext(MapContext)
  const contentRef = useRef(null)
  // contentRefのDOMNodeを表示要素としたinfoWindowを作る
  const infoWindow = useMapInfoWindow(contentRef.current)

  useMarkerEvent({
    marker,
    eventName: "click",
    eventHandler: () => infoWindow.open(map, marker)
  })
  return (
    <Cloak>
      <div ref={contentRef}>
        <b>hello</b>, {position.lat}, {position.lng}
      </div>
    </Cloak>
  )
}

const Marker = ({ position, onDoubleClick }) => {
  const marker = useDrawMapMarker({
    position
  })
  useMarkerEvent({ marker, eventName: "dblclick", eventHandler: onDoubleClick })

  return <MarkerInfoWindow marker={marker} position={position} />
}

const useMapMarkerSetup = () => {
  const { googleMap, map } = useContext(MapContext)
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

const MapMarkers: React.SFC<any> = () => {
  const { markers, removeMarker } = useMapMarkerSetup()
  return (
    <>
      {markers.map(({ id, position }) => (
        <Marker
          key={id} // hooksがkeyに紐づく。これがないと適切なマーカーが消えなくなる
          position={position}
          onDoubleClick={() => {
            removeMarker(id)
          }}
        />
      ))}
    </>
  )
}

const WaitForMap = ({ googleMap, map, children }) => {
  if (!googleMap || !map) {
    return null
  }
  const value = {
    googleMap,
    map
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
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
