import axios from "axios";
const API_URL = "https://us-central1-sustainathon-dev.cloudfunctions.net/";

class SchemaService {
  getallSchema(id) {
    return axios.get(API_URL + "sustainathonV3-1/form/schema", {
      params: {
        eventId: id,
      },
    });
  }
}

export default new SchemaService();
