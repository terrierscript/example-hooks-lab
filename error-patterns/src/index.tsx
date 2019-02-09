import React, { useState } from "react"
import { render } from "react-dom"

export const App = () => {
  let item: number[] = []
  // ❌ やっちゃいけないやつ
  for (let i = 0; i < 10; i++) {
    let [a] = useState(i)
    item.push(a)
  }
  return <div>hello {item.join("-")}</div>
}

export const start = () => {
  render(<App />, document.querySelector("#root"))
}

start()
