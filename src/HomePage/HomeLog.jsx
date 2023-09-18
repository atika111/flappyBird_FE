import "./Home.css"
import { Button } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScoreContext } from "../Context/MyScoreProvider"


const HomeLog = () => {

  const { score, fetchScore } = useContext(ScoreContext)


  useEffect(() => {
    fetchScore()
  }, [])

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
                {score.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nickname}</td>
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