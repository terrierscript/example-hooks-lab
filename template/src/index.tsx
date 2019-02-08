import React from "react"
import { render } from "react-dom"

export const App = () => {
  return <div />
}

export const start = () => {
  render(<App />, document.querySelector("#app"))
}

start()
