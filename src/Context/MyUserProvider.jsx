import React, { createContext, useContext, useState} from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

const MyUserProvider = ({ children }) => {

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
