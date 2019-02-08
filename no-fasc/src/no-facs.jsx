// hooksだとこういう具合になるはず
import { useContext } from "react"

// useXXXで分離
const useUser = () => {
  return useContext(UserProfile)
}

// Presentationは分離しておいてContainerだけSmartにしたい
const SmartComponent = () => {
  const user = useUser()
  return <Presentational {...user} />
}

const Presentational = ({ name, description }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  )
}

export const App = () => {
  return <SmartComponent />
}
