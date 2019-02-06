import React from "react"
import { render } from "react-dom"
import { Before } from "./before";

const App = () => {
  return <Before></Before>
}
export const start = () => {
  render(<App />, document.querySelector("#app"))
}

start()
