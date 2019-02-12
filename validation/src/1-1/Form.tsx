import React, { useMemo } from "react"
import { useState } from "react"

const isValid = (value) => {
  return value !== ""
}

const Error = ({ isValid, message }) => {
  if (isValid) {
    return null
  }
  return <div>Error: {message}</div>
}
const Input = () => {
  const [value, setValue] = useState("")
  const valid = useMemo(() => {
    return isValid(value)
  }, [value])

  return (
    <>
      <Error isValid={valid} message="不正なinput" />
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </>
  )
}

export const FormApp = () => {
  return <Input />
}
