import { Container } from "@mui/material";
import UserTable from "./UserTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../src/Context/MyAuthProvider";

function Dashboard() {
    const{setUserList} = useContext(AuthContext)

  const fetchAllUsers = async () => {
    const { data } = await axios.get("http://localhost:8080/users/all");
    setUserList(data);
    try {
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:5
      }}
    >
      <UserTable />
    </Container>
  );
}

export default Dashboard;
