import { useEffect, useRef, useState } from 'react';
import FlappyBirdGame from '../PhaserGame';

const Game = () => {
  const gameContainerRef = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    new FlappyBirdGame('game');

    gameContainerRef.current.focus();

    const scoreUpdateInterval = setInterval(() => {
      setScore(window.gameScore);
    }, 100);

    return () => clearInterval(scoreUpdateInterval);
  }, []);

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
