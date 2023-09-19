import { Container } from "@mui/material";
import DeleteUpdateBtns from "../Buttons/DeleteUpdateBtns";
import UserList from "./UserList";

function Dashboard() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <UserList />
      <DeleteUpdateBtns />
    </Container>
  );
}

export default Dashboard;
