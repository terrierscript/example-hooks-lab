import { useEffect, useState, useCallback, useRef } from "react"
import GoogleMapsApiLoader from "google-maps-api-loader"

// Google Mapのオブジェクトを呼び出すだけのhooks
export const useGoogleMap = (apiKey) => {
  const [googleMap, setGoogleMap] = useState(null)
  useEffect(() => {
    GoogleMapsApiLoader({ apiKey }).then((google) => {
      setGoogleMap(google)
    })
  }, []) // useEffectの第二引数を[]にすることで、初回1回目だけ実行される
  return googleMap
}

// 実際にMapをDOMにマウントする処理。
export const useMap = ({ googleMap, mapContainerRef, initialConfig }) => {
  const [map, setMap] = useState(null)
  useEffect(() => {
    // googleMapかmapContainerRefが初期化されてなければ何もしない
    if (!googleMap || !mapContainerRef.current) {
      return
    }
    const map = new googleMap.maps.Map(mapContainerRef.current, initialConfig)
    setMap(map)
  }, [googleMap, mapContainerRef]) // initialConfigは変わったとしても再マウントするとおかしなことになるので更新対象にしない // googleMapかmapContainerRefが変化したらeffectが発火する。

  // あとで使えるようにmapを返すようにする
  return map
}

export const useDrawMapMarkers = ({ markers, googleMap, map }) => {
  // stateだと初回描画ほ保持がうまくいかないのでここではrefを利用する
  const markerObjectsRef = useRef({})
  useEffect(() => {
    // 初期化がまだなら何もしない
    if (!googleMap || !map) {
      return
    }
    const { Marker } = googleMap.maps
    markers.map((position, i) => {
      if (markerObjectsRef.current[i]) {
        // すでに描画済みだったら何もしない。
        return
      }
      const markerObj = new Marker({
        position,
        map,
        title: "marker!"
      })
      markerObjectsRef.current[i] = markerObj
    })
  }, [markers, googleMap, map])
}

// markerをstate管理する
export const useMarkerState = (initialMarkers) => {
  const [markers, setMarkers] = useState(initialMarkers)
  // マーカーの追加処理はsetMarkersを加工する形に
  const addMarker = ({ lat, lng }) => {
    setMarkers([...markers, { lat, lng }])
  }
  return {
    markers,
    addMarker
  }
}

// Mapがクリックされたらイベントを飛ばすhooks
export const useMapClickEvent = ({ onClickMap, googleMap, map }) => {
  useEffect(() => {
    const listener = googleMap.maps.event.addListener(map, "click", (e) => {
      console.log(e)
      onClickMap({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })
    })
    // onClickMapが変更されたらつくったイベントをクリアする
    //（じゃないとクリックするたびにイベントが大量閣下さえる）
    return () => {
      googleMap.maps.event.removeListener(listener)
    }
  }, [googleMap, map, onClickMap])
}
