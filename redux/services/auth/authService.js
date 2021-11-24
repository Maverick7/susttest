import axios from "axios";
import authHeader from "./authHeader";
const API_URL =
  "https://us-central1-sustainathon-dev.cloudfunctions.net/sustainathonV3-1/user/";
const API_EVENT_URL =
  "https://us-central1-sustainathon-dev.cloudfunctions.net/sustainathonV3-1/event/";

class AuthService {
  login(values) {
    return axios.post(API_URL + "login", values).then((response) => {
      console.log(response);
      if (
        response.data.data &&
        response.data.success &&
        response.data.status === "success"
      ) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
  }
  changePassword(values) {
    return axios.post(API_URL + "changePassword", values, {
      headers: authHeader(),
    });
  }

  logout(values) {
    return axios.post(API_URL + "logout", values, { headers: authHeader() });
  }
  verifyId(values) {
    return axios.post(API_URL + "emailVerification", values);
  }
  upload(values) {
    return axios.post(API_EVENT_URL + "fileUpload", values, {
      headers: authHeader(),
    });
  }
  submitIdea(values) {
    return axios.post(API_EVENT_URL + "challenge/submission", values, {
      headers: authHeader(),
    });
  }

  register(values) {
    return axios.post(API_URL + "signup", values);
  }
}

export default new AuthService();
