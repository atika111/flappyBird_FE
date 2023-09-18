import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import HomeLog from './HomePage/HomeLog'
import Game from './Game/Game'
import ScorePage from './Game/ScorePage'
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
    <Route path={"/scorePage"} element={<ScorePage/>}/>
    </Routes> 
    </MyScoreProvider>
    </>
  )
}

export default App
