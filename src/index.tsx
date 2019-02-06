import React, { useState, useEffect, useCallback } from "react"
import { render } from "react-dom"

const initialHelloFn = () => {
  console.log("initial")
}
const useCounter = () => {
  const [count, setCounter] = useState(0)
  const [helloFn, setHelloFn] = useState({ fn: initialHelloFn })
  const newFn = useCallback(() => {
    console.log("hello!", count)
  }, [count])
  useEffect(() => {
    setHelloFn({ fn: newFn })
  }, [newFn, setHelloFn])
  return {
    count,
    setCounter,
    helloFn: helloFn.fn
  }
}
export const MyApp = () => {
  const { count, setCounter, helloFn } = useCounter()
  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => setCounter(count + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => helloFn()}>hello</button>
      </div>
    </div>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
