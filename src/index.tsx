import React from "react"
import { render } from "react-dom"

export const MyApp = () => {
  return <div>aa</div>
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}
