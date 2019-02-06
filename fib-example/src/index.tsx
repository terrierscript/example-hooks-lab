import React from "react"
import { render } from "react-dom"
import { Before } from "./before"
import { After } from "./after"

const App = () => {
  return (
    <div>
      <h4>Before</h4>
      <Before />
      <h4>After</h4>
      <After />
    </div>
  )
}
export const start = () => {
  render(<App />, document.querySelector("#app"))
}

start()
