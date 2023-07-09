import { storageService } from "./local-storage.service";
import { httpService } from "./http.service";

const STORAGE_KEY_JWT = "jwt_token";

export const getTokenFromStorage = () => {
  return storageService.getFromStorage(STORAGE_KEY_JWT);
};

export const setTokenInStorage = (token) => {
  if (token) storageService.putInStorage(STORAGE_KEY_JWT, token);
};

export const removeTokenFromStorage = () => {
  storageService.removeFromStorage(STORAGE_KEY_JWT);
};

export const getJwtTokenFromServer = async (username, password) => {
  try {
    const { access_token } = await httpService.post("/auth/login", {
      username,
      password,
    });
    return access_token;
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};
