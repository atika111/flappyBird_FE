const UserReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {};
    case "DELETE":
      return {};
    default:
      return state;
  }
};

export default UserReducer;