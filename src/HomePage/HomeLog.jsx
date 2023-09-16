import "./Home.css"
import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const HomeLog = () => {

    const data = [
        { user: 'User 1', score: 85 },
        { user: 'User 2', score: 90 },
        { user: 'User 3', score: 78 },
        { user: 'User 4', score: 95 },
        { user: 'User 5', score: 88 },
      ];



  return (
    <div className="main-box">
      <div className="home-page">
        
      <header>
        <h2>Flappy Bird Mania</h2>
      </header>
      <main>
      <section className="welcome">
    <h2>Welcome back Atika!</h2>
  </section>
  
  <section className="user-score-table">
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.user}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

  <section className="start-button">
  <Link className="log" to="/game">Lets Start!</Link>
  </section>

      </main>
      <footer>
        <p>&copy; 2023 Flappy Bird Mania</p>
        <div className="social-links">
         
        </div>
      </footer>
      </div>
    
    </div>
  )
}

export default HomeLog