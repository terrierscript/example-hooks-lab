import { useCallback, useReducer } from "react"
import uuid from "uuid/v4"
const markerReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = uuid()
      return {
        ...state,
        [id]: action.payload
      }
    case "REMOVE":
      const { [action.payload]: removeItem, ...rest } = state
      return rest
    default:
      return state
  }
}
const mapReducerInitializer = (initialMarkers) => {
  return initialMarkers.reduce((state, marker) => {
    return markerReducer(state, {
      type: "ADD",
      payload: marker
    })
  }, {})
}
// markerをstate管理する
export const useMarkerState = (initialMarkers) => {
  const [markers, dispatch] = useReducer(
    markerReducer,
    initialMarkers,
    mapReducerInitializer
  )
  // マーカーの追加・削除のaction関数
  const addMarker = useCallback(
    (position) => dispatch({ type: "ADD", payload: position }),
    [dispatch]
  )
  const removeMarker = useCallback(
    (removeUuid) => dispatch({ type: "REMOVE", payload: removeUuid }),
    [dispatch]
  )
  // 外向けにはobjectではなくarrayとして返す
  const getMarkers = useCallback(
    () => Object.entries(markers).map(([id, position]) => ({ id, position })),
    [markers]
  )
  return {
    // markers // objectとしてのmarkerは隠蔽する
    addMarker,
    removeMarker,
    getMarkers
  }
}
