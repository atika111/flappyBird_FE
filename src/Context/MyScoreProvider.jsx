import axios from 'axios';
import React, { createContext, useState } from 'react';

const ScoreContext = createContext();

const MyScoreProvider = ({ children }) => {
  const [score, setScore] = useState([]);


  const fetchScore = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/scores`);
      const data = res.data;
      setScore(data);
    } catch (err) {
      console.error(err);
    }
  };

 

  return <ScoreContext.Provider value={{ score, fetchScore }}>{children}</ScoreContext.Provider>;
};

export { ScoreContext };
export default MyScoreProvider;
