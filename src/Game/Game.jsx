import { useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { Typography, Paper, Container, Box } from '@mui/material';
import FlappyBirdGame from '../PhaserGame';
import { AuthContext } from '../Context/MyAuthProvider';

const Game = () => {
  const gameContainerRef = useRef(null);
  const { user } = useContext(AuthContext);
  let game;

  useEffect(() => {
    game = new FlappyBirdGame('game');

    gameContainerRef.current.focus();

    game.onGameOver(() => {
      const finalScore = game?.getFinalScore();
      onGameOver(finalScore);
    });
  }, []);

  const onGameOver = (score) => {
    if (typeof score !== 'undefined')
      axios
        .post(
          import.meta.env.VITE_SERVER_URL + '/scores',
          {
            score,
            date: new Date(),
            email: user.email,
            nickname: user.nickname,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log('Request sent:', response.data);
        })
        .catch((error) => {
          console.error('Error sending request:', error);
        });
  };

  return (
    <Container maxWidth='sm'>
      <Box display='flex' justifyContent='center' my='20px'>
        <Paper
          elevation={3}
          id='game'
          ref={gameContainerRef}
          tabIndex={0}
          style={{ width: '960px', height: '540px' }}
        />
      </Box>
      <Typography variant='h4' align='center' gutterBottom>
        Press R to restart the game
      </Typography>
    </Container>
  );
};

export default Game;
