import {useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const Signup = ({ openSignup, onClose }) => {

  
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPass, setConfirmPass] = useState("")
const [name, setName] = useState("")
const [lastname, setLastName] = useState("")
const [nickName, setNickName] = useState("")



  return (
    <>
     <Dialog open={openSignup} onClose={onClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)} required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setPassword(e.target.value)} required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Confim password"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setConfirmPass(e.target.value)} required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)} required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Last name"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setLastName(e.target.value)} required
          />
          <TextField
            autoFocus
            margin="dense"
            label="Phone number"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setNickName(e.target.value)} required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={console.log()} onClose={onClose}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Signup