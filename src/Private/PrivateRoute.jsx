import React from 'react'
import { AuthContext } from '../Context/MyAuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {

    const { token } = useContext(AuthContext);

 
    if (!token) {
      return <Navigate to="/" />;
    }
  

  return ({children})
}

export default PrivateRoute