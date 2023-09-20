import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import UploadImage from "../src/Account/UploadImage";

function UpdateModal({ user, isOpen, onClose, onUpdate }) {
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = () => {
    onUpdate(updatedUser);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="update-modal-title"
      aria-describedby="update-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
        }}
      >
        <DialogTitle id="update-modal-title">
          Update User Information
        </DialogTitle>
        <DialogContent>
            <UploadImage />
          <TextField
            label="Admin"
            name="isAdmin"
            value={updatedUser.isAdmin}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="First Name"
            name="firstName"
            value={updatedUser.firstName}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={updatedUser.lastName}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <TextField
            label="Nickname"
            name="nickname"
            value={updatedUser.nickname}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          {/* <TextField
            label="Picture"
            name="pictureUrl"
            value={updatedUser.pictureUrl}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginTop: 2 }}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Update
          </Button>
        </DialogActions>
      </Box>
    </Modal>
  );
}

export default UpdateModal;
