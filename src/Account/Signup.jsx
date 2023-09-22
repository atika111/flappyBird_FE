import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import UploadImage from './UploadImage';
import { userReducer, initialState } from '../../Reducers/userReducer';

const Signup = ({ openSignup, onClose }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const handleSignUser = async (e) => {
    e.preventDefault();
    dispatch({ type: 'RESET_ERROR' });
    dispatch({ type: 'SET_LOADING', isLoading: true });

    const newUser = new FormData();
    newUser.append('email', state.email);
    newUser.append('password', state.password);
    newUser.append('repPassword', state.repPassword);
    newUser.append('firstName', state.firstName);
    newUser.append('lastName', state.lastName);
    newUser.append('nickname', state.nickname);
    newUser.append('avatar', state.avatarImage);

    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + '/auth/signup',
        newUser
      );
      console.log(response.data);
      dispatch({ type: 'RESET_ERROR' });
      onClose();
    } catch (error) {
      if (error?.response) {
        const responseData = error.response.data;
        if (responseData.error) {
          dispatch({ type: 'SET_ERROR', error: responseData.error });
        } else {
          if (responseData.message) {
            dispatch({
              type: 'SET_ERROR',
              error: { password: responseData.message },
            });
          }
        }
        console.log('Server error response:', responseData);
      } else {
        console.log('Error:', error);
      }
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  };

  const handleInputChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <>
      <Dialog open={openSignup} onClose={onClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          {typeof state.error === 'string' && (
            <div className='error'>
              <p>{state.error}</p>
            </div>
          )}
          <UploadImage
            setAvatarImage={(image) =>
              dispatch({
                type: 'SET_FIELD',
                field: 'avatarImage',
                value: image,
              })
            }
          />
          <TextField
            autoFocus
            margin='dense'
            label='Email Address'
            name='email'
            type='email'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.email}
          />
          {state.error.email && (
            <div className='error'>
              <p>{state.error.email}</p>
            </div>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Password'
            name='password'
            type='password'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.password}
          />
          {state.error.password && (
            <div className='error'>
              <p>{state.error.password}</p>
            </div>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Confirm password'
            name='repPassword'
            type='password'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.repPassword}
          />
          {state.error.repPassword && (
            <div className='error'>
              <p>{state.error.repPassword}</p>
            </div>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Name'
            name='firstName'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.firstName}
          />
          {state.error.firstName && (
            <div className='error'>
              <p>{state.error.firstName}</p>
            </div>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Last name'
            name='lastName'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.lastName}
          />
          {state.error.lastName && (
            <div className='error'>
              <p>{state.error.lastName}</p>
            </div>
          )}
          <TextField
            autoFocus
            margin='dense'
            label='Nick name'
            name='nickname'
            type='text'
            fullWidth
            variant='standard'
            onChange={handleInputChange}
            required
            value={state.nickname}
          />
          {state.error.nickname && (
            <div className='error'>
              <p>{state.error.nickname}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleSignUser}
            onClose={onClose}
            disabled={state.isLoading}
          >
            {state.isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
