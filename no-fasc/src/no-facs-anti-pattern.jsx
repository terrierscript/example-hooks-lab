import { useContext } from "react"

// でもこうやりたくなるよなー。危ないニオイのするコンポーネント・・・
const PresentationalSmartComponent = () => {
  const { name, description } = useContext(UserProfile)
  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  )
}

export const App = () => {
  return <PresentationalSmartComponent />
}
