import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { AuthContext } from './MyAuthProvider';


const ScoreContext = createContext();

const MyScoreProvider = ({ children }) => {
  const [score, setScore] = useState([]);
  const {setUser} = useContext(AuthContext)

  const fetchScore = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/scores`,{withCredentials: true});
      const data = res.data;
      setScore(data);
      setUser(data)
    } catch (err) {
      console.error(err);
    }
  };



  return <ScoreContext.Provider value={{ score, fetchScore }}>{children}</ScoreContext.Provider>;
};

export { ScoreContext };
export default MyScoreProvider;
