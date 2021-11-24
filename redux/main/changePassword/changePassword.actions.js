import {
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_ERROR,
} from "./changePassword.types";
import { trueChecker } from "../../../components/helpers/checker";
import AuthService from "../../services/auth/authService";
export const changePassword = (values) => (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_LOADING });
  return AuthService.changePassword(values).then(
    (response) => {
      const { data } = response;
      const CPcheck = [data.success, data.status === "success"];
      if (!trueChecker(CPcheck)) {
        dispatch({
          type: CHANGE_PASSWORD_FAILED,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      } else {
        dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: {
            status: data.status,
            message: data.message,
            isSuccess: data.success,
          },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: CHANGE_PASSWORD_ERROR,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
