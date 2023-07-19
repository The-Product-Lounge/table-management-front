import { httpService } from "./http.service";

export const createEvent = async (event, auth) => {
  try {
    await httpService.post("event", event, auth);
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};
