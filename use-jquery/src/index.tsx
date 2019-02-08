import React, { useState, useEffect, useCallback } from "react"
import { render } from "react-dom"

const Button = () => {
  const onClick = useCallback(() => {
    // @ts-ignore
    $("#my-jquery-item").click()
  }, [])
  return <button onClick={onClick}>Fire</button>
}
export const MyApp = () => {
  return <div />
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
