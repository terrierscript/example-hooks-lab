import React, { useState, useEffect, useCallback } from "react"
import { render } from "react-dom"
import useDeviceOrientation from "@rehooks/device-orientation"

function MyApp() {
  let value = useDeviceOrientation()
  return (
    <div>
      <p>Absolute: {value.absolute}</p>
      <p>Alpha: {value.alpha}</p>
      <p>Beta: {value.beta}</p>
      <p>Gamma: {value.gamma}</p>
    </div>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
