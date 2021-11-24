import axios from "axios";
const API_URL = "https://us-central1-sustainathon-dev.cloudfunctions.net/sustainathonV3-1/user/";

class RegisterService {
    register(values) {
        return axios.post(API_URL + "signup", values);
      }
}

export default new RegisterService();
