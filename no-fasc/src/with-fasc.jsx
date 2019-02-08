// Function as Childrenだった頃のコード
import { useContext } from "react"

const SmartComponent = (children) => {
  const user = useContext(UserProfile)
  return children(user)
}

const PresentationalComponent = ({ name, description }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{description}</div>
    </div>
  )
}

export const App = () => {
  return (
    <SmartComponent>
      {(user) => {
        return <PresentationalComponent {...user} />
      }}
    </SmartComponent>
  )
}
