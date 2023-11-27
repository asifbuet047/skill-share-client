import { Outlet } from "react-router-dom"
import NavigationBar from "./Components/NavigationBar/NavigationBar"

function App() {

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Outlet></Outlet>
    </div>
  )
}

export default App
