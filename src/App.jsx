import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './Context/MyAuthProvider';
import Cookies from 'js-cookie';
import HomePage from './HomePage/HomePage';
import Navbar from './Navbar/Navbar';
import HomeLog from './HomePage/HomeLog';
import Game from './Game/Game';
import ScorePage from './Game/ScorePage';
import Dashboard from '../Admin/Dashboard';
import PrivateRoute from './Private/PrivateRoute';

function App() {
  const { fetchCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const token = Cookies.get();
    console.log(token);
    if (token) {
      fetchCurrentUser(token);
    }
  }, []);
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
