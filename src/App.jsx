import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import Navbar from './Navbar/Navbar';
import HomeLog from './HomePage/HomeLog';
import Game from './Game/Game';
import ScorePage from './Game/ScorePage';
import Dashboard from '../Admin/Dashboard';
import PrivateRoute from './Private/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/homeLog'} element={<HomeLog />} />
        <Route path={'/game'} element={<Game />} />
        <Route path={'/scorePage'} element={<ScorePage />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
