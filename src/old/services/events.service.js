export const createEvent = async (event) => {
  try {
    await httpService.post("event", event);
  } catch (err) {
    // TODO - handle login error
    console.log(err);
    throw err;
  }
};
