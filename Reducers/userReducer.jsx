export const initialState = {
  error: {},
  email: "",
  password: "",
  repPassword: "",
  firstName: "",
  lastName: "",
  nickname: "",
  avatarImage: null,
  isLoading: false,
};

export const userReducer = (state, action) => {
  // console.log('state: ', action.field);
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "RESET_ERROR":
      return { ...state, error: {} };
      case "SET_LOADING":
        return {...state, isLoading: action.isLoading}
    default:
      return state;
  }
};
