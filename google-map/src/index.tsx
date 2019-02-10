import React from "react"
import { render } from "react-dom"
import { MapApp } from "./step5-4/index"

export const start = () => {
  render(<MapApp />, document.querySelector("#root"))
}

start()
