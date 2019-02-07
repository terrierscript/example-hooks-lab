import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"
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
  useEffect(() => {
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
const useRandomNumber = () => {
  const [num, setNum] = useState(" ")
  const delay = useMemo(() => random(10, 1000), [])

  useInterval(() => {
    setNum(randomNum().toString())
  }, delay)
  return num
}

const Item = styled.div`
  color: green;
  width: 1em;
  height: 1.5em;
`

const Num = () => {
  const num = useRandomNumber()
  return <Item>{num}</Item>
}
const Grid = styled.div`
  padding: 2em;
  display: grid;
  grid-template-columns: repeat(10, 1em);
  grid-template-rows: auto;
  text-align: center;
  /* grid-gap: 5px; */
`

const Numbers = ({ row, col }) => {
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
      <Grid>
        {Array.from({ length: row }).map((_, i) =>
          Array.from({ length: col }).map((_, j) => {
            return <Num key={`${i}-${j}`} />
          })
        )}
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

const App = () => {
  const [started, setStarted] = useState(false)
  const [row, setRow] = useState(10)
  const [col, setCol] = useState(10)

  if (started) {
    return <Numbers row={row} col={col} />
  } else {
    return (
      <div>
        <NumberInput name={"row"} value={row} update={setRow} />
        <NumberInput name={"col"} value={col} update={setCol} />
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
