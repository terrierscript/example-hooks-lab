const useMapMarkerSetup = ({ googleMap, map }) => {
  const { markers, addMarker } = useMarkerState(initialMarkers)
  useMapMarker({ markers, googleMap, map })
  useMapClickEvent({
    onClickMap: ({ lat, lng }) => {
      addMarker({ lat, lng })
    },
    map,
    googleMap
  })
}
const MapMarkers = ({ googleMap, map }) => {
  useMapMarkerSetup({ googleMap, map })
  return null
}
