import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import HomeLog from './HomePage/HomeLog'
import Game from './Game/Game'
import Dashboard from './Game/Dashboard'

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path={"/"} element={<HomePage/>}/>
    <Route path={"/homeLog"} element={<HomeLog/>}/>
    <Route path={"/game"} element={<Game/>}/>
    <Route path={"/dashboard"} element={<Dashboard/>}/>
    </Routes> 
    </>
  )
}

export default App
