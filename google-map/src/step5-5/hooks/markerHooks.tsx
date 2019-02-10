import { useEffect, useState, useContext } from "react"
import { MapContext } from "../context"
export const useDrawMapMarker = ({ position }) => {
  const [markerObject, setMarkerObject] = useState(null)
  const { googleMap, map } = useContext(MapContext)
  useEffect(() => {
    const { Marker } = googleMap.maps
    // すでに描画済みなmarkerだったら描画しない
    if (markerObject) {
      return
    }
    const markerObj = new Marker({
      position,
      map,
      title: "marker!"
    })
    setMarkerObject(markerObj)
    // コンポーネントが消えたらmarkerもmapから消すように仕掛ける。これはすっ
    return () => {
      if (markerObj === null) {
        return
      }
      markerObj.setMap(null)
    }
  }, [googleMap, map])
  return markerObject
}
export const useMarkerEvent = ({ marker, eventHandler, eventName }) => {
  useEffect(() => {
    if (!marker) {
      return
    }
    const listener = marker.addListener(eventName, (e) => {
      eventHandler(e)
    })
    return () => {
      listener.remove()
    }
  }, [marker, eventHandler, eventName])
}
