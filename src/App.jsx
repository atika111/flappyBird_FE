import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import HomeLog from './HomePage/HomeLog'
import Game from './Game/Game'
import Dashboard from './Game/Dashboard'
import MyScoreProvider from './Context/MyScoreProvider'

function App() {
 

  return (
    <>
    <MyScoreProvider>
    <Navbar/>
    <Routes>
    <Route path={"/"} element={<HomePage/>}/>
    <Route path={"/homeLog"} element={<HomeLog/>}/>
    <Route path={"/game"} element={<Game/>}/>
    <Route path={"/dashboard"} element={<Dashboard/>}/>
    </Routes> 
    </MyScoreProvider>
    </>
  )
}

export default App
