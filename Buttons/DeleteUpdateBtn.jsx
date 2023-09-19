import React, { useContext } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { AuthContext } from "../src/Context/MyAuthProvider";

function DeleteUpdateBtn({ userId, onUpdateUser }) {
    const {setUserList} = useContext(AuthContext)

  const onDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUserList((prevUserList) => 
      prevUserList.filter((user =>  user._id !== userId))
      )
    } catch (error) {
      console.log("error: ", error.message);
    }
    console.log("deleted user num id:", userId);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDeleteUser}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        endIcon={<UpdateIcon />}
        onClick={onUpdateUser}
      >
        Update
      </Button>
    </>
  );
}

export default DeleteUpdateBtn;
