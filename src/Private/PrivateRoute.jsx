import React from 'react'
import { AuthContext } from '../Context/MyAuthProvider';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children, adminOnly = false}) => {

    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/" />;
    }
  
     if (adminOnly && (!user || !user.admin)) {
        return <Navigate to="/" />;
      }
    

  return children;
}

export default PrivateRoute