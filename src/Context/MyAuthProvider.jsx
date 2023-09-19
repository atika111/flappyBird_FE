import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const MyAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogOut = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        { withCredentials: true }
      );
      const data = res.data;
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  async function fetchCurrentUser() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/current-user`,
        { withCredentials: true }
      );
      if (response.status == 200) {
        setUser(response.data);
      } else {
        console.log('Failed to fetch the user');
      }
    } catch (error) {
      // Handle network errors
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogOut, fetchCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default MyAuthProvider;
