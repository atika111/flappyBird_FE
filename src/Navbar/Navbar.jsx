import { Link } from "react-router-dom"
import "./Nav.css"
import React from 'react'

const Navbar = () => {
  return (
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="/">Flappy Bird</a>
          </div>
          <ul className="navbar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/homeLog">User Home</Link></li>
            <li><Link to="/game">Game</Link></li>
            
          </ul>
        </nav>
      
  )
}

export default Navbar