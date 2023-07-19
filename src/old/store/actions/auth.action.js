import {
  getJwtTokenFromServer,
  setTokenInStorage,
} from "../../services/auth.service";

export function getJwt(user) {
  return async (dispatch) => {
    try {
      const token = await getJwtTokenFromServer(user.email, user.password);
      await setTokenInStorage(token);
      dispatch({ type: "SET_TOKEN", token });
    } catch (err) {
      // TODO - handle login error
      console.log(`Cannot signup`, err);
      throw err;
    }
  };
}
