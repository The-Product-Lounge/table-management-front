import Axios from "axios";

const BASE_URL = process.env.REACT_APP_TABLE_SERVER_URL;

var axios = Axios.create({
  withCredentials: true,
});
export const httpService = {
  get(endpoint, data, auth) {
    return ajax(endpoint, "GET", data, auth);
  },
  post(endpoint, data, auth) {
    return ajax(endpoint, "POST", data, auth);
  },
  put(endpoint, data, auth) {
    return ajax(endpoint, "PUT", data, auth);
  },
  delete(endpoint, data, auth) {
    return ajax(endpoint, "DELETE", data, auth);
  },
};

async function ajax(endpoint, method = "GET", data = null, auth = null) {
  try {
    let axiosConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === "GET" ? data : null,
    };
    if (auth) {
      axiosConfig.headers = {
        Authorization: "Bearer " + auth,
      };
    }
    const res = await axios(axiosConfig);
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
    }
    throw err;
  }
}
