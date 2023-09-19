import React from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Update, UpdateOutlined } from "@mui/icons-material";


function DeleteUpdateBtns() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => {
          // Add your delete logic here
          console.log("Delete button clicked");
        }}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        endIcon={<Update />}
        onClick={() => {
          // Add your send logic here
          console.log("Send button clicked");
        }}
      >
        Update
      </Button>
    </Stack>
  );
}

export default DeleteUpdateBtns;
