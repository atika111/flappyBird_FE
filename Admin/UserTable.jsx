import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteUpdateBtn from "../Buttons/DeleteUpdateBtn";
import { useContext } from "react";
import { AuthContext } from "../src/Context/MyAuthProvider";
import UpdateModal from "./UpdateModal";
import { useState } from "react";
import axios from "axios";
import { async } from "regenerator-runtime";

export default function UserTable() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (updatedUser) => {
    try {
      updatedUser.isAdmin = updatedUser.isAdmin === "true";
      
      const { data } = await axios.put(
        `http://localhost:8080/users/${updatedUser._id}`,
        updatedUser
      );
      console.log(data);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const { userList } = useContext(AuthContext);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell>Admin</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Nickname</TableCell>
            <TableCell align="right">Picture</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList?.map((user) => (
            <TableRow
              key={user.email}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.isAdmin ? "true" : "false"}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.nickname}</TableCell>
              <TableCell align="right">
                <img
                  src={user.pictureUrl}
                  alt={`${user.firstName}'s avatar`}
                  width="50"
                  height="50"
                />
              </TableCell>
              <TableCell align="right">
                <DeleteUpdateBtn
                  userId={user._id}
                  onUpdateUser={() => {
                    handleUpdateClick(user);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isUpdateModalOpen && (
        <UpdateModal
          user={selectedUser}
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedUser(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
    </TableContainer>
  );
}
