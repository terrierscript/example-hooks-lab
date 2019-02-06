import React, { useState, useContext } from "react"
import { render } from "react-dom"

const CounterContext = React.createContext({
  owner: "unknown",
  count: 0,
  setCount: (args) => {}
})

const CounterProvider = ({ owner, initialValue = 1, children }) => {
  const [count, setCount] = useState(initialValue)
  const value = { count, owner, setCount }
  return (
    <CounterContext.Provider value={value}>
      <h1>
        {owner}: {value.count}
      </h1>
      {children}
    </CounterContext.Provider>
  )
}

const Consumer = () => {
  const { setCount, count, owner } = useContext(CounterContext)
  return (
    <div>
      <h1>
        Consumer: {count}, Owner: {owner}
      </h1>
      <button onClick={() => setCount(count + 1)}>increment</button>
    </div>
  )
}

export const MyApp = () => {
  return (
    <div>
      <CounterProvider owner="A" initialValue={3}>
        <Consumer />
      </CounterProvider>
      <CounterProvider owner="B">
        <Consumer />
      </CounterProvider>
    </div>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
