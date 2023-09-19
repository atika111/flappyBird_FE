import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ScoreContext = createContext();

const MyScoreProvider = ({ children }) => {
  const [score, setScore] = useState([]);
  const [user, setUser] = useState("")
  const {id} = useParams()

console.log(user);

  const fetchScore = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/scores`,{withCredentials: true});
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
