import { useEffect, useState, useCallback, useReducer, useRef } from "react"
import GoogleMapsApiLoader from "google-maps-api-loader"
// @ts-ignore
import uuid from "uuid/v4"

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

// 単体でマーカーを描画する
export const useDrawMapMarker = ({
  position,
  googleMap,
  map,
  onClickMarker
}) => {
  // stateだと初回描画ほ保持がうまくいかないのでここではrefを利用する
  const markerObjectsRef = useRef(null)
  useEffect(() => {
    const { Marker } = googleMap.maps
    // すでに描画済みなmarkerだったら描画しない
    if (markerObjectsRef.current) {
      return
    }
    const markerObj = new Marker({
      position,
      map,
      title: "marker!"
    })
    // markerがクリックされた時のイベントを追加する
    markerObj.addListener("click", (e) => {
      onClickMarker(e)
    })
    markerObjectsRef.current = markerObj
    // コンポーネントが消えたらmarkerもmapから消すように仕掛ける。これはすっ
    return () => {
      if (markerObjectsRef.current === null) {
        return
      }
      markerObjectsRef.current.setMap(null)
    }
  }, [googleMap, map])
}

// markerをstate管理する
export const useMarkerState = (initialMarkers) => {
  const [markers, setMarkers] = useState(initialMarkers)
  // マーカーの追加処理はsetMarkersを加工する形に
  const addMarker = ({ lat, lng }) => {
    setMarkers([...markers, { lat, lng }])
  }
  const removeMarker = (i) => {
    setMarkers([...markers.slice(0, i), null, ...markers.slice(i + 1)])
  }
  return {
    markers,
    addMarker,
    removeMarker
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
