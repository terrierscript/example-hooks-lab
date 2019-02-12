import React from "react"
import { render } from "react-dom"
import { FormApp } from "./1-2/Form"

export const App = () => {
  return <FormApp />
}

export const start = () => {
  render(<App />, document.querySelector("#root"))
}

start()
