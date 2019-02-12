import React, { useMemo, useCallback } from "react"
import { useState } from "react"
import { FORMERR } from "dns"

const isValid = (value) => {
  return value !== ""
}

const Error = ({ isValid, message }) => {
  if (isValid) {
    return null
  }
  return <div>Error: {message}</div>
}
const InputField = ({ value, setValue }) => {
  return (
    <>
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
  const [value, setValue] = useState("")
  const [showError, setShowError] = useState(false)
  const valid = useMemo(() => {
    return isValid(value)
  }, [value])
  const onSubmit = useCallback(() => {
    if (!valid) {
      setShowError(true)
      return
    }
    // return submit()
  }, [valid])
  return (
    <div>
      {showError && <Error isValid={valid} message="不正なinput" />}
      <InputField value={value} setValue={setValue} />
      <button onClick={onSubmit}>add</button>
    </div>
  )
}
