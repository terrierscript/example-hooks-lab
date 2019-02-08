import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useLayoutEffect
} from "react"
import { render } from "react-dom"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/core"

const random = (start, end) => Math.ceil(Math.random() * end) + start

function useInterval(callback, delay) {
  const savedCallback = useRef(() => {})

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the interval.
  useLayoutEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
const randomNum = () => random(0, 10) - 1
const useRandomNumber = (delay = null) => {
  const [num, setNum] = useState(0)
  const _delay = useMemo(() => {
    return delay ? delay : random(10, 1000)
  }, [delay])

  useInterval(() => {
    setNum(randomNum())
  }, _delay)
  return num
}

const Item = styled.div`
  color: green;
  width: 1em;
  height: 1.5em;
`

const Num = ({ delay }) => {
  const num = useRandomNumber(delay)
  return <Item>{num}</Item>
}
const Grid = styled.div<any>`
  padding: 2em;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.col}, 1em)`};
  grid-template-rows: auto;
  text-align: center;
  /* grid-gap: 5px; */
`

const maps = (col, row) => {
  const items = Array.from({ length: row }).map((_, i) =>
    Array.from({ length: col }).map((_, j) => [i, j])
  )
  return items.flat()
}

const Numbers = ({ row, col, randomDelay }) => {
  const delay = useMemo(() => (randomDelay ? null : 10), [randomDelay])
  return (
    <>
      <Global
        styles={css`
          body {
            padding: 0;
            margin: 0;
            background: black;
          }
        `}
      />
      <Grid col={col}>
        {maps(col, row).map(([i, j]) => (
          <Num key={`${i}-${j}`} delay={delay} />
        ))}
      </Grid>
    </>
  )
}
const NumberInput = ({ name, value, update }) => (
  <div>
    {name}
    <input
      type="number"
      value={value}
      onChange={(v) => {
        update(Number(v.target.value))
      }}
    />
  </div>
)
const Checkbox = ({ name, value, update }) => (
  <div>
    {name}
    <input
      type="checkbox"
      checked={value}
      onChange={(v) => {
        update(!!v.target.checked)
      }}
    />
  </div>
)

const App = () => {
  const [started, setStarted] = useState(false)
  const [row, setRow] = useState(10)
  const [col, setCol] = useState(10)
  const [randomDelay, setRandomDelay] = useState(true)
  useEffect(() => {
    const params = {
      started,
      row,
      col,
      randomDelay
    }
  }, [started, row, col, randomDelay])
  if (started) {
    return <Numbers row={row} col={col} randomDelay={randomDelay} />
  } else {
    return (
      <div>
        <h1>Benchmark</h1>
        <NumberInput name={"row"} value={row} update={setRow} />
        <NumberInput name={"col"} value={col} update={setCol} />
        <Checkbox
          name={"random delay"}
          value={randomDelay}
          update={setRandomDelay}
        />
        <button onClick={() => setStarted(true)}>Start</button>
      </div>
    )
  }
}
export const MyApp = () => {
  return (
    <>
      <App />
    </>
  )
}

export const start = () => {
  render(<MyApp />, document.querySelector("#app"))
}

start()
