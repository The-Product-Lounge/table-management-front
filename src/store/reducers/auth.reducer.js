import { getTokenFromStorage } from "../../services/auth.service";

const initialState = {
  jwt_token: getTokenFromStorage(),
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      state = { ...state, jwt_token: action.token };
      break;

    default:
      return state;
  }

  return state;
}
