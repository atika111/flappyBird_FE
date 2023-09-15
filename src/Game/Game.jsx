import "./Game.css"
import React from 'react'

const Game = () => {

    const data = [
        { user: 'User 1', score: 85 },
        { user: 'User 2', score: 90 },
        { user: 'User 3', score: 78 },
        { user: 'User 4', score: 95 },
        { user: 'User 5', score: 88 },
      ];


     
  return (
    <div className="box-game">
        <h1>Lets Play</h1>
     <div className="game-container">
      <img src="flappy.png" alt="Game Image" className="game-image" />
    </div>
    <h1>Top scores</h1>
    <section className="score-table">
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
    </div>
  )
}

export default Game