import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Paper, Container, Box } from '@mui/material';
import FlappyBirdGame from '../PhaserGame';
import { AuthContext } from '../Context/MyAuthProvider';

const Game = () => {
  const { user, isUserLoaded } = useContext(AuthContext);
  let game;

  useEffect(() => {
    if (isUserLoaded) {
      game = new FlappyBirdGame('game');

      game.onGameOver(() => {
        onGameOver();
      });
    }
  }, [isUserLoaded]);

  const onGameOver = () => {
    const finalScore = game?.getFinalScore();
    if (typeof finalScore !== 'undefined')
      axios
        .post(
          import.meta.env.VITE_SERVER_URL + '/scores',
          {
            score: finalScore,
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
          tabIndex={0}
          style={{ width: '960px', height: '540px' }}
        />
      </Box>
    </Container>
  );
};

export default Game;
