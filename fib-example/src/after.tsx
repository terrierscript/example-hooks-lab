import React, {
  Component,
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback
} from "react"

const fib = (n) => {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

const useFib = () => {
  const [result, setResult] = useState(0)
  const { count } = useContext(CounterContext)
  const calcFib = useCallback(
    (n) => {
      setResult(fib(n))
    },
    [setResult]
  )
  useEffect(() => {
    calcFib(count)
  }, [])
  return { result, calcFib }
}

const CounterContext = createContext({
  count: 0,
  setCount: (args) => {}
})

const Counter = ({ children }) => {
  const [count, setCount] = useState(10)
  const value = { count, setCount }
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}

const Main = () => {
  const { count, setCount } = useContext(CounterContext)
  const { result, calcFib } = useFib()
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>Fib:{result}</div>
      <div>
        <button onClick={() => calcFib(count)}>Caclurate</button>
      </div>
    </div>
  )
}

export const After = () => {
  return (
    <Counter>
      <Main />
    </Counter>
  )
}
