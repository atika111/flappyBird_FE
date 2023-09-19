import { Link } from "react-router-dom"
import "./Nav.css"
import React, { useContext } from 'react'
import { AuthContext } from "../Context/MyAuthProvider"

const Navbar = () => {

  const {user} = useContext(AuthContext)


  return (
    <nav className="navbar">
    <div className="navbar-logo">
      <a href="/">Flappy Bird</a>
    </div>
    <ul className="navbar-menu">
      {!user ? (
        <>
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/game">Game</Link></li> */}
        </>
      ) : (
        <>
          <li><Link to="/homeLog">User Page</Link></li>
          <li><Link to="/game">Game</Link></li>
          <li><Link to="/scorePage">Score Page</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
        </>
      )}
    </ul>
  </nav>
  )
}

export default Navbar