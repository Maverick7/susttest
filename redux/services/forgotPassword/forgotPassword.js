import axios from "axios";
const API_URL = "https://us-central1-sustainathon-dev.cloudfunctions.net/sustainathonV3-1/user/";

class ForgotPasswordService {
    forgotPassword(values) {
        return axios.post(API_URL + "forgotPassword", values);
      }
}

export default new ForgotPasswordService();
