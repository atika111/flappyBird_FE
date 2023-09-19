import axios from 'axios';
import React, { createContext, useState } from 'react';

const ScoreContext = createContext();

const MyScoreProvider = ({ children }) => {
  const [score, setScore] = useState([]);

  const fetchScore = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/scores`, { withCredentials: true });
      const data = res.data;
      setScore(data);
    } catch (err) {
      if (err.response) {
        console.error('Request failed with status:', err.response.status);
        console.error('Error data:', err.response.data);
      } else {
        console.error('Request failed with an unknown error:', err);
      }
    }
  };
  return (
    <ScoreContext.Provider value={{ score, fetchScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreContext };
export default MyScoreProvider;
