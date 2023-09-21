import React, { createContext, useReducer, useContext, useState} from "react";
import UserReducer from "../../Reducers/userReducer";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const MyUserProvider = ({ children }) => {
  const initialState = {
    userList: [],
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const onClose = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  }

  const onOpen = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  }

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

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
        isUpdateModalOpen,
        selectedUser,
        onClose,
        onOpen,
        handleUpdate
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MyUserProvider;
