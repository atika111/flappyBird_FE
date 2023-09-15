import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Signup from './Signup'; 

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninOpen, setSigninOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSigninButtonClick = (e) => {
    e.preventDefault()
    setSigninOpen(true);
  };

  return (
    <>
      <button className="log" onClick={handleClickOpen}>
        LogIn
      </button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={console.log()}>Log In</Button>
        </DialogActions>
        <div className="account">Don't have an account?</div>
        <Button onClick={handleSigninButtonClick} >Sign Up</Button>
      </Dialog>
      {isSigninOpen && <Signup openSignup={isSigninOpen} onClose={() => setSigninOpen(false)} />}
    </>
  );
};

export default Login;