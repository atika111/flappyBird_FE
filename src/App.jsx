import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage/HomePage'
import Navbar from './Navbar/Navbar'
import HomeLog from './HomePage/HomeLog'
import Game from './Game/Game'
import ScorePage from './Game/ScorePage'
import MyScoreProvider from './Context/MyScoreProvider'
import MyAuthProvider from './Context/MyAuthProvider'

function App() {
 

  return (
    <>
    <MyAuthProvider>
    <MyScoreProvider>
    <Navbar/>
    <Routes>
    <Route path={"/"} element={<HomePage/>}/>
    <Route path={"/homeLog"} element={<HomeLog/>}/>
    <Route path={"/game"} element={<Game/>}/>
    <Route path={"/scorePage"} element={<ScorePage/>}/>
    </Routes> 
    </MyScoreProvider>
    </MyAuthProvider>
    </>
  )
}

export default App
