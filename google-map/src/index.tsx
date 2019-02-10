import React from "react"
import { render } from "react-dom"
import { MapApp } from "./step5-5/index"
// import { MapApp } from "./step4-2-2/index"

export const start = () => {
  render(<MapApp />, document.querySelector("#root"))
}

start()
