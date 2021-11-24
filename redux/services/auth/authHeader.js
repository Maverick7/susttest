import { store } from "../../store";
function authHeader() {
  const { user } = store.getState().auth;
  if (user && user.accessToken) {
    return {
      Authorization: "Bearer " + user.accessToken,
    };
  } else {
    return {};
  }
}

export default authHeader;
