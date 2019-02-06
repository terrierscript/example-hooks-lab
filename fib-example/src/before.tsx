import React, { Component, ReactNode, createContext } from "react"

const fib = (n) => {
  if (n < 2) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

class Fib extends Component<
  { initialValue: number; children: (...args) => ReactNode },
  { result: number }
> {
  constructor(props) {
    super(props)
    this.state = {
      result: 0
    }
  }
  calcFib = (n) => {
    this.setState({ result: fib(n) })
  }
  componentDidMount() {
    this.calcFib(this.props.initialValue)
  }
  render() {
    return (
      <>
        {this.props.children({
          result: this.state.result,
          calcFib: this.calcFib
        })}
      </>
    )
  }
}

const CounterContext = createContext({
  count: 0,
  setCount: (args) => {}
})
class Counter extends Component<{}, { count: number }> {
  constructor(props) {
    super(props)
    this.state = {
      count: 10
    }
  }
  render() {
    const value = {
      count: this.state.count,
      setCount: (cnt: number) => this.setState({ count: cnt })
    }
    console.log(CounterContext.Provider)
    return (
      <CounterContext.Provider value={value}>
        {this.props.children}
      </CounterContext.Provider>
    )
  }
}

class Main extends Component {
  static contextType = CounterContext
  render() {
    const { count, setCount } = this.context
    return (
      <Fib initialValue={count}>
        {({ result, calcFib }) => {
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
        }}
      </Fib>
    )
  }
}

export const Before = () => {
  return (
    <Counter>
      <Main />
    </Counter>
  )
}
