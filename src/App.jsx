import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import HomeLog from './HomePage/HomeLog'
import Game from './Game/Game'

function App() {
 

  return (
    <>
    <Navbar/>
    <Routes>
    <Route path={"/homePage"} element={<HomePage/>}/>
    <Route path={"/homeLog"} element={<HomeLog/>}/>
    <Route path={"/game"} element={<Game/>}/>
    </Routes> 
    </>
  )
}

export default App
