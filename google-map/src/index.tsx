import React from "react"
import { render } from "react-dom"
import { MapApp } from "./step4-3/index"

export const start = () => {
  render(<MapApp />, document.querySelector("#root"))
}

start()
