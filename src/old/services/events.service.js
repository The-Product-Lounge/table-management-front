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

export const removeTables = async (eventId, auth) => {
  try {
    await httpService.delete(`event/${eventId}/tables`, null, auth);
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};

export const removeEvent = async (eventId, auth) => {
  try {
    await httpService.delete(`event/${eventId}`, null, auth);
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};

export const updateEvent = async (event, eventId, auth) => {
  try {
    await httpService.put(`event/${eventId}`, event, auth);
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};
