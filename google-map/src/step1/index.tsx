import React from "react"
import { useGoogleMap, useMap } from "./hooks"
import { useRef } from "react"

const API_KEY = undefined

const initialConfig = {
  zoom: 12,
  center: { lat: 35.6432027, lng: 139.6729435 }
}
// hookを利用して表示するコンポーネント
export const MapApp = () => {
  const googleMap = useGoogleMap(API_KEY)
  const mapContainerRef = useRef(null)
  useMap({ googleMap, mapContainerRef, initialConfig })
  return (
    <div
      style={{
        // ホントはstyled-componentsとかで良いのだけど簡略化
        height: "100vh",
        width: "100%"
      }}
      ref={mapContainerRef}
    />
  )
}
