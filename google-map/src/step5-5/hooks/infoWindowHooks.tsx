import { useEffect, useState, useContext } from "react"
import { MapContext } from "../context"
export const useMapInfoWindow = (content) => {
  const [infoWindowState, setInfoWindow] = useState(null)
  const { googleMap } = useContext(MapContext)
  useEffect(() => {
    if (!content) {
      return
    }
    // infoWindowの再描画防止
    if (infoWindowState) {
      return
    }
    const infoWindowObj = new googleMap.maps.InfoWindow({ content })
    setInfoWindow(infoWindowObj)
    return () => {
      infoWindowObj.close()
    }
  }, [googleMap, content])
  return infoWindowState
}
