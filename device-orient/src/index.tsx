import React, { useState, useEffect, useCallback } from "react"
import { render } from "react-dom"
import useDeviceOrientation from "@rehooks/device-orientation"
import { useSpring, animated } from "react-spring"

const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`

function MyApp() {
  let value = useDeviceOrientation()
  const [props, set] = useSpring(() => ({
    xy: [value.beta, value.gamma],
    config: { mass: 10, tension: 550, friction: 140 }
  }))

  return (
    <div>
      <p>Absolute: {value.absolute}</p>
      <p>Alpha: {value.alpha}</p>
      <p>Beta: {value.beta}</p>
      <p>Gamma: {value.gamma}</p>
      <animated.div style={{ transform: props.xy.interpolate(trans1) }}>
        ●
      </animated.div>
    </div>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
