import React, { useState, useEffect, useCallback } from "react"
import { render } from "react-dom"

export const MyApp = () => {
  return (
    <div>
    </div>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
