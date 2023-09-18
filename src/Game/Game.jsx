import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FlappyBirdGame from '../PhaserGame';

const Game = () => {
  const gameContainerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  let game;

  useEffect(() => {
    game = new FlappyBirdGame('game');

    gameContainerRef.current.focus();

    const scoreUpdateInterval = setInterval(() => {
      setScore(window.gameScore);
    }, 100);

    game.onGameOver(() => {
      setGameOver(true);
      const finalScore = game?.getFinalScore();
      onGameOver(finalScore);
    });

    return () => {
      clearInterval(scoreUpdateInterval);
    };
  }, []);

  const onGameOver = (score) => {
    if (typeof score !== 'undefined')
      axios
        .post(import.meta.env.VITE_SERVER_URL + '/scores', {
          score,
          date: new Date(),
          email: 't@t.com',
          nickname: '555',
        })
        .then((response) => {
          // Handle the response from the server
          console.log('Request sent:', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error sending request:', error);
        });
  };

  return (
    <>
      <h3>Score: {score}, press R to restart the game</h3>
      <div
        id='game'
        ref={gameContainerRef}
        tabIndex={0}
        style={{ width: '960px', height: '540px' }}
      />
    </>
  );
};

export default Game;
