import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { render } from "react-dom"
import GoogleMapsApiLoader from "google-maps-api-loader"
import styled from "styled-components"
import { API_KEY } from "./apikey"

const MapContainer = styled.div`
  height: 100vh;
  width: 100%;
`

const useGoogleMap = (apiKey) => {
  const [googleObj, setGoogleObj] = useState<null | any>(null)
  useEffect(() => {
    GoogleMapsApiLoader({
      apiKey
    }).then((google) => {
      setGoogleObj(google)
    })
  }, [])
  return googleObj
}
const useMapMount = ({ googleObj, mapContainerRef, mapConfig }) => {
  const [mapObj, setMapObj] = useState<null | any>(null)
  useEffect(() => {
    if (!googleObj) return
    if (!mapContainerRef.current) return
    const { Map } = googleObj.maps
    const map = new Map(mapContainerRef.current, mapConfig)
    setMapObj(map)
  }, [googleObj])
  return mapObj
}

const useMapMarker = ({ positions, googleObj, mapObj }) => {
  const markers = useMemo(() => {
    const { Marker } = googleObj.maps
    positions.map((position) => {
      return new Marker({
        position: position,
        map: mapObj,
        title: "Child marker!"
      })
    })
  }, [positions, googleObj, mapObj])
  return markers
}

const useMapClickAppend = ({ addMarker, googleObj, mapObj }) => {
  useEffect(() => {
    googleObj.maps.event.addListener(mapObj, "click", (e) => {
      addMarker(e.latLng.lat(), e.latLng.lng())
    })
  }, [addMarker, googleObj, mapObj])
}

const useMap = ({ mapContainerRef, mapConfig }) => {
  const googleObj = useGoogleMap(API_KEY)
  const mapObj = useMapMount({ googleObj, mapContainerRef, mapConfig })
  if (!googleObj || !mapObj || !mapContainerRef.current) {
    return null
  }
  return {
    googleObj,
    mapObj
  }
}

// hooksを使うだけで何もしないコンポーネント
const MapMarkers = ({ markers, addMarker, googleObj, mapObj }) => {
  useMapMarker({ positions: markers, googleObj, mapObj })
  useMapClickAppend({ addMarker, googleObj, mapObj })
  return null
}

const Map = ({ markers, addMarker }) => {
  const mapConfig = {
    zoom: 12,
    center: markers[0]
  }
  const mapContainerRef = useRef(null)
  const mapResult = useMap({ mapContainerRef, mapConfig })
  return (
    <div>
      <MapContainer ref={mapContainerRef} />
      {mapResult ? (
        <MapMarkers markers={markers} addMarker={addMarker} {...mapResult} />
      ) : null}
    </div>
  )
}

export const App = () => {
  const [markers, setMarkers] = useState([
    { lat: 35.6432027, lng: 139.6729435 },
    { lat: 35.5279833, lng: 139.6989209 },
    { lat: 35.6563623, lng: 139.7215211 },
    { lat: 35.6167531, lng: 139.5469376 },
    { lat: 35.6950961, lng: 139.5037899 }
  ])
  const addMarker = useCallback(
    (lat, lng) => {
      setMarkers([...markers, { lat, lng }])
    },
    [setMarkers]
  )
  return <Map markers={markers} addMarker={addMarker} />
}

export const start = () => {
  render(<App />, document.querySelector("#root"))
}

start()
