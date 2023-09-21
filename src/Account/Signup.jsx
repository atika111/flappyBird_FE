import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import UploadImage from "./UploadImage";

const Signup = ({ openSignup, onClose }) => {
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickName] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);

  const handleSignUser = async (e) => {
    e.preventDefault();

    const newUser = new FormData();
    newUser.append("email", email);
    newUser.append("password", password);
    newUser.append("repPassword", repPassword);
    newUser.append("firstName", firstName);
    newUser.append("lastName", lastName);
    newUser.append("nickname", nickname);
    newUser.append("avatar", avatarImage);

    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/auth/signup",
        newUser
      );
      console.log(response.data);
      setEmail("");
      setPassword("");
      setRepPassword("");
      setName("");
      setLastName("");
      setNickName("");
      setError({}); 
    } catch (error) {
      if (error?.response) {
        const responseData = error.response.data;
        if (responseData.errors) {
          setError(responseData.errors);
        } else {
          if (responseData.message) {
            setError({ password: responseData.message });
          }
        }
        console.log("Server error response:", responseData);
      } else {
        console.log("Error:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={openSignup} onClose={onClose}>
        <DialogTitle>SignUp</DialogTitle>
        <DialogContent>
  <UploadImage setAvatarImage={setAvatarImage} />
  <TextField
    autoFocus
    margin="dense"
    label="Email Address"
    type="email"
    fullWidth
    variant="standard"
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  {error.email && (
    <div className="error">
      <p>{error.email}</p>
    </div>
  )}
  <TextField
    autoFocus
    margin="dense"
    label="Password"
    type="password"
    fullWidth
    variant="standard"
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  {error.password && (
    <div className="error">
      <p>{error.password}</p>
    </div>
  )}
  <TextField
    autoFocus
    margin="dense"
    label="Confirm password"
    type="password"
    fullWidth
    variant="standard"
    onChange={(e) => setRepPassword(e.target.value)}
    required
  />
  {error.repPassword && (
    <div className="error">
      <p>{error.repPassword}</p>
          {error}
    </div>
  )}
  <TextField
    autoFocus
    margin="dense"
    label="Name"
    type="text"
    fullWidth
    variant="standard"
    onChange={(e) => setName(e.target.value)}
    required
  />
  {error.firstName && (
    <div className="error">
      <p>{error.firstName}</p>
    </div>
  )}
  <TextField
    autoFocus
    margin="dense"
    label="Last name"
    type="text"
    fullWidth
    variant="standard"
    onChange={(e) => setLastName(e.target.value)}
    required
  />
  {error.lastName && (
    <div className="error">
      <p>{error.lastName}</p>
    </div>
  )}
  <TextField
    autoFocus
    margin="dense"
    label="Nick name"
    type="text"
    fullWidth
    variant="standard"
    onChange={(e) => setNickName(e.target.value)}
    required
  />
  {error.nickname && (
    <div className="error">
      <p>{error.nickname}</p>
    </div>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSignUser} onClose={onClose}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
